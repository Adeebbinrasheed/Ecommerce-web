import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "./context/UserContext";
import Loader from "./Components/Loader";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";


const App = () => {
  const { loading, isAuth ,user} = UserData();
  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <>
          <Header isAuth={isAuth}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={isAuth?<Account user={user} />:<Login/>} />
            <Route path="/cart" element={isAuth?<Cart />:<Login/>} />
            <Route path="/checkout" element={isAuth?<Checkout/>:<Login/>} />
            <Route path='/product' element={<Product/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/signup" element={isAuth ? <Home /> : <SignUp />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </>
      {/* )} */}
    </>
  );
};

export default App;
