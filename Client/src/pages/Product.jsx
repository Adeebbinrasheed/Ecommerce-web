import React from "react";
import { ProductData } from "../context/ProductContext";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";

const Product = () => {
  const {
    products,
    loading,
    categories,
    search,
    setSearch,
    category,
    setCategory,
  } = ProductData();
  if (loading) {
    return <Loader />;
  }

  if (!products || products.length === 0) {
    return <p>No products yet</p>;
  }
  return (
    <div className="pt-24">
      <div>
        <h1 className="text-3xl font-bold text-center text-slate-700">
          OUR PRODUCTS
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center pt-6 space-y-1">
        <h1 className="text-2xl font-semibold md:text-3xl">Filters</h1>
        <form action="" className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" md:p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-3"
          />
          <select
            name="category"
            className="border-2 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories && categories.map((e) => <option value={e} key={e.id}>{e}</option>)}
          </select>
        </form>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 md:grid-cols-4 justify-items-center">
        {products.map((e) => (
          <ProductCard key={e.id} product={e} />
        ))}
      </div>
    </div>
  );
};

export default Product;
