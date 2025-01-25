// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { NavLink, useParams } from 'react-router-dom'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

import axios from 'axios'
import { ActivityIcon, StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

// // Simple SVG icons as components
// const StarIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     stroke="currentColor"
//     strokeWidth="2"
//     className="w-4 h-4 mr-1 text-yellow-500"
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// )

// const ActivityIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     className="w-4 h-4 mr-2"
//   >
//     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//   </svg>
// )

// const PetRecommendations = () => {
//   // const preferences = useSelector(
//   //   (state) => state.loginStatus.userDetail.preferences
//   // )
//   const { id } = useParams()
//   const [pets, setPets] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   }

//   // useEffect(() => {
//   //   if (preferences?.breed || preferences?.category) {
//   //     const fetchPets = async () => {
//   //       setLoading(true)
//   //       setError('')

//   //       try {
//   //         const queryParams = new URLSearchParams({
//   //           ...(preferences?.breed && { breed: preferences.breed }),
//   //           ...(preferences?.category && { category: preferences.category }),
//   //           ...(preferences?.age && { age: preferences.age }),
//   //           ...(preferences?.gender && { gender: preferences.gender }),
//   //         })

//   //         const response = await axios.get(
//   //           `${import.meta.env.VITE_BACKEND_URL}/suggestedpets?${queryParams}`
//   //         )

//   //         if (response.data.success) {
//   //           setPets(response.data.data.filter((pet) => pet.similarity > 0.7))
//   //         } else {
//   //           setError('No matching pets found based on your preferences.')
//   //         }
//   //       } catch (error) {
//   //         setError('Failed to fetch pet recommendations.')
//   //         console.error('Recommendation fetch error:', error)
//   //       } finally {
//   //         setLoading(false)
//   //       }
//   //     }

//   //     fetchPets()
//   //   }
//   // }, [preferences])

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       setLoading(true)
//       setError('')

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/suggestedpets/${id}`
//         )

//         if (response.data.success) {
//           setPets(response.data.data)
//         } else {
//           setError('No similar pets')
//         }
//       } catch (error) {
//         setError('Failed to fetch pet recommendations.')
//         console.error('Recommendation fetch error:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     if (id) {
//       fetchRecommendations()
//     }
//   }, [id])

//   if (loading) {
//     return (
//       <div className="w-4/5 m-auto">
//         <div className="flex gap-4">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg shadow flex-1">
//               <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse" />
//               <div className="p-4">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
//                 <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="w-4/5 m-auto">
//         <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//           {error}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-full mt-5">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold mb-4">Recommended Pets</h2>
//         <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//           {pets.length} matches found
//         </span>
//       </div>

//       <Slider {...settings}>
//         {pets.map((pet, index) => (
//           <div key={index} className="px-2">
//             <PetCard pet={pet} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   )
// }

// const PetCard = ({ pet }) => {
//   const similarity = Math.round(pet.similarity * 100)

//   // Ensure `pet.image` exists before using it
//   const imageUrl = pet.image
//     ? `${import.meta.env.VITE_BACKEND_URL}/${pet.image.replace(/^.*[\\/]/, '')}`
//     : '/placeholder.jpg' // Fallback placeholder image

//   return (
//     <NavLink to={`/pet/${pet._id}`} className="block">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
//         <div className="relative">
//           {/* <img
//             src={`${import.meta.env.VITE_BACKEND_URL}/${pet.image.slice(6)}`}
//             alt={pet.name}
//             className="w-full h-48 object-cover"
//           /> */}
//           <img
//             src={imageUrl}
//             alt={pet.name || 'Pet'}
//             className="w-full h-48 object-cover"
//           />
//           <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-sm flex items-center">
//             <StarIcon />
//             {similarity}% Match
//           </span>
//         </div>

//         <div className="p-4">
//           <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>

//           <div className="space-y-2">
//             <div className="flex items-center text-sm text-gray-600">
//               <ActivityIcon />
//               {pet.age} years old · {pet.gender}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//                 {pet.category?.category_name}
//               </span>
//               <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//                 {pet.breed}
//               </span>
//               <span
//                 className={`px-2 py-1 text-sm rounded-full ${
//                   pet.vaccination_status === 'vaccinated'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}
//               >
//                 {pet.vaccination_status}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </NavLink>
//   )
// }

// export default PetRecommendations

// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { NavLink } from 'react-router-dom'

// // Simple SVG icons as components
// const StarIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     stroke="currentColor"
//     strokeWidth="2"
//     className="w-4 h-4 mr-1 text-yellow-500"
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// )

// const ActivityIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     className="w-4 h-4 mr-2"
//   >
//     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//   </svg>
// )

// const PetRecommendations = () => {
//   const { id } = useParams()
//   const [pets, setPets] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       if (!id) return

//       setLoading(true)
//       setError('')

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/suggestedpets/${id}`
//         )

//         if (response.data.success && response.data.data.length > 0) {
//           setPets(response.data.data)
//         } else {
//           setError('No recommended pets found.')
//         }
//       } catch (error) {
//         console.error('Recommendation fetch error:', error)
//         setError('Failed to fetch pet recommendations.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRecommendations()
//   }, [id])

//   if (loading) {
//     return (
//       <div className="w-full px-4 mt-5">
//         <div className="flex gap-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg shadow flex-1">
//               <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse" />
//               <div className="p-4">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
//                 <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   // Don't render anything if no valid pets
//   if (!pets.length) {
//     return null
//   }

//   return (
//     <div className="w-full mt-5 px-4">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold">
//           {pets[0].similarity === 0.5 ? 'You might also like' : 'Similar Pets'}
//         </h2>
//         <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//           {pets.length} {pets.length === 1 ? 'match' : 'matches'} found
//         </span>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
//         {pets.map((pet) => (
//           <PetCard key={pet._id} pet={pet} />
//         ))}
//       </div>
//     </div>
//   )
// }

// const PetCard = ({ pet }) => {
//   const similarity = Math.round(pet.similarity * 100)

//   // Ensure `pet.image` exists before using it
//   const imageUrl = pet.image
//     ? `${import.meta.env.VITE_BACKEND_URL}/${pet.image.replace(/^.*[\\/]/, '')}`
//     : '/placeholder.jpg'

//   return (
//     <NavLink to={`/pet/${pet._id}`} className="block">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
//         <div className="relative">
//           <img
//             src={imageUrl}
//             alt={pet.name || 'Pet'}
//             className="w-full h-48 object-cover"
//           />
//           <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-sm flex items-center">
//             <StarIcon />
//             {similarity}% Match
//           </span>
//         </div>

//         <div className="p-4">
//           <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>

//           <div className="space-y-2">
//             <div className="flex items-center text-sm text-gray-600">
//               <ActivityIcon />
//               {pet.age} years old · {pet.gender}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//                 {pet.category?.category_name}
//               </span>
//               <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//                 {pet.breed}
//               </span>
//               <span
//                 className={`px-2 py-1 text-sm rounded-full ${
//                   pet.vaccination_status === 'vaccinated'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}
//               >
//                 {pet.vaccination_status}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </NavLink>
//   )
// }

// export default PetRecommendations

const PetRecommendations = () => {
  const { id } = useParams()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id) return

      setLoading(true)
      setError('')

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/suggestedpets/${id}`
        )

        // Add this console.log to see the exact data structure
        console.log('Response data:', response.data)

        if (response.data.success && response.data.data.length > 0) {
          // Check what's in each pet object
          // console.log('First pet data:', response.data.data[0])
          console.log('Total pets:', response.data.data.length)

          // If the pet data is nested inside a 'pet' property, extract it
          const processedPets = response.data.data.map((item) => {
            // If the data is nested in a 'pet' property, extract it
            const petData = item.pet || item
            return {
              ...petData,
              similarity: item.similarity || 0.5,
            }
          })

          setPets(processedPets)
        } else {
          setError('No recommended pets found.')
        }
      } catch (error) {
        console.error('Recommendation fetch error:', error)
        setError('Failed to fetch pet recommendations.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [id])

  // Add this to debug what's in the pets state
  console.log('Current pets state:', pets)

  if (loading) {
    return (
      // ... loading component
      <div>hello</div>
    )
  }

  // Don't render anything if no valid pets
  if (!pets.length) {
    return null
  }

  return (
    <div className="w-full mt-5 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Similar Pets</h2>
        <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
          {pets.length} {pets.length === 1 ? 'match' : 'matches'} found
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {pets.map((pet) => {
          // Add this to debug individual pet data
          console.log('Rendering pet:', pet)
          return <PetCard key={pet._id} pet={pet} />
        })}
      </div>
    </div>
  )
}

const PetCard = ({ pet }) => {
  // Add console.log to see what data is received by PetCard
  console.log('PetCard received data:', pet)

  const similarity = pet.similarity ? Math.round(pet.similarity * 100) : 50

  // Ensure `pet.image` exists and handle its path correctly
  const imageUrl = pet.image
    ? `${import.meta.env.VITE_BACKEND_URL}/${pet.image.replace(/^.*[\\/]/, '')}`
    : '/placeholder.jpg'

  // Add null checks for all pet properties
  return (
    <NavLink to={`/pet/${pet._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={imageUrl}
            alt={pet.name || 'Pet'}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-sm flex items-center">
            <StarIcon />
            {similarity}% Match
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {pet?.name || 'Unknown'}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <ActivityIcon />
              {pet?.age ? `${pet.age} years old` : 'Age unknown'} ·{' '}
              {pet?.gender || 'Unknown'}
            </div>

            <div className="flex flex-wrap gap-2">
              {pet?.category?.category_name && (
                <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {pet.category.category_name}
                </span>
              )}
              {pet?.breed && (
                <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {pet.breed}
                </span>
              )}
              {pet?.vaccination_status && (
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    pet.vaccination_status === 'vaccinated'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {pet.vaccination_status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default PetRecommendations
