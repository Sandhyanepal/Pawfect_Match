import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../component/Card'
import Header from '../component/Header'
import Loader from '../component/Loader'

const Adopt = () => {
  const [pets, setPets] = useState([])
  const [filterProduct, setFilterProduct] = useState([])
  const [search, setSearch] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Category')
  const [showCategories, setShowCategories] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallpets`
        )
        if (response?.data?.success) {
          setPets(response?.data?.data)
        }
      } catch (error) {
        console.error('Error fetching pets:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
        )
        if (response.status === 200) {
          setCategories(response?.data || [])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchPets()
    fetchCategories()
  }, [])

  if (loading) {
    return <Loader />
  }

  const handleSearch = (e) => {
    e.preventDefault()

    let filteredPets = pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed.toLowerCase().includes(search.toLowerCase()) ||
        pet?.description?.toLowerCase().includes(search.toLowerCase()) ||
        pet.gender.toLowerCase().includes(search.toLowerCase())
    )

    if (selectedCategory && selectedCategory !== 'All Category') {
      filteredPets = filteredPets.filter(
        (pet) => pet.category.category_name === selectedCategory
      )
    }

    setSearch('')
    if (filteredPets.length > 0) {
      setError(false)
      setFilterProduct(filteredPets)
    } else {
      setError(true)
    }
  }

  const handleCategoryToggle = () => {
    setShowCategories((prev) => !prev)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowCategories(false)

    if (category === 'All Category') {
      setFilterProduct(pets)
      return
    }

    const filteredPets = pets.filter(
      (pet) => pet.category.category_name === category
    )
    setFilterProduct(filteredPets)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setKeyword(value)
  }

  const allCategories = [{ category_name: 'All Category' }, ...categories]

  return (
    <>
      <Header title="Adopt" color={'text-white'} />

      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-3xl font-semibold my-10">Find 🙲 Adopt</h1>
        <form
          onSubmit={handleSearch}
          className="relative min-w-96 h-10 mx-auto overflow-hidden rounded-2xl"
        >
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            className="w-full h-full rounded-2xl pl-3 py-1 bg-gray-100"
          />
          <div
            className="absolute border-2 border-white border-r-2 px-5 right-11 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer"
            onClick={handleCategoryToggle}
          >
            <p className="text-black">{selectedCategory}</p>
          </div>
          <button
            type="submit"
            className="cursor-pointer px-4 text-white h-full absolute right-0"
          >
            <i className="text-black fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {showCategories && (
          <div className="absolute rounded-2xl bg-white border-2 border-gray-200 shadow-lg right-20 w-48 z-10">
            <ul className="max-h-40 overflow-y-auto">
              {allCategories.map((category, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleCategorySelect(category.category_name)}
                >
                  {category.category_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* {filterProduct && <p className="mt-2">Search Results for: {keyword}</p>} */}
        {error ? (
          <p className="text-red-500 text-center text-2xl mt-10">
            No pets found
          </p>
        ) : filterProduct?.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterProduct.map((pet) => (
              <Card key={pet._id} pet={pet} />
            ))}
          </div>
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
