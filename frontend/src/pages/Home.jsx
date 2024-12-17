import React, { useEffect } from "react";
import Header from "../component/Header";
import banner from "../images/banner3.png";
import people from "../images/people with dog.jpg";
import dnc from "../images/cat_and_dog_3.2.png";
import About from "../component/About";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <Header title="home" />

      {/* Banner */}
      <div
        className="home-banner w-full sm:flex pb-8"
        // style={{ backgroundColor: "#A39073" }}
      >
        <div className="w-full md:w-1/2">
          <img src={banner} alt="" srcset="" className="w-4/5 m-auto" />
          {/* <img src={dnc} alt="" className="w-full " /> */}
        </div>
        <div className="w-full md:w-1/2 md:flex flex-col justify-center">
          <h1
            className="banner-text w-3/5 mx-auto sm:mx-0 md:text-4xl text-3xl font-semibold py-5 md:text-left text-center"
            style={{ fontFamily: "lato" }}
          >
            You can't buy love, but you can rescue it!
          </h1>
          <div className="flex justify-center sm:flex sm:flex-col">
            <Link
              to="/adopt"
              className="w-32 text-white px-4 py-2 rounded-3xl text-lg bg-gray-700 "
            >
              Adopt a pet
            </Link>
          </div>
        </div>
      </div>

      {/* Filter space */}
      {/* <div className="sm:w-11/12 sm:flex flex-wrap justify-evenly my-12 w-4/5 m-auto">
        <div className="flex gap-5 justify-center">
          <div className="p-2 flex flex-col items-center justify-center">
            <i class="fa-solid fa-dog text-xl"></i>
            <span>dog</span>
          </div>
          <div className="p-2 flex flex-col items-center justify-center">
            <i class="fa-solid fa-cat text-xl"></i>
            <span className="">cat</span>
          </div>
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
          <button className="bg-gray-700 rounded-3xl text-white py-2 px-5">
            Find a friend
          </button>
        </div>
      </div> */}


      <div className="flex text-center justify-center gap-4 pe-3 mt-14 mb-6">
        <input type="text" placeholder="Search for pets..." className="border-2 p-3" style={{width:"71%"}} />
        <button className="border bg-gray-700 p-3 w-32 text-white text-lg" >Search</button>
      </div>

      {/* About Us */}
      <About />

      {/* How Adoption works */}
      <div className=" flex w-full flex-wrap pb-14">
        {/* <div className="w-full "> */}
        <img
          src={people}
          alt=""
          srcset=""
          className="w-full sm:w-1/3 object-cover pl-36"
        />
        {/* </div> */}
        <div
          className="w-full sm:w-2/3 p-20"
          // style={{ boxShadow: "0 10px 6px -6px #777" }}
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
              <li className="pl-2">
                Go through adoption requirement and checklist
              </li>
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
          <button className="mt-9 bg-gray-700 text-white py-2 px-5 rounded-3xl">
            Pet adoption FAQs
          </button>
        </div>
      </div>

      {/* Adopt Today */}
      <div className="home-adoption w-full pt-16" style={{}}>
        <h1
          className="text-3xl pt-9 font-semibold w-4/5 mx-auto"
          style={{ fontFamily: "lato" }}
        >
          Adopt today
        </h1>
        <div className="w-4/5 md:flex  m-auto">
          <div className="w-full md:w-1/2">
            <p className="pt-7">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusantium nostrum aliquam doloribus reiciendis minima, possimus
              repellat architecto nesciunt odio ullam cumque ea labore facere?
              Similique.
            </p>
            <button className="bg-gray-700 text-white mt-7 rounded-3xl px-5 py-2">
              Find a Friend
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img src={dnc} alt="" className="w-full " />
          </div>
        </div>
      </div>

      {/* Next Contact */}
      <div id="contact" className="w-3/4 mx-auto my-16">
        <div className="border relative">
          <section className="pl-12 mt-16">
            <h1
              className="py-2 pl-5 bg-gray-300 text-3xl font-bold"
              style={{ fontFamily: "lato" }}
            >
              CONTACT
            </h1>
            <form action="" className="flex flex-col w-2/5 pl-7 py-10">
              <input
                type="text"
                placeholder="Name"
                className="border-b-2 mb-5 pl-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="border-b-2 mb-5 pl-2"
              />
              <input
                type="text"
                placeholder="Message"
                className="border-b-2 pl-2"
              />
              <button className="mt-7 bg-gray-700 text-white py-2 rounded-3xl">
                Send
              </button>
            </form>
          </section>
          <div className=" w-2/5 bg-gray-700 text-white absolute top-0 right-16">
            <h2
              className=" pl-7 font-bold text-xl"
              style={{ fontFamily: "lato", paddingTop: "75px" }}
            >
              INFO
            </h2>
            <div className="flex items-center gap-2 pl-5 pt-7">
              <i className="fa-regular fa-envelope"></i>
              <p>info@pawfectmatch.com </p>
            </div>
            <div className="flex items-center gap-3 pl-5 pt-7">
              <i className="fa-solid fa-phone"></i>
              <p>+22 45 89 235 </p>
            </div>
            <div className="flex items-center gap-3 pl-5 pt-7">
              <i class="fa-regular fa-clock"></i>
              <p>09:00-18:00</p>
            </div>
            <div className="pl-5 md:pt-28 pb-6">
              <i class="fa-brands fa-facebook text-lg pr-3"></i>
              <i class="fa-brands fa-instagram text-lg px-3"></i>
              <i className="fa-brands fa-twitter text-lg px-3"></i>
            </div>
          </div>
          <h1
            className="py-6 pl-5 text-3xl font-bold bg-gray-300 flex gap-2"
            style={{ fontFamily: "lato" }}
          >
            <i className="fa-solid fa-paw font-bold text-3xl -rotate-45"></i>
            Pawfect Match
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
