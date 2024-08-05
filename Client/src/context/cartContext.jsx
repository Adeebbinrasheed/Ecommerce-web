import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { Server } from "../server";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
 
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${Server}/api/cart/all`, {
        headers: {
          token,
        },
      });

      setCart(data.cart);
      setTotalItem(data.sumofQuantities);
      setSubTotal(data.subTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${Server}/api/cart/new`,
        { product },
        {
          headers: {
            token,
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateCart = async (action, id) => {
    try {
      const { data } = await axios.put(
        `${Server}/api/cart?action=${action}`,
        { id },
        {
          headers: {
            token,
          },
        }
      );

      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await axios.delete(`${Server}/api/cart/${id}`, {
        headers: {
          token,
        },
      });

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        totalItem,
        subTotal,
        addToCart,
        updateCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
