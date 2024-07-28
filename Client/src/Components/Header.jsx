import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { toast } from "react-toastify";

const Header = ({ isAuth }) => {
  const [isopen, setIsopen] = useState(false);
  const {setUser,setIsAuth}=UserData()

  const openMenu = () => {
    setIsopen(!isopen);
  };

  const closeMenu = () => {
    setIsopen(false);
  };
  const logoutHandler=()=>{
    localStorage.clear()
    setUser([])
    setIsAuth(false)
    toast.success("logged out successfully")
  }
  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-50 p-5 px-5 fixed w-full z-20 shadow-lg ">
        <div className="hidden md:flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link>Cart</Link>
          <Link>About</Link>
        </div>
        <div className="md:hidden">
          <button onClick={openMenu}>
            {isopen ? (
              <IoMdClose className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
        <div className=" text-xl font-medium">
          <h1>Louis Watt</h1>
        </div>
        <div className="flex space-x-3 text-lg">
          <Link to="/login">
            <IoIosSearch />
          </Link>
          <Link to="/login">
            <IoCartOutline />
          </Link>
        </div>
      </div>
      {isopen && (
        <div className="absolute  bg-red-500 top-16 w-[50%] h-screen space-y-5 text-lg flex flex-col  z-30">
          <Link
            to="/"
            onClick={closeMenu}
            className="no-underline text-black hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/account"
            onClick={closeMenu}
            className="no-underline text-black hover:text-gray-300"
          >
            Account
          </Link>
          <Link
            to="/product"
            onClick={closeMenu}
            className="no-underline text-black hover:text-gray-300"
          >
            Products
          </Link>
          {isAuth ? (
            <Link
      
              onClick={logoutHandler}
              className="no-underline text-black hover:text-gray-300"
            >
              logout
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="no-underline text-black hover:text-gray-300"
            >
              login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
