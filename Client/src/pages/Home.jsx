import React from "react";
import Banner from "../Components/Banner";
import TopProduct from "../Components/TopProduct";
import Loader from "../Components/Loader";


const Home = () => {
 
  return (
    <div>
      <Banner />
      <div className="pt-10 pl-3 text-xl font-semibold text-center"><h1>Top Products</h1></div>
      <hr  className="mx-20 border-gray-900"/>
      <TopProduct/>
    </div>
  );
};

export default Home;
