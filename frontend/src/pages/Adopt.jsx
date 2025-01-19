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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    setSidebarOpen((prev) => !prev)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSidebarOpen(false)

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

      <div className="flex flex-col min-h-screen">
        <h1 className="text-3xl font-semibold p-9 text-center md:text-left ">
          Find & Adopt
        </h1>
        {/* Search Bar */}
        <div className="w-full px-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-4 max-w-4xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className=" px-6 py-2 rounded-md shadow-md"
              style={{ backgroundColor: '#d6ddd6' }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Filter Button for Small Screens */}
        {!sidebarOpen && (
          <div className="flex md:hidden p-4">
            <button
              onClick={handleCategoryToggle}
              className=" px-6 py-2 rounded-md shadow-md"
              style={{ backgroundColor: '#d6ddd6' }}
            >
              Filter
            </button>
          </div>
        )}

        {/* Category Sidebar */}
        {sidebarOpen && (
          <div className="absolute top-0 left-0 w-full md:w-1/4 bg-white shadow-lg p-5 z-10 md:relative md:block">
            <h3 className="font-semibold text-xl">Categories</h3>
            <ul>
              {allCategories.map((category, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer ${
                    selectedCategory === category.category_name
                      ? 'font-bold text-blue-500'
                      : ''
                  } hover:bg-gray-200`}
                  onClick={() => handleCategorySelect(category.category_name)}
                >
                  {category.category_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar for medium and large screens */}
          <aside className="hidden md:block w-1/5 p-5">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="pl-1">
              <h3 className="font-medium mb-2">Categories</h3>
              <ul className="pl-1">
                {allCategories.map((category, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer ${
                      selectedCategory === category.category_name
                        ? 'font-bold text-blue-500'
                        : ''
                    } hover:bg-gray-200`}
                    onClick={() => handleCategorySelect(category.category_name)}
                  >
                    {category.category_name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1 px-5 md:ml-1/4 w-full overflow-y-auto">
            {/* Pet Cards */}
            {error ? (
              <p className="text-red-500 text-center text-2xl">No pets found</p>
            ) : filterProduct.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterProduct.map((pet) => (
                  <Card key={pet._id} pet={pet} />
                ))}
              </div>
            ) : pets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                  <Card key={pet._id} pet={pet} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg">No pets found.</p>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default Adopt
