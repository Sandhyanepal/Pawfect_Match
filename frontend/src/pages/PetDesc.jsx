import React, { useEffect, useState } from "react";
import pet from "../images/pet5.2.jpg";
import pet2 from "../images/pet1.jpg";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PetDesc = () => {
  const { id } = useParams()
  const [petDetail, setPetDetail] = useState(null);
  const [owner,setOwner] = useState(null);
  useEffect(() => {
    const fetchPetDesc = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`)
      console.log(response)
      if (response.status === 200) {
        setPetDetail(response.data.data)
        const ownerResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,{
          id:response?.data?.data?.owner
        })
        setOwner(ownerResponse.data.data)
      }
    }
    fetchPetDesc();
  }, [])
  const [openDetail,setOpenDetail] = useState(false);
  const handleToggle = ()=>{
    setOpenDetail(prev=>!prev)
  }
  return (
    <>
      <Header title='Login' color={"text-white"} />
      <div>
        <div className="flex w-4/5 m-auto px-7 py-12">
          <div className="w-3/5 flex justify-center">
            <div className="">
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${petDetail?.image?.slice(6)}`} alt="" className="rounded-3xl" />
            </div>
          </div>
          <div className=" w-2/5">
            {/* <h1 className="text-5xl font-semibold">{petDetail?.name}</h1> */}
            <h3 className="pt-8 text-5xl font-semibold text-gray-500">About : {petDetail?.name?.split("")[0].toUpperCase() + petDetail?.name?.slice(1)}</h3>
            {!openDetail && <p className="mt-5 text-justify text-xl">
              {petDetail?.description}
            </p>}
            <button onClick={handleToggle} className="mt-4 py-3 px-7 bg-gray-600 font-semibold text-white rounded-3xl">{openDetail ? 'Show Less':'Show More...'}</button>
            {!openDetail && <div className="pt-7 flex items-center flex-wrap gap-9 text-2xl">
              <div>
                <i className="fa-solid fa-location-dot"></i>
                <span className="pl-2">{petDetail?.address}</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2"> {petDetail?.breed}</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2"> {petDetail?.age} years old</span>
                <br />
              </div>
              <div>
                <i class="fa-solid fa-paw"></i>
                <span className="pl-2">{petDetail?.gender}</span>
                <br />
              </div>
            </div>}
            {openDetail && <div className="flex flex-col gap-5 mt-6">
              <div className="flex flex-col gap-5">
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Address:
                  </span>
                  <p className="flex-1">{petDetail?.address}</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Breed:
                  </span>
                  <p className="flex-1">{petDetail?.breed}</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Age:
                  </span>
                  <p className="flex-1">{petDetail?.age} year's old</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Gender:
                  </span>
                  <p className="flex-1">{petDetail?.gender}</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Catogory:
                  </span>
                  <p className="flex-1">{petDetail?.category?.category_name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex text-2xl ">
                  <span className="font-bold flex-1 ">
                    Health Issues:
                  </span>
                  <p className="flex-1">{petDetail?.medication}</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                   Medication:
                  </span>
                  <p className="flex-1">{petDetail?.medication}</p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Vaccination Status:
                  </span>
                  <p className="flex-1">{petDetail?.vaccination_status} </p>
                </div>
                <div className="flex text-2xl">
                  <span className="font-bold flex-1 ">
                    Owner:
                  </span>
                  <p className="flex-1">{owner?.fullName}</p>
                </div>

              </div>

            </div>}
            <button className="mt-12 py-3 px-7 bg-gray-700 font-semibold text-white rounded-3xl">
              Meet Me!
            </button>
          </div>
        </div>

        {/* Recommend pets */}
        <div className="w-4/5 m-auto">
          <h1 className="mt-16 text-4xl font-bold">Other pets near you</h1>
          <div className="flex flex-wrap gap-14  justify-evenly py-12">
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
            <section>
              <img
                src={pet2}
                alt=""
                style={{ width: "300px" }}
                className="rounded-3xl"
              />
              <div className="p-5 flex flex-col justify-center gap-2">
                <h1 className="text-lg font-bold">Lily</h1>
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="pl-2">valencia, spain</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw"></i>{" "}
                  <span className="pl-2"> years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-user"></i>{" "}
                  <span className="pl-2">
                    Animal shelter: <span>Animal Paw</span>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDesc;
