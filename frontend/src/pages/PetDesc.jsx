// import React, { useEffect, useState } from 'react'
// import pet2 from '../images/pet1.jpg'
// import Header from '../component/Header'
// import { NavLink, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import MeetForm from './MeetForm'
// import { useSelector } from 'react-redux'
// import { toast } from 'react-toastify'

// const PetDesc = () => {
//   const { id } = useParams()
//   const [petDetail, setPetDetail] = useState(null)
//   const [owner, setOwner] = useState(null)
//   const navigate = useNavigate()

//   const [showModal, setShowModal] = useState(false)

//   const { isLoggedIn } = useSelector((state) => state.loginStatus)

//   const [meet, showMeet] = useState(false)
//   const toggleMeet = () => {
//     if (!isLoggedIn) {
//       toast.error('Please Login to Continue!!')
//       navigate('/login')
//     }
//     showMeet((prev) => !prev)
//   }

//   useEffect(() => {
//     const fetchPetDesc = async () => {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
//       )
//       if (response.status === 200) {
//         setPetDetail(response.data.data)
//         const ownerResponse = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/get-individual-owner`,
//           {
//             id: response?.data?.data?.owner,
//           }
//         )
//         setOwner(ownerResponse.data.data)
//       }
//     }
//     fetchPetDesc()
//   }, [id])

//   const [openDetail, setOpenDetail] = useState(false)
//   const handleToggle = () => {
//     setOpenDetail((prev) => !prev)
//   }

//   return (
//     <>
//       <Header title="Login" color={'text-white'} />
//       <div className="flex w-4/5 m-auto px-7 py-12 flex-wrap">
//         <div className="w-full lg:w-1/2 flex flex-col items-center ">
//           <img
//             src={`${import.meta.env.VITE_BACKEND_URL}/${petDetail?.image?.slice(
//               6
//             )}`}
//             alt=""
//             className="rounded-3xl"
//           />
//         </div>
//         <div className="lg:pt-0 pt-5 pl-5 w-full lg:w-1/2 ">
//           <h1 className="text-4xl font-semibold">
//             {petDetail?.name?.split('')[0].toUpperCase() +
//               petDetail?.name?.slice(1)}
//           </h1>
//           <h3 className="pt-3 text-2xl font-semibold text-gray-500">About</h3>

//           {!openDetail && (
//             <div className="pt-5">
//               <p className="text-justify">{petDetail?.description}</p>
//               <div className="pt-5 flex items-center flex-wrap lg:gap-6 gap-10">
//                 <div>
//                   <i className="fa-solid fa-location-dot text-lg"></i>
//                   <span className="pl-2">{petDetail?.address}</span>
//                 </div>
//                 <div>
//                   <i className="fa-solid fa-paw text-lg"></i>
//                   <span className="pl-2"> {petDetail?.breed}</span>
//                 </div>
//                 <div>
//                   <i className="fa-solid fa-paw text-lg"></i>
//                   <span className="pl-2"> {petDetail?.age} years old</span>
//                 </div>
//                 <div>
//                   <i className="fa-solid fa-paw text-lg"></i>
//                   <span className="pl-2">{petDetail?.gender}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {openDetail && (
//             <div className="flex flex-col gap-2 mt-6">
//               <div className="flex flex-col gap-2">
//                 <div className="flex ">
//                   <span className="font-semibold flex-1 ">Address:</span>
//                   <p className="flex-1">{petDetail?.address}</p>
//                 </div>
//                 <div className="flex ">
//                   <span className="font-semibold flex-1 ">Breed:</span>
//                   <p className="flex-1">{petDetail?.breed}</p>
//                 </div>
//                 <div className="flex ">
//                   <span className="font-semibold flex-1 ">Age:</span>
//                   <p className="flex-1">{petDetail?.age} year's old</p>
//                 </div>
//                 <div className="flex ">
//                   <span className="font-semibold flex-1 ">Gender:</span>
//                   <p className="flex-1">{petDetail?.gender}</p>
//                 </div>
//                 <div className="flex ">
//                   <span className="font-semibold flex-1 ">Category:</span>
//                   <p className="flex-1">{petDetail?.category?.category_name}</p>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold flex-1 ">Health Issues:</span>
//                   <p className="flex-1">{petDetail?.health_issue}</p>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold flex-1 ">Medication:</span>
//                   <p className="flex-1">{petDetail?.medication}</p>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold flex-1 ">
//                     Vaccination Status:
//                   </span>
//                   <p className="flex-1">{petDetail?.vaccination_status} </p>
//                 </div>
//                 <div className="flex">
//                   <span className="font-semibold flex-1 ">Owner:</span>
//                   <p className="flex-1">{owner?.fullName}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//           <button onClick={handleToggle} className="mt-2 py-1 underline">
//             {openDetail ? 'Show Less' : 'Show More...'}
//           </button>
//           <br />
//           <button
//             onClick={toggleMeet}
//             // onClick={openModal}
//             className="bg-slate-500 text-white py-2 px-5 rounded-xl"
//           >
//             Meet Me
//           </button>
//         </div>
//         {meet &&
//           (isLoggedIn ? (
//             <MeetForm
//               petDetail={petDetail}
//               isLoggedIn={isLoggedIn}
//               showModal={showModal}
//               closeModal={closeModal}
//             />
//           ) : (
//             <NavLink to="/login"> Login to meet</NavLink>
//           ))}
//       </div>

//       {/* Modal for MeetForm */}
//       {meet && (
//         <>
//           {/* Background Blur */}
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

//           {/* Modal Content */}
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div
//               className="bg-white p-6 rounded-lg w-1/2 relative"
//               style={{
//                 maxWidth: '50vw',
//                 boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                 backdropFilter: 'blur(10px)',
//               }}
//             >
//               <button
//                 onClick={toggleMeet}
//                 className="absolute top-2 right-2 text-3xl font-bold text-red-500"
//               >
//                 <i className="fa-solid fa-xmark"></i>
//               </button>
//               {isLoggedIn ? (
//                 <MeetForm petDetail={petDetail} showMeet={showMeet} />
//               ) : (
//                 <NavLink to="/login" className="text-blue-500">
//                   Login to meet
//                 </NavLink>
//               )}
//             </div>
//           </div>
//         </>
//       )}

//       {/* Recommended pets */}
//       <div className="w-4/5 m-auto">
//         <h1 className="mt-16 text-4xl font-bold">Other pets near you</h1>
//         <div className="flex flex-wrap gap-14  justify-evenly py-12">
//           {/* Repeat the pet cards */}
//           {Array(3)
//             .fill()
//             .map((_, index) => (
//               <section key={index}>
//                 <img
//                   src={pet2}
//                   alt="pet"
//                   style={{ width: '300px' }}
//                   className="rounded-3xl"
//                 />
//                 <div className="p-5 flex flex-col justify-center gap-2">
//                   <h1 className="text-lg font-bold">Lily</h1>
//                   <div>
//                     <i className="fa-solid fa-location-dot"></i>
//                     <span className="pl-2">Valencia, Spain</span>
//                   </div>
//                   <div>
//                     <i className="fa-solid fa-paw"></i>
//                     <span className="pl-2">2 years old</span>
//                   </div>
//                   <div>
//                     <i className="fa-solid fa-user"></i>
//                     <span className="pl-2">Animal shelter: Animal Paw</span>
//                   </div>
//                 </div>
//               </section>
//             ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default PetDesc

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../component/Header'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MeetForm from './MeetForm'

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

export default PetDesc
