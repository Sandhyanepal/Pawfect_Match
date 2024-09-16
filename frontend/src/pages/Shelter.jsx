import React from "react";

const Shelter = () => {
  return (
    <div>
      <div className="w-5/6 mx-auto shelter h-[110vh] relative py-14">
        <div className="absolute right-5 w-1/3">
          <div className="heading font-bold text-xl pb-7">Latest Tips and News</div>
          <div className="flex flex-col justify-between">
            <div className="news bg-white w-full my-3 flex ">
              <div className="img-div">
                <img src="pet_bg.jpg" alt="" />
              </div>
              <div className="para-div px-4">
                <h2 className="font-bold">Dog's Anxiety</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, veritatis?
                </p>
              </div>
            </div>            
            <div className="news bg-white w-full my-3 flex">
              <div className="img-div">
                <img src="pet_bg.jpg" alt="" />                 
              </div>
              <div className="para-div px-4">
                <h2 className="font-bold"> Dog's Anxiety2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, modi?</p>
              </div>
            </div>
            <div className="news bg-white w-full my-3 flex">
              <div className="img-div">
                <img src="pet_bg.jpg" alt="" />                 
              </div>
              <div className="para-div px-4">
                <h2 className="font-bold">Dog's Anxiety3</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, voluptas.</p>
              </div>
            </div>
            <button className="border w-32 p-2 mt-6 rounded-r-3xl rounded-l-3xl">See all posts</button>
          </div>
        </div>
        {/* <img src="pet_bg.jpg" alt="petimg" className='w-full h-[70vh]'/> */}
      </div>

      <div className="pt-16 text-center">
          <h1 className="font-bold text-3xl">Over 100 animal shelter associations</h1>
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
