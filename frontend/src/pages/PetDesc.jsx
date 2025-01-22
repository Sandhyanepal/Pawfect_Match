import React, { useEffect, useState } from 'react'
// import pet2 from '../images/pet1.jpg'
import Header from '../component/Header'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MeetForm from './MeetForm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Recommend from '../component/recommend/Recommend'

const PetDesc = () => {
  const { id } = useParams()
  const [petDetail, setPetDetail] = useState(null)
  const [owner, setOwner] = useState(null)
  const navigate = useNavigate()

  const { isLoggedIn } = useSelector((state) => state.loginStatus)

  const [meet, showMeet] = useState(false)
  const toggleMeet = () => {
    if (!isLoggedIn) {
      toast.error('Please Login to Continue!!')
      navigate('/login')
    }
    showMeet((prev) => !prev)
  }

  // useEffect(() => {
  //   const fetchPetDesc = async () => {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
  //     )
  //     if (response.status === 200) {
  //       setPetDetail(response.data.data)
  //       const ownerResponse = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,
  //         {
  //           id: response?.data?.data?.owner,
  //         }
  //       )
  //       setOwner(ownerResponse.data.data)
  //     }
  //   }
  //   fetchPetDesc()
  // }, [id])

  useEffect(() => {
    const fetchPetDesc = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
        )

        if (response.status === 200) {
          setPetDetail(response.data.data)

          // Log the owner ID before making the request
          console.log('Owner ID:', response.data.data.owner)

          // Fetch owner details using GET request with URL parameters
          const ownerResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner/${
              response.data.data.owner
            }`
          )

          if (ownerResponse.status === 200) {
            setOwner(ownerResponse.data.data)
          } else {
            console.error('Owner ID is undefined or missing.')
          }
        }
      } catch (error) {
        console.error('Error fetching pet details:', error)
      }
    }

    fetchPetDesc()
  }, [id])

  // const [openDetail, setOpenDetail] = useState(false);
  // const handleToggle = () => {
  //   setOpenDetail((prev) => !prev);
  // };

  // const toggleMeetModal = () => {
  //   if (!isLoggedIn) {
  //     toast.error('Please Login to Continue!')
  //     navigate('/login')
  //   } else {
  //     showMeet((prev) => !prev)
  //   }
  // }

  if (!petDetail) return <div>Loading...</div>

  return (
    <>
      <Header title="Login" color={'text-white'} />

      {/* MAIN */}
      <main className="w-11/12 m-auto py-5">
        <div className="flex flex-wrap gap-6">
          {/* Image Gallery */}
          <div className="flex-1 min-w-[300px]">
            <div className="w-full h-72 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/${petDetail.image?.slice(6)}`}
                alt={petDetail.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[300px] pt-1">
            <h1 className="text-3xl font-semibold mb-4 capitalize">
              {petDetail.name}
            </h1>
            <div className="mb-4">
              <p>
                <span className="font-semibold text-lg">Breed: </span>
                {petDetail.breed}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-semibold text-lg">Age: </span>
                {petDetail.age} years old
              </p>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-semibold text-lg">Gender: </span>
                {petDetail.gender}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-semibold text-lg">Category: </span>
                {petDetail.category?.category_name}
              </p>
            </div>
            <button
              onClick={toggleMeet}
              className="bg-black text-white py-2 px-5 rounded-lg mt-2"
            >
              Meet Me
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mt-6">
          <div className="px-4 py-2 border-b-2 border-red-500 font-bold">
            Description
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-4">{petDetail.description}</p>
          <ul className="list-disc pl-6">
            <li>Health Issues: {petDetail.health_issue || 'None'}</li>
            <li>Medication: {petDetail.medication || 'None'}</li>
            <li>
              Vaccination Status: {petDetail.vaccination_status || 'Unknown'}
            </li>
          </ul>
        </div>

        {/* Owner Information */}
        {owner && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Owner Information</h3>
            <p className="font-semibold">Name: {owner.fullName}</p>
          </div>
        )}

        {/* Modal for MeetForm */}
        {meet && (
          <>
            {/* Background Blur */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="bg-white p-6 rounded-lg relative "
                style={{
                  maxWidth: '90vw',
                  maxHeight: '95vh', // Ensure the modal doesn't exceed the screen height
                  overflowY: 'auto',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <button
                  onClick={toggleMeet}
                  className="absolute top-4 right-6 text-3xl font-bold text-red-500"
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
        <div className="pb-5">
          <Recommend />
        </div>
      </main>
    </>
  )
}

export default PetDesc
