import React, { useEffect, useState } from "react";
import pet2 from "../images/pet1.jpg";
import Header from "../component/Header";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MeetForm from "./MeetForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Recommend from "../component/recommend/Recommend";

const PetDesc = () => {
  const { id } = useParams();
  const [petDetail, setPetDetail] = useState(null);
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.loginStatus);

  const [meet, showMeet] = useState(false);
  const toggleMeet = () => {
    if (!isLoggedIn) {
      toast.error("Please Login to Continue!!");
      navigate("/login");
    }
    showMeet((prev) => !prev);
  };

  useEffect(() => {
    const fetchPetDesc = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
      );
      if (response.status === 200) {
        setPetDetail(response.data.data);
        const ownerResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,
          {
            id: response?.data?.data?.owner,
          }
        );
        setOwner(ownerResponse.data.data);
      }
    };
    fetchPetDesc();
  }, [id]);

  const [openDetail, setOpenDetail] = useState(false);
  const handleToggle = () => {
    setOpenDetail((prev) => !prev);
  };

  return (
    <>
      <Header title="Login" color={"text-white"} />
      <div className="flex w-4/5 m-auto px-7 py-12 flex-wrap">
        <div className="w-full lg:w-1/2 flex flex-col items-center ">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${petDetail?.image?.slice(
              6
            )}`}
            alt=""
            className="rounded-3xl"
          />
        </div>
        <div className="lg:pt-0 pt-5 pl-5 w-full lg:w-1/2 ">
          <h1 className="text-4xl font-semibold">
            {petDetail?.name?.split("")[0].toUpperCase() +
              petDetail?.name?.slice(1)}
          </h1>
          <h3 className="pt-3 text-2xl font-semibold text-gray-500">About</h3>

          {!openDetail && (
            <div className="pt-5">
              <p className="text-justify">{petDetail?.description}</p>
              <div className="pt-5 flex items-center flex-wrap lg:gap-6 gap-10">
                <div>
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  <span className="pl-2">{petDetail?.address}</span>
                </div>
                <div>
                  <i className="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2"> {petDetail?.breed}</span>
                </div>
                <div>
                  <i className="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2"> {petDetail?.age} years old</span>
                </div>
                <div>
                  <i className="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2">{petDetail?.gender}</span>
                </div>
              </div>
            </div>
          )}

          {openDetail && (
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex flex-col gap-2">
                <div className="flex ">
                  <span className="font-semibold flex-1 ">Address:</span>
                  <p className="flex-1">{petDetail?.address}</p>
                </div>
                <div className="flex ">
                  <span className="font-semibold flex-1 ">Breed:</span>
                  <p className="flex-1">{petDetail?.breed}</p>
                </div>
                <div className="flex ">
                  <span className="font-semibold flex-1 ">Age:</span>
                  <p className="flex-1">{petDetail?.age} year's old</p>
                </div>
                <div className="flex ">
                  <span className="font-semibold flex-1 ">Gender:</span>
                  <p className="flex-1">{petDetail?.gender}</p>
                </div>
                <div className="flex ">
                  <span className="font-semibold flex-1 ">Category:</span>
                  <p className="flex-1">{petDetail?.category?.category_name}</p>
                </div>
                <div className="flex">
                  <span className="font-semibold flex-1 ">Health Issues:</span>
                  <p className="flex-1">{petDetail?.health_issue}</p>
                </div>
                <div className="flex">
                  <span className="font-semibold flex-1 ">Medication:</span>
                  <p className="flex-1">{petDetail?.medication}</p>
                </div>
                <div className="flex">
                  <span className="font-semibold flex-1 ">
                    Vaccination Status:
                  </span>
                  <p className="flex-1">{petDetail?.vaccination_status} </p>
                </div>
                <div className="flex">
                  <span className="font-semibold flex-1 ">Owner:</span>
                  <p className="flex-1">{owner?.fullName}</p>
                </div>
              </div>
            </div>
          )}
          <button onClick={handleToggle} className="mt-2 py-1 underline">
            {openDetail ? "Show Less" : "Show More..."}
          </button>
          <br />
          <button
            onClick={toggleMeet}
            className="bg-slate-500 text-white py-2 px-5 rounded-xl"
          >
            Meet Me
          </button>
        </div>
      </div>

      {/* Modal for MeetForm */}
      {meet && (
        <>
          {/* Background Blur */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg w-1/2 relative"
              style={{
                maxWidth: "50vw",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={toggleMeet}
                className="absolute top-2 right-2 text-3xl font-bold text-red-500"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {isLoggedIn ? (
                <MeetForm petDetail={petDetail} showMeet={showMeet} />
              ) : (
                <NavLink to="/login" className="text-blue-500">
                  Login to meet
                </NavLink>
              )}
            </div>
          </div>
        </>
      )}

      {/* Recommended pets */}
      <Recommend />
    </>
  );
};

export default PetDesc;
