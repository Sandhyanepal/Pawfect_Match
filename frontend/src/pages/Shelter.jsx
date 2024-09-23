import React from "react";
// import pet from '../images/pet_bg.jpg'
import bg from "../images/bg1 shelter.jpg";

const Shelter = () => {
  return (
    <div>
      <div className="w-full shelter relative">
        <img src={bg} alt="" className="w-full" />

        <div className=" w-1/3 absolute top-14 right-32">
          <div className="heading font-bold text-xl pb-7">
            Latest Tips and News
          </div>

          <div className="flex flex-col justify-between">

            <div className="w-full news bg-white flex ">
              <div className="w-1/2">
                <img src={bg} alt="" className=""/>
              </div>
              <div className="w-1/2 para-div px-4">
                <h2 className="font-bold pt-5">Dog's Anxiety</h2> 
                <p className="pt-2 pb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, veritatis?
                </p>
              </div>
            </div>


            <div className="w-full news my-3 bg-white flex ">
              <div className="w-1/2">
                <img src={bg} alt="" className=""/>
              </div>
              <div className="w-1/2 para-div px-4">
                <h2 className="font-bold pt-5">Dog's Anxiety</h2> 
                <p className="pt-2 pb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, veritatis?
                </p>
              </div>
            </div>

            <div className="w-full news my-3 bg-white flex ">
              <div className="w-1/2">
                <img src={bg} alt="" className=""/>
              </div>
              <div className="w-1/2 para-div px-4">
                <h2 className="font-bold pt-5">Dog's Anxiety</h2> 
                <p className="pt-2 pb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, veritatis?
                </p>
              </div>
            </div>
            
            <button className="border w-32 p-2 mt-6 rounded-r-3xl rounded-l-3xl">
              See all posts
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 text-center">
        <h1 className="font-bold text-3xl">
          Over 100 animal shelter associations
        </h1>
        <h1 className="font-bold text-3xl pt-1">partnered with us</h1>
        <div className="icons mt-10 flex justify-evenly w-9/12 ps-96 ">
          <div className="">
            <img src="logo.jpg" className="h-20 rounded-full" alt="" />
          </div>
          <div className="">
            <img src="logo5.jpg" className="h-20 rounded-full" alt="" />
          </div>
          <div className="">
            <img src="logo.jpg" className="h-20 rounded-full" alt="" />
          </div>
          <div className="">
            <img src="logo5.jpg" className="h-20 rounded-full" alt="" />
          </div>
          <div className="">
            <img src="logo.jpg" className="h-20 rounded-full" alt="" />
          </div>
          <div className="">
            <img src="logo5.jpg" className="h-20 rounded-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelter;
