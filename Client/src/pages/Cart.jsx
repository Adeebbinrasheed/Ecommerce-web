
import { Link, useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CartData } from "../context/cartContext";
import { Server } from "../server";

const Cart = () => {
  const { cart, subTotal, updateCart, removeFromCart } = CartData()
  const updateCartHandler = async (action, id) => {
    await updateCart(action, id);
  };
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h2 className="mt-4 mb-3 text-2xl font-semibold">Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((e, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{e.product.title}</td>
                  <td className="px-4 py-2 border">₹{e.product.price}</td>
                  <td className="px-4 py-2 border">
                    <Link to={`/product/${e.product._id}`}>
                      <img
                        src={`${Server}/${e.product.image}`}
                        className="w-16"
                        alt=""
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2 border flex items-center justify-center">
                    <button
                      onClick={() => updateCartHandler("dec", e._id)}
                      className="mx-2 bg-gray-200 p-2 rounded"
                    >
                      -
                    </button>
                    {e.quantity}
                    <button
                      onClick={() => updateCartHandler("inc", e._id)}
                      className="mx-2 bg-gray-200 p-2 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2 border">₹{e.product.price * e.quantity}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => removeFromCart(e._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No Items in Cart</p>
      )}

      {subTotal === 0 ? null : (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Subtotal</h2>
          <p>Total price to be paid - ₹{subTotal}</p>
          <button
            className="mt-4 flex items-center justify-center bg-blue-500 text-white p-3 rounded"
            onClick={() => navigate("/checkout")}
          >
            Checkout <IoBagCheckOutline className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
