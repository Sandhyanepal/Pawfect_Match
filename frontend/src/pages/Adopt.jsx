import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../component/Card'
import Header from '../component/Header'
// import { getAllPets } from "../api/petApi";

const Adopt = () => {
  const [pets, setPets] = useState([])
  const [filterProduct, setFilterProduct] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallpets`
        )
        if (response?.data?.success) {
          setPets(response?.data?.data)
        }
      } catch (error) {
        console.error('Error fetching pets:', error)
      }
    }

    fetchPets()
  }, [])

  const handelSearch = (e) => {
    e.preventDefault()
    // console.log(search);
    const filteredPets = pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed.toLowerCase().includes(search.toLowerCase()) ||
        pet?.description?.toLowerCase().includes(search.toLowerCase()) ||
        pet.gender.toLowerCase().includes(search.toLowerCase())
    )
    setSearch('')
    if (filteredPets.length > 0) {
      setError(false)
      setFilterProduct(filteredPets)
    } else {
      setError(true)
    }
  }

  const handelChange = (e) => {
    const { name, value } = e.target
    setSearch(value)
  }
  return (
    <>
      <Header title="Adopt" color={'text-white'} />

      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-3xl font-semibold my-10">Find 🙲 Adopt</h1>
        <form onSubmit={handelSearch}>
          <input
            type="text"
            placeholder="Search"
            onChange={handelChange}
            // value={search}
          />
          <input type="submit" value="Submit" />
        </form>

        {error ? (
          <p className="text-red-500 text-center text-2xl">No No pets found</p>
        ) : filterProduct.length > 0 ? (
          filterProduct.map((pet) => <Card key={pet._id} pet={pet} />)
        ) : pets.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <Card key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">No pets found.</p>
        )}
      </div>
    </>
  )
}

export default Adopt
