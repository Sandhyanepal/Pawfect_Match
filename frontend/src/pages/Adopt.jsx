import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";

const Adopt = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/pet/getallpets"
        );
        if (response.data.success) {
          setPets(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="w-4/5 m-auto">
      <h1 className="text-3xl font-semibold my-10">Find 🙲 Adopt</h1>

      <div className="flex justify-evenly mt-5">
        <div className="p-2 flex flex-col items-center justify-center">
          <i className="fa-solid fa-dog text-xl"></i>
          <span>dog</span>
        </div>
        <div className="p-2 flex flex-col items-center justify-center">
          <i className="fa-solid fa-cat text-xl"></i>
          <span className="">cat</span>
        </div>
        <div className="p-2 flex flex-col">
          <span className="pr-2 pb-1">City</span>
          <input type="text" className="border-2 rounded-md" />
        </div>
        <div className="p-2 flex flex-col">
          <span className="pr-2 pb-1">Size</span>
          <input type="text" className="border-2 rounded-md" />
        </div>
        <div className="p-2 flex flex-col">
          <span className="pr-2 pb-1">Age</span>
          <input type="text" className="border-2 rounded-md" />
        </div>
        <div className="flex flex-col justify-center mt-3">
          <button className="bg-gray-800 rounded-3xl text-white p-2">
            Find a friend
          </button>
        </div>
      </div>

      {pets.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No pets found.</p>
      )}
    </div>
  );
};

export default Adopt;
