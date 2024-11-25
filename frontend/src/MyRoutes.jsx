import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Shelter from './pages/Shelter'
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Adopt from "./pages/Adopt";
import PetDesc from "./pages/PetDesc";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserDetail } from "./store/slice/loginStatusSlice";
import FAQ from "./pages/FAQ";

const MyRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if(!token){
        return ;
      }
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/get-user-by-id`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(setLoggedIn(true));
      dispatch(setUserDetail(response.data.data));
    };
    fetchUserDetails();
  });
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path='/shelter' element={<Shelter/>} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/pet/:id" element={<PetDesc />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='faq' element={<FAQ/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
