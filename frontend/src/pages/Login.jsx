import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="w-full bg-gray-100 flex items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="md:w-1/2 bg-white m-auto w-3/4"
        style={{  boxShadow:'0 41.8px 33.4px rgba(0, 0, 0, 0.086)' }}
      >
        <h1
          className="text-3xl text-center pt-8 font-bold"
          style={{ fontFamily: "lato" }}
        >
          Login
        </h1>
        <form action="" className="sm:p-10 p-5">
            <label htmlFor="" className="text-lg">Username</label><br />
            <input type="email" className="w-full border-2 py-1 pl-2 my-1" placeholder="Username" /><br />
            <label htmlFor="" className=" text-lg">Password</label><br />
            <input type="password" className="w-full border-2 py-1 mt-1 pl-2" placeholder="Password"/><br />
            <button className="w-full mt-5 bg-gray-700 text-white py-2 rounded-lg">Login</button>
        </form>
        <h1 className="italic text-center text-gray-500"><Link >Forget Password? Click to reset</Link></h1>
        <p className="pl-5 sm:pl-10 py-5">Don't have an account? <Link to='/register' className="italic text-gray-500">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
