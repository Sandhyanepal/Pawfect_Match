import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
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
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        data
      );

      if (response.status === 201 || response.status === 200) {
        // const { token } = response.data;
        // localStorage.setItem("authToken", token);
        // setMessage("Registration successful!");
        navigate("/login");
      } else {
        setMessage(response.data.message || "Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.message || "An error occurred during registration"
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
    <Header title='Login' color={'text-white'}/>
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
            Register
          </h1>
          <form onSubmit={handleSubmit} className="sm:p-10 p-5">
            <label htmlFor="firstName" className="text-lg">
              First Name
            </label>
            <br />
            <input
              type="text"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              className="w-full border-2 py-1 pl-2 my-1"
              placeholder="First Name"
            />
            <br />
            <label htmlFor="lastname" className="text-lg">
              Last Name
            </label>
            <br />
            <input
              type="text"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
              className="w-full border-2 py-1 pl-2 my-1"
              placeholder="Last Name"
            />
            <br />
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
              Register
            </button>
          </form>
          {message && <p className="text-center text-red-500">{message}</p>}
          <p className="pl-5 sm:pl-10 pb-5">
            Already have an account?{" "}
            <Link to="/login" className="italic text-gray-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
