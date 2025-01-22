import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import hourglassLogo from "../images/hourglassLogo.svg";
import hourglassHomeLogo from "../images/hourglassHomeLogo.svg";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://hourglass-0e3w.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
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
    <div className="flex items-center w-screen h-screen justify-center bg-black text-white">
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
        className="shadow-md shadow-gray-500 mt-20 rounded-lg flex flex-col gap-5 p-16"
      >
        <div className="my-4">
          <div className="flex items-center justify-center">
            <img
              src={hourglassLogo}
              alt="logo"
              className="  pl-3 h-20 mb-2 animate-spin "
            />
          </div>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2 bg-black text-white"
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2  bg-black text-white"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2  bg-black text-white"
          />
        </div>
        {loading ? (
          <Button className="bg-black hover:shadow-md hover:bg-black hover:shadow-blue-500 shadow-sm shadow-blue-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="bg-black hover:shadow-md hover:bg-black hover:shadow-gray-500 shadow-sm shadow-gray-500 transition-all duration-100">Signup</Button>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
