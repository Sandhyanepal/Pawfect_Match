import React, { useEffect, useState } from 'react'
import pet2 from '../images/pet1.jpg'
import Header from '../component/Header'
import { Link, NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import MeetForm from './MeetForm'
import { useSelector } from 'react-redux'

const PetDesc = () => {
  const { id } = useParams()
  const [petDetail, setPetDetail] = useState(null)
  const [owner, setOwner] = useState(null)

  const { isLoggedIn } = useSelector((state) => state.loginStatus)

  const [meet, showMeet] = useState(false)
  const toggleMeet = () => {
    showMeet((prev) => !prev)
  }
  useEffect(() => {
    const fetchPetDesc = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
      )
      if (response.status === 200) {
        setPetDetail(response.data.data)
        const ownerResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,
          {
            id: response?.data?.data?.owner,
          }
        )
        setOwner(ownerResponse.data.data)
      }
    }
    fetchPetDesc()
  }, [])
  const [openDetail, setOpenDetail] = useState(false)
  const handleToggle = () => {
    setOpenDetail((prev) => !prev)
  }
  return (
    <>
      <Header title="Login" color={'text-white'} />
      {/* <div> */}
      <div className="flex w-4/5 m-auto px-7 py-12 flex-wrap">
        {/* <div className="w-3/5 flex "> */}
        <div className="w-full lg:w-1/2 flex flex-col items-center ">
          {/* <div className=""> */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${petDetail?.image?.slice(
              6
            )}`}
            alt=""
            className="rounded-3xl"
          />
          {/* </div> */}
        </div>
        {/* About */}
        <div className="lg:pt-0 pt-5 pl-5 w-full lg:w-1/2 ">
          <h1 className="text-4xl font-semibold">
            {petDetail?.name?.split('')[0].toUpperCase() +
              petDetail?.name?.slice(1)}
          </h1>
          <h3 className="pt-3 text-2xl font-semibold text-gray-500">About</h3>
          {/* {!openDetail && (
              <p className="mt-5 text-justify text-xl">
                {petDetail?.description}
              </p>
            )} */}

          {!openDetail && (
            <div className="pt-5">
              <p className="text-justify">{petDetail?.description}</p>
              <div className="pt-5 flex items-center flex-wrap lg:gap-6 gap-10">
                <div>
                  <i className="fa-solid fa-location-dot text-lg"></i>
                  <span className="pl-2">{petDetail?.address}</span>
                </div>
                <div>
                  <i class="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2"> {petDetail?.breed}</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2"> {petDetail?.age} years old</span>
                  <br />
                </div>
                <div>
                  <i class="fa-solid fa-paw text-lg"></i>
                  <span className="pl-2">{petDetail?.gender}</span>
                  <br />
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
                  <span className="font-semibold flex-1 ">Catogory:</span>
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
          {/* toggle button */}
          <button onClick={handleToggle} className="mt-2 py-1 underline">
            {openDetail ? 'Show Less' : 'Show More...'}
          </button>
          <br />
          {/* form button */}
          <button
            onClick={toggleMeet}
            className="bg-slate-500 text-white py-2 px-5 rounded-xl"
          >
            Meet Me
          </button>
        </div>
        {meet &&
          (isLoggedIn ? (
            <MeetForm petDetail={petDetail} isLoggedIn={isLoggedIn} />
          ) : (
            <NavLink to="/login"> Login to meet</NavLink>
          ))}
      </div>

      {/* Recommend pets */}
      <div className="w-4/5 m-auto">
        <h1 className="mt-16 text-4xl font-bold">Other pets near you</h1>
        <div className="flex flex-wrap gap-14  justify-evenly py-12">
          <section>
            <img
              src={pet2}
              alt=""
              style={{ width: '300px' }}
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
                <i className="fa-solid fa-paw"></i>{' '}
                <span className="pl-2"> years old</span>
                <br />
              </div>
              <div>
                <i className="fa-solid fa-user"></i>{' '}
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
              style={{ width: '300px' }}
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
                <i className="fa-solid fa-paw"></i>{' '}
                <span className="pl-2"> years old</span>
                <br />
              </div>
              <div>
                <i className="fa-solid fa-user"></i>{' '}
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
              style={{ width: '300px' }}
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
                <i className="fa-solid fa-paw"></i>{' '}
                <span className="pl-2"> years old</span>
                <br />
              </div>
              <div>
                <i className="fa-solid fa-user"></i>{' '}
                <span className="pl-2">
                  Animal shelter: <span>Animal Paw</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default PetDesc
