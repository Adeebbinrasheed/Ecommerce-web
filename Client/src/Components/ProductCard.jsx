import React from "react";
import { Server } from "../server";
import {useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
  const navigate=useNavigate();
  
  return (
    <div className="flex p-4 mt-8 bg-gray-10">
      <div className="  flex flex-col  space-y-2 items-center">
        <div className="bg-slate-200 rounded-2xl p-4 overflow-hidden">
          <img src={`${Server}/${product.image}`} alt="" width={200} className="rounded-lg transition-all duration-500 hover:scale-110  " />
        </div>
        <div>
          <h1 className="font-bold text-3xl">{product.title}</h1>
        </div>
        <div>
          <h1 className="font-semibold text-lg">Rs.{product.price}</h1>
        </div>
        <div>
          <button className="bg-black text-white p-1 rounded-lg text-sm" onClick={()=>navigate(`product/${product._id}`)}>view Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
