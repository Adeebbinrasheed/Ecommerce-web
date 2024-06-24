import React from "react";
import ProductCard from "./ProductCard";
import { ProductData } from "../context/ProductContext";
import Loader from "./Loader";

const TopProduct = () => {
  const { topProducts, loading } = ProductData();
  if(loading){
    return <Loader/>
  }

  if (!topProducts || topProducts.length === 0) {
    return <p>No products yet</p>;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-1 justify-items-center md:grid-cols-3">
      {topProducts.map((e) => (
        <ProductCard key={e.id} product={e} />
      ))}
    </div>
  );
};

export default TopProduct;
