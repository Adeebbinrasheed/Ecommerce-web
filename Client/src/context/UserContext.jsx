import { createContext, useContext, useEffect, useState } from "react";
import { Server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const UserLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${Server}/api/user/login`, {
        email,
        password,
      });

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setLoading(false);
        setIsAuth(true);
        setUser(data.user);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuth(false);
    }
  };

  const registerUser=async(name,email,password,navigate)=>{
    try {
      const {data}=await axios.post(`${Server}/api/user/register`,{name,email,password})
      if (data.message) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("activationToken",data.activationToken)
        console.log('Token stored:', localStorage.getItem('activationToken'));
        navigate('/verify')
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const verifyUser=async(otp,navigate)=>{
    try {
      const activationToken=localStorage.getItem('activationToken')
      const {data}=await axios.post(`${Server}/api/user/verify`,{otp,activationToken})
      if(data.message){
        // localStorage.clear()
        navigate('/login')
        toast.success(data.message)
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }

  const fetchUser = async () => {
    try {
      
      const { data } =await axios.get(`${Server}/api/user/profile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ UserLogin, user, setUser, isAuth, setIsAuth, loading,registerUser ,verifyUser}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
