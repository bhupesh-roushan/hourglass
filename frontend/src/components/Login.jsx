import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import hourglassLogo from "../images/hourglassLogo.svg";
import hourglassHomeLogo from "../images/hourglassHomeLogo.svg";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center bg-black text-white w-screen h-screen justify-center ">
     <div className=" absolute top-[2%]   md:top-[50%] md:left-[10%] flex items-center justify-center flex-col ">
             <img
               src={hourglassHomeLogo}
               alt="logo"
               className="  pl-3 h-14 md:h-20 mb-5  "
             />
             <p className="text-sm mb-5 text-center font-bold text-gray-700">
               CAPTURING MOMENTS, ONE POST AT A TIME.
             </p>
           </div>
      <form
        onSubmit={signupHandler}
        className=" flex rounded-lg flex-col gap-5 p-16 shadow-md shadow-gray-500 "
      >
        <div className="my-4">
          <div className="flex items-center justify-center">
            <img
              src={hourglassLogo}
              alt="logo"
              className="  pl-3 h-20 mb-5 animate-spin "
            />
          </div>

          
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2 bg-black"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2  bg-black outline-none "
          />
        </div>
        {loading ? (
          <Button className="bg-black hover:shadow-md hover:bg-black hover:shadow-gray-500 shadow-sm shadow-gray-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="bg-black hover:shadow-md hover:bg-black hover:shadow-gray-500 shadow-sm shadow-gray-500 transition-all duration-100"
            type="submit"
          >
            Login
          </Button>
        )}

        <span className="text-center mt-5">
          Dosent have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
