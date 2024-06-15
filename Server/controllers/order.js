const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const sendMail = require("../utils/sendMail");

const newOrder = async (req, res) => {
  try {
    const { method, phone, address } = req.body;
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subTotal = 0;

    cart.forEach((i) => {
      const itemSubTotal = i.product.price * i.quantity;
      subTotal += itemSubTotal;
    });

    const items = await Cart.find({ user: req.user._id })
      .select("-_id")
      .select("-user")
      .select("-__v");
    console.log(items);

    const order = await Order.create({
      items,
      method,
      user: req.user._id,
      phone,
      address,
      subTotal,
    });

    for (let i of order.items) {
      let product = await Product.findOne({ _id: i.product });

      product.$inc("stock", -1 * i.quantity);
      product.$inc("sold", +i.quantity);
    }
    await Cart.find({ user: req.user._id }).deleteMany();
    await sendMail({
      email: req.user.email,
      subject: "order confirmation",
      message: `Thanks for shopping of ₹${subTotal} from our platform your order will deliver soon`,
    });
    res.status(201).json({ message: "order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "This is admin route" });
    }
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order.status === "pending") {
      order.status = "processing";

      await sendMail({
        email: req.user.email,
        subject: "Order product update",
        message: "Your order is in processing and it will delivered soon",
      });

      await order.save();

    return  res.status(201).json({ message: "order status updated" });
    }

    if (order.status === "processing") {
      order.status = "shipped";

      await sendMail({
        email: req.user.email,
        subject: "Order product update",
        message: "Your order is shipped and it will delivered soon",
      });

      await order.save();

      return res.status(201).json({ message: "order status updated" });
    }

    if (order.status === "shipped") {
      order.status = "out for delivery";

      await sendMail({
        email: req.user.email,
        subject: "Order product update",
        message: "Your order is out for delivery and it will delivered soon",
      });

      await order.save();

     return res.status(201).json({ message: "order status updated" });
    }

    if (order.status === "out for delivery") {
      order.status = "Delivered";

      await sendMail({
        email: req.user.email,
        subject: "Order product update",
        message: "Your order is delivered thank you for shopping",
      });

      await order.save();

    return  res.status(201).json({ message: "order status updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newOrder, getMyOrder, updateStatus };
