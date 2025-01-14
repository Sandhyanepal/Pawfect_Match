import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MeetForm = ({ petDetail, showMeet }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    occupation: '',
    homeOwnership: 'Rent',
    allergies: false,
    hasPets: false,
    owner: petDetail?.owner,
    petId: petDetail?._id,
    currentPets: [
      {
        breed: petDetail?.breed,
        age: petDetail?.age,
        gender: petDetail?.gender,
        vaccinated: true,
        name: petDetail?.name,
        image: petDetail?.image,
      },
    ],
    termsAndConditions: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePetChange = (index, e) => {
    const { name, value, type, checked } = e.target
    const newPets = [...formData.currentPets]
    if (type === 'checkbox') {
      newPets[index][name] = checked
    } else {
      newPets[index][name] = value
    }
    setFormData((prevData) => ({
      ...prevData,
      currentPets: newPets,
    }))
  }

  const addPet = () => {
    setFormData((prevData) => ({
      ...prevData,
      currentPets: [
        ...prevData.currentPets,
        { species: '', breed: '', age: '', gender: 'Male', vaccinated: false },
      ],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = {
      ...formData,
      ...(formData.hasPets && {
        currentPets: formData.currentPets.filter(
          (pet) => pet.species || pet.breed || pet.age || pet.vaccinated
        ),
      }),
    }

    try {
      const response = await fetch('http://localhost:5002/submitform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Form submitted successfully!')
        setFormData({
          fullName: '',
          dateOfBirth: '',
          address: '',
          phoneNumber: '',
          email: '',
          occupation: '',
          homeOwnership: 'Rent',
          allergies: false,
          hasPets: false,
          owner: petDetail?.owner,
          currentPets: [
            {
              species: '',
              breed: '',
              age: '',
              gender: 'Male',
              vaccinated: false,
            },
          ],
          termsAndConditions: false,
        })
        showMeet(false)
      } else {
        toast.error('Form submission failed!')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  const handleClose = () => {
    showMeet(false) // Closes the modal passed as a prop
  }

  return (
    <div className="bg-white m-auto">
      <h1 className="text-3xl font-sans text-center pt-8 font-bold">
        Meet Form
      </h1>
      <form onSubmit={handleSubmit} className="sm:p-10 p-5">
        {/* Rest of the form */}
      </form>
    </div>
  )
}

export default MeetForm
