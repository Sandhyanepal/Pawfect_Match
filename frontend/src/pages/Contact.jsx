import React from "react";
import Header from "../component/Header";
// import pets from "../images/contact3.jpg";

const Contact = () => {
  return (
    <>
      <Header title='contact'/>

      {/* Next Contact */}
      <div className="w-3/4 mx-auto my-10">
        <div className="flex flex-wrap  border relative">
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
            <i class="fa-solid fa-paw"></i>
            Pawfect Match
          </h1>

        </div>
      </div>
    </>
  );
};

export default Contact;


