import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Server } from "../server";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${Server}/api/product/allproduct?search=${search}&category=${category}&price=${price}&page=${page}`
      );
      setProducts(data.products);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages);
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search,category]);
  return (
    <ProductContext.Provider
      value={{
        products,
        topProducts,
        loading,
        totalPages,
        categories,
        search,
        setSearch,
        category,
        setCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
