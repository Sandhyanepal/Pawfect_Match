import React from "react";
// import Header from "../component/Header";
import banner from "../images/banner3.png";
import people from "../images/people with dog.jpg";
import dnc from "../images/cat_and_dog_3.2.png";

const Home = () => {
  return (
    <div>
      {/* <Header /> */}

      {/* Banner */}
      <div
        className="home-banner w-full sm:flex "
        // style={{ backgroundColor: "#A39073" }}
      >
        <div className="w-full md:w-1/2">
          <img src={banner} alt="" srcset="" className="w-4/5 m-auto" />
          {/* <img src={dnc} alt="" className="w-full " /> */}
        </div>
        <div className="w-full md:w-1/2 md:flex flex-col justify-center">
          <h1
            className="banner-text w-3/5 md:text-5xl text-3xl font-semibold py-5 md:text-left text-center"
            style={{ fontFamily: "lato" }}
          >
            You can't buy love, but you can rescue it!
          </h1>
          <button className="w-32 text-white px-4 py-2 rounded-3xl text-start text-lg bg-gray-800">
            Adopt a pet
          </button>
        </div>
      </div>

      {/* Filter space */}
      <div className="flex justify-evenly my-14 w-4/5 m-auto">
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
          <button className="bg-gray-800 rounded-3xl text-white py-2 px-5">
            Find a friend
          </button>
        </div>
      </div>

      {/* Adopt Today */}
      <div className="home-adoption flex w-full " style={{}}>
        <div className="w-4/5 md:flex  m-auto gap-4">
          <div className="w-full md:w-1/2">
            <h1
              className="text-3xl pt-9 font-semibold"
              style={{ fontFamily: "lato" }}
            >
              Adopt today
            </h1>
            <p className="pt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusantium nostrum aliquam doloribus reiciendis minima, possimus
              repellat architecto nesciunt odio ullam cumque ea labore facere?
              Similique.
            </p>
            <button className="bg-gray-800 text-white mt-7 rounded-3xl px-5 py-2">
              Find a Friend
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img src={dnc} alt="" className="w-full " />
          {/* <img src={banner} alt="" srcset="" className="w-4/5 m-auto" /> */}
          </div>
        </div>
      </div>

      {/* How Adoption works */}
      <div className=" flex w-full flex-wrap">
        {/* <div className="w-full "> */}
        <img
          src={people}
          alt=""
          srcset=""
          className="w-full md:w-1/3 object-cover"
        />
        {/* </div> */}
        <div
          className="w-full md:w-2/3 p-20"
          style={{ boxShadow: "0 10px 6px -6px #777" }}
        >
          <h1 className="text-4xl font-bold" style={{ fontFamily: "lato" }}>
            How adoption works
          </h1>
          <ul className="pt-9 text-xl text-gray-500">
            <div className="flex items-center pb-3">
              <i class="fa-solid fa-circle-check"></i>
              <li className="pl-2">Find a pet you wish to take home</li>
            </div>
            <div className="flex items-center pb-3">
              <i class="fa-regular fa-circle-check"></i>
              <li className="pl-2">Go through adoption requirement and checklist</li>
            </div>
            <div className="flex items-center pb-3">
              <i class="fa-regular fa-circle-check"></i>
              <li className="pl-2">Schedule a visit with shelter</li>
            </div>
            <div className="flex items-center pb-3">
              <i class="fa-regular fa-circle-check"></i>
              <li className="pl-2">Meet the pet and complete procedure</li>
            </div>
          </ul>
          <button className="mt-9 bg-gray-800 text-white py-2 px-5 rounded-3xl">Pet adoption FAQs</button>
        </div>
      </div>

      {/* Card */}
      {/* <div className="w-4/5 m-auto mt-14">
        <h1 className="text-3xl text-center font-bold" style={{fontFamily:"lato"}}>Love helping pets?</h1>
        <div></div>
      </div> */}
    </div>
  );
};

export default Home;
// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home
