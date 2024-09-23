import React from "react";
// import pets from "../images/contact3.jpg";

const Contact = () => {
  return (
    <>
      {/* <div className="contact bg-sky-50 h-[100vh]">
        <div className="contactimg">
          <img src={pets} className="w-full h-[65vh] m-auto" alt="" />
        </div>
        <h1 className="text-2xl pt-9 ps-32 text-orange-500">Contact</h1>
        <div className="wrapper w-11/12 mx-auto pt-5 flex ps-16">
          <h2 className="text-4xl w-1/3">Contact us for more information</h2>
          <p className="pt-3 w-7/12">
            Are you looking forward to give a pet its forever home? Your perfect
            furry companion is waiting for you with us. Just leave behind the
            details by filling up the simple form below and our team will get in
            touch with you about the adoption process.
          </p>
        </div>
      </div>

      <div className="container mt-14 w-11/12 m-auto">
        <h3 className=" text-2xl text-center font-bold">Send Us A Message</h3>
        <form action="" className="py-2 mt-3">
          <div className="form-top flex pb-2 gap-3">
            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 w-1/2 mb-2"
            />
            <input
              type="text"
              placeholder="Enter your number"
              className="border p-2 w-1/2 mb-2"
            />
          </div>

          <div className="form-top flex pb-2 gap-3">
            <input
              type="text"
              placeholder="Enter your email"
              className="border p-2 w-full mb-2"
            />
          </div>
          <textarea
            name=""
            id=""
            rows="5"
            cols="5"
            placeholder="Message"
            className="border w-full p-2"
          ></textarea>
        </form>
        <div className="flex justify-end">
          <button className="bg-orange-400 px-4 py-1 rounded-xl">
            Send Message
          </button>
        </div>
      </div> */}

      {/* Next Contact */}
      <div className="w-3/4 mx-auto my-10">
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
            {/* <p className="px-7 pt-5 pb-6 text-justify lg:pb-10">
              Are you looking forward to give a pet its forever home? Your
              perfect furry companion is waiting for you with us. Just leave
              behind the details by filling up the simple form and our team will
              get in touch with you about the adoption process.
            </p> */}
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
            <i class="fa-solid fa-paw"></i>
            Pawfect Match
          </h1>
        </div>
      </div>
    </>
  );
};

export default Contact;
