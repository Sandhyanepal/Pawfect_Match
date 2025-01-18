import React, { useState } from 'react'

const SearchSection = ({ type, setType }) => {
    const types = [
        { name: "Food", value: "food" },
        { name: "Toys", value: "toys" },
        { name: "Accessories", value: "accessories" },
    ];
    const [showTypes, setShowTypes] = useState(false);

    const handelTypeSelect = (type) => {
        setType(type)
    }
    const handleTypeToggle = () => {
        setShowTypes(prev => !prev)
    }
    return (
        <div>
            <form
                // onSubmit={handleSearch}
                className="relative min-w-96 h-10 mx-auto overflow-hidden rounded-2xl"
            >
                <input
                    type="text"
                    placeholder="Search"
                    // onChange={handleChange}
                    className="w-full h-full rounded-2xl pl-3 py-1 bg-gray-100"
                />
                <div
                    className="absolute border-2 border-white border-r-2 px-5 right-11 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer"
                    onClick={handleTypeToggle}
                >
                    {/* <p className="text-black">{selectedCategory}</p> */}
                    <p>Hello</p>
                </div>
                <button
                    type="submit"
                    className="cursor-pointer px-4 text-white h-full absolute right-0"
                >
                    <i className="text-black fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {showTypes && (
                <div className="absolute rounded-2xl bg-white border-2 border-gray-200 shadow-lg right-20 w-48 z-10">
                    <ul className="max-h-40 overflow-y-auto">
                        {types.map((type, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handelTypeSelect(type.value)}
                            >
                                {type.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchSection
