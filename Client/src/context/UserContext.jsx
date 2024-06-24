import { createContext, useContext } from "react";
import { Server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const UserLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${Server}/api/user/login`, {
        email,
        password,
      });

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return <UserContext.Provider value={{UserLogin}}>{children}</UserContext.Provider>;
};

export const UserData=()=>useContext(UserContext)
