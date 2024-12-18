import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MeetForm = ({ petDetail, isLoggedIn }) => {
  const navigate = useNavigate();
  console.log(petDetail);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    email: "",
    occupation: "",
    homeOwnership: "Rent",
    allergies: false,
    hasPets: false, // Track if the user has pets
    owner: petDetail?.owner,
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
  });

  // Handle input changes for all form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle the dynamic pet fields
  const handlePetChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newPets = [...formData.currentPets];
    if (type === "checkbox") {
      newPets[index][name] = checked;
    } else {
      newPets[index][name] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      currentPets: newPets,
    }));
  };

  // Add a new pet form entry
  const addPet = () => {
    setFormData((prevData) => ({
      ...prevData,
      currentPets: [
        ...prevData.currentPets,
        { species: "", breed: "", age: "", gender: "Male", vaccinated: false },
      ],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      ...formData,
      ...(formData.hasPets
        ? {
            currentPets: formData.currentPets.filter(
              (pet) => pet.species || pet.breed || pet.age || pet.vaccinated
            ),
          }
        : {}), // Only include non-empty pets
    };

    try {
      const response = await fetch("http://localhost:5002/submitform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Form submitted successfully!");
        setFormData({
          fullName: "",
          dateOfBirth: "",
          address: "",
          phoneNumber: "",
          email: "",
          occupation: "",
          homeOwnership: "Rent",
          allergies: false,
          hasPets: false, // Track if the user has pets
          owner: petDetail?.owner,
          currentPets: [
            {
              species: "",
              breed: "",
              age: "",
              gender: "Male",
              vaccinated: false,
            },
          ],
          termsAndConditions: false,
        });
      } else {
        toast.error("Form submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full mt-4 bg-gray-100 flex items-center">
      <div
        className="md:w-1/2 bg-white m-auto w-3/4 my-20"
        style={{ boxShadow: "0 41.8px 33.4px rgba(0, 0, 0, 0.086)" }}
      >
        <h1
          className="text-3xl text-center pt-8 font-bold"
          style={{ fontFamily: "lato" }}
        >
          Meet Form
        </h1>
        <form onSubmit={handleSubmit} className="sm:p-10 p-5">
          <div className="form-group">
            <label htmlFor="fullName" className="text-lg">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth" className="text-lg">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="text-lg">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="text-lg">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="occupation" className="text-lg">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="w-full border-2 py-1 pl-2 my-1"
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="homeOwnership" className="pr-2 text-lg">
              Home Ownership
            </label>
            <select
              id="homeOwnership"
              name="homeOwnership"
              value={formData.homeOwnership}
              onChange={handleInputChange}
              className="p-1 border-2 rounded-md"
              required
            >
              <option value="Rent">Rent</option>
              <option value="Own">Own</option>
            </select>
          </div>

          <div className="mt-3">
            <label htmlFor="allergies" className="pr-2">
              Do you have allergies?
            </label>
            <input
              type="checkbox"
              id="allergies"
              name="allergies"
              checked={formData.allergies}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="hasPets" className="pr-2">
              Do you have pets?
            </label>
            <input
              type="checkbox"
              id="hasPets"
              name="hasPets"
              checked={formData.hasPets}
              onChange={handleInputChange}
            />
          </div>

          {/* Show pet fields only if hasPets is true */}
          {formData.hasPets && (
            <div className="mt-3">
              <label className="text-lg">Current Pets</label>
              {formData.currentPets.map((pet, index) => (
                <div key={index} className="pet-group">
                  <input
                    type="text"
                    name="species"
                    placeholder="Species"
                    value={pet.species}
                    onChange={(e) => handlePetChange(index, e)}
                    className="mr-2 border-2 py-1 mt-1 pl-2"
                  />
                  <input
                    type="text"
                    name="breed"
                    placeholder="Breed"
                    value={pet.breed}
                    onChange={(e) => handlePetChange(index, e)}
                    className="mr-2 border-2 py-1 mt-1 pl-2"
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={pet.age}
                    onChange={(e) => handlePetChange(index, e)}
                    className="mr-2 border-2 py-1 mt-1 pl-2"
                  />
                  <select
                    name="gender"
                    value={pet.gender}
                    onChange={(e) => handlePetChange(index, e)}
                    className="p-1 border-2 rounded-md mt-3 mr-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <label className="text-lg pr-2">Vaccinated?</label>
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={pet.vaccinated}
                    onChange={(e) => handlePetChange(index, e)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addPet}
                className="mt-3 bg-gray-700 px-2 py-1 text-white rounded-md"
              >
                Add Another Pet
              </button>
            </div>
          )}

          <div className="mt-3">
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              checked={formData.termsAndConditions}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="termsAndConditions" className="pl-2">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-gray-700 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeetForm;
