const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({
      product: product,
      user: req.user._id,
    }).populate("product");

    if (cart) {
      if (cart.product.stock === cart.quantity) {
        return res.status(400).json({ message: "out of stock" });
      }
      cart.quantity = cart.quantity + 1;
      await cart.save();
      return res.status(200).json({ message: "added to cart" });
    }
    const cartProd = await Product.findById(product);

    if (cartProd.stock === 0) {
      return res.status(400).json({ message: "out of stock" });
    }
    await Cart.create({
      quantity: 1,
      product: product,
      user: req.user._id,
    });

    return res.status(200).json({ message: "added to cart" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    const sumOfQuantities = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    let subTotal = 0;
    cart.forEach((i) => {
      const itemSubTotal = i.product.price * i.quantity;
      subTotal += itemSubTotal;
    });
    res.json({ cart, subTotal, sumOfQuantities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromcart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    await cart.deleteOne();
    res.status(200).json({ message: "removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { action } = req.query;
    if (action === "inc") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");
      if (cart.quantity < cart.product.stock) {
        cart.quantity++;
        await cart.save();
      } else {
        return res.status(400).json({ message: "out of stock" });
      }

      res.status(200).json({ message: "cart updated" });
    }

    if (action === "dec") {
      const { id } = req.body;
      const cart = await Cart.findById(id).populate("product");
      if (cart.quantity > 1) {
        cart.quantity--;
        await cart.save();
      } else {
        return res.status(400).json({ message: "only one item" });
      }

      res.status(200).json({ message: "cart updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addToCart, fetchCart, removeFromcart, updateCart };
