import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchSection = ({ type, setType, setKeyword }) => {
    const types = [
        { name: 'All', value: 'all' },
        { name: "Food", value: "food" },
        { name: "Toys", value: "toys" },
        { name: "Accessories", value: "accessories" },
    ];

    const handleTypeSelect = (e) => {
        setType(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Add any additional search logic here
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-4">
            <form
                onSubmit={handleSearch}
                className="relative flex items-center"
            >
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full h-10 pl-4 pr-32 py-2 bg-gray-100 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                        aria-label="Search input"
                    />

                    <div className="absolute right-0 top-0 h-full">
                        <select
                            className="h-full px-3 bg-white border-l border-gray-200 focus:outline-none cursor-pointer"
                            onChange={handleTypeSelect}
                            value={type}
                            aria-label="Select product type"
                        >
                            {types.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="h-10 px-4 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-label="Submit search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default SearchSection;