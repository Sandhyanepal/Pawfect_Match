import React from "react";
import Card from "../component/Card";

const Adopt = () => {
  return (
    <div className="w-4/5 m-auto">

      <h1 className=" text-3xl font-semibold my-10">Find 🙲 Adopt</h1>

      {/* Filter space */}
      <div className="flex justify-evenly mt-5">
        <div className="p-2 flex flex-col items-center justify-center">
            <i class="fa-solid fa-dog text-xl"></i>
            <span>dog</span>
        </div>
        <div className="p-2 flex flex-col items-center justify-center">
            <i class="fa-solid fa-cat text-xl"></i>
            <span className="">cat</span>
        </div>
        <div className="p-2 flex flex-col">
            <span className="pr-2 pb-1">City</span>
            <input type="text" className="border-2 rounded-md"/>
        </div>
        <div className="p-2 flex flex-col">
            <span className="pr-2 pb-1">Size</span>
            <input type="text" className="border-2 rounded-md"/>
        </div>
        <div className="p-2 flex flex-col">
            <span className="pr-2 pb-1">Age</span>
            <input type="text" className="border-2 rounded-md"/>
        </div>
        <div className="flex flex-col justify-center mt-3">
            <button className="bg-gray-700 rounded-3xl text-white py-2 px-5">Find a friend</button>
        </div>
      </div>

      <Card />

    </div>
  );
};

export default Adopt;
