import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartData } from "../context/cartContext";
import { UserData } from "../context/UserContext";
import { Server } from "../server";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { addToCart } = CartData();
  const { isAuth } = UserData();
console.log(product);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${Server}/api/product/singleproduct/${params.id}`
      );
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const addtoCartHandler = async (productId) => {
    await addToCart(productId);
  };

  return (
    <div className="pt-28 flex justify-center items-center">
      <div className="flex flex-col space-y-3 p-2 justify-center w-96 md:flex-row md:w-[60%] md:space-x-5 md:space-y-0">
        <div className="flex justify-center items-center">
          <img src={`${Server}/${product.image}`} alt={product.title} />
        </div>
        <div className="space-y-3 md:space-y-3">
          <h1 className="text-4xl text-gray-600">{product.title}</h1>
          <h1 className="text-gray-600 text-xl">${product.price}</h1>
          {product.stock === 0 ? (
            <p>Out of stock</p>
          ) : (
            <>
              {isAuth ? (
                <div className="flex flex-col space-y-4 pt-4">
                  <button
                    className="border-2 p-2 text-lg hover:text-gray-500"
                    onClick={() => addtoCartHandler(product._id)}
                  >
                    Add To Cart
                  </button>
                </div>
              ) : (
                <p>Please login to add to cart</p>
              )}
            </>
          )}
          <p className="text-gray-600 text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
