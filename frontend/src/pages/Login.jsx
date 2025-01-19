import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserDetail } from "../store/slice/loginStatusSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        data
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        toast.success("Login Successful");
        navigate("/");
        dispatch(setUserDetail(response.data));
        dispatch(setLoggedIn(true));
      } else {
        setMessage(response.data.message || "Login failed!");
      }
    } catch (error) {
      setMessage(error.response.data.msg);

    }
  };

  return (
    <>
      <div
        className="w-full bg-gray-100 flex items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="md:w-1/2 bg-white m-auto w-3/4"
          style={{ boxShadow: "0 41.8px 33.4px rgba(0, 0, 0, 0.086)" }}
        >
          <h1
            className="text-3xl text-center pt-8 font-bold"
            style={{ fontFamily: "lato" }}
          >
            Login
          </h1>
          <form onSubmit={handleSubmit} className="sm:p-10 p-5">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border-2 py-1 pl-2 my-1"
              placeholder="Email"
            />
            <br />
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full border-2 py-1 mt-1 pl-2"
              placeholder="Password"
            />
            <br />
            <button className="w-full mt-5 bg-gray-700 text-white py-2 rounded-lg">
              Login
            </button>
          </form>
          {message && <p className="text-center text-red-500">{message}</p>}
          <h1 className="italic text-center text-gray-500">
            <Link to="/forget-password">Forgot Password? Click to reset</Link>
          </h1>
          <p className="pl-5 sm:pl-10 py-5">
            Don't have an account?{" "}
            <Link to="/register" className="italic text-gray-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
