import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../component/Header'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const PetDesc = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [petDetail, setPetDetail] = useState(null)
  const [owner, setOwner] = useState(null)
  const { isLoggedIn } = useSelector((state) => state.loginStatus)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchPetDesc = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
        )
        if (response.status === 200) {
          setPetDetail(response.data.data)
          const ownerResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,
            { id: response.data.data.owner }
          )
          setOwner(ownerResponse.data.data)
        }
      } catch (error) {
        console.error('Error fetching pet details:', error)
        toast.error('Failed to fetch pet details.')
      }
    }
    fetchPetDesc()
  }, [id])

  const toggleMeetModal = () => {
    if (!isLoggedIn) {
      toast.error('Please Login to Continue!')
      navigate('/login')
    } else {
      setShowModal((prev) => !prev)
    }
  }

  if (!petDetail) return <div>Loading...</div>

  return (
    <div className="font-sans">
      <Header />
      {/* Main Content */}
      <main className="p-6 pl-10">
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
              onClick={toggleMeetModal}
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

        {/* Related Products */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
          <div className="flex gap-4 overflow-x-auto">
            <div className="w-36 h-36 bg-gray-300 text-center">
              [Product Image]
            </div>
            <div className="w-36 h-36 bg-gray-300 text-center">
              [Product Image]
            </div>
            <div className="w-36 h-36 bg-gray-300 text-center">
              [Product Image]
            </div>
            <div className="w-36 h-36 bg-gray-300 text-center">
              [Product Image]
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PetDesc;
