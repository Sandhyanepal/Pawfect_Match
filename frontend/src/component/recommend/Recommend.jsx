import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Simple SVG icons as components
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4 mr-1 text-yellow-500"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ActivityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4 mr-2"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const PetRecommendations = () => {
  const preferences = useSelector(
    (state) => state.loginStatus.userDetail.preferences
  )
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    if (preferences?.breed || preferences?.category) {
      const fetchPets = async () => {
        setLoading(true)
        setError('')

        try {
          const queryParams = new URLSearchParams({
            ...(preferences?.breed && { breed: preferences.breed }),
            ...(preferences?.category && { category: preferences.category }),
            ...(preferences?.age && { age: preferences.age }),
            ...(preferences?.gender && { gender: preferences.gender }),
          })

          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/suggestedpets?${queryParams}`
          )

          if (response.data.success) {
            setPets(response.data.data.filter((pet) => pet.similarity > 0.7))
          } else {
            setError('No matching pets found based on your preferences.')
          }
        } catch (error) {
          setError('Failed to fetch pet recommendations.')
          console.error('Recommendation fetch error:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchPets()
    }
  }, [preferences])

  if (loading) {
    return (
      <div className="w-4/5 m-auto">
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow flex-1">
              <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-4/5 m-auto">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mt-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold mb-4">Recommended Pets</h2>
        <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
          {pets.length} matches found
        </span>
      </div>

      <Slider {...settings}>
        {pets.map((pet, index) => (
          <div key={index} className="px-2">
            <PetCard pet={pet} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const PetCard = ({ pet }) => {
  const similarity = Math.round(pet.similarity * 100)

  return (
    <NavLink to={`/pet/${pet.pet._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${pet.pet.image.slice(
              6
            )}`}
            alt={pet.pet.name}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-sm flex items-center">
            <StarIcon />
            {similarity}% Match
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{pet.pet.name}</h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <ActivityIcon />
              {pet.pet.age} years old · {pet.pet.gender}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                {pet.pet.category?.category_name}
              </span>
              <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                {pet.pet.breed}
              </span>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  pet.pet.vaccination_status === 'vaccinated'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {pet.pet.vaccination_status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default PetRecommendations
