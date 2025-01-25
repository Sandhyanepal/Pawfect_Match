// import React from 'react'
// import Header from '../component/Header'
// import About from '../component/About'
// // import pets from "../images/contact3.jpg";

// const Contact = () => {
//   return (
//     <>
//       <Header title="contact" />

//       {/* About US */}
//       <About />
//       {/* Next Contact */}
//       <div className="w-3/4 mx-auto my-10">
//         <div className="flex flex-wrap  border relative">
//           <section className="pl-12 mt-16">
//             <h1
//               className="py-2 pl-5 bg-gray-300 text-3xl font-bold"
//               style={{ fontFamily: 'lato' }}
//             >
//               CONTACT
//             </h1>
//             <form action="" className="flex flex-col w-2/5 pl-7 py-10">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="border-b-2 mb-5 pl-2"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="border-b-2 mb-5 pl-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Message"
//                 className="border-b-2 pl-2"
//               />
//               <button className="mt-7 bg-gray-700 text-white py-2 rounded-3xl">
//                 Send
//               </button>
//             </form>
//           </section>

//           <div className=" w-2/5 bg-gray-700 text-white absolute top-0 right-16">
//             <h2
//               className=" pl-7 font-bold text-xl"
//               style={{ fontFamily: 'lato', paddingTop: '75px' }}
//             >
//               INFO
//             </h2>

//             <div className="flex items-center gap-2 pl-5 pt-7">
//               <i className="fa-regular fa-envelope"></i>
//               <p>info@pawfectmatch.com </p>
//             </div>
//             <div className="flex items-center gap-3 pl-5 pt-7">
//               <i className="fa-solid fa-phone"></i>
//               <p>+22 45 89 235 </p>
//             </div>
//             <div className="flex items-center gap-3 pl-5 pt-7">
//               <i class="fa-regular fa-clock"></i>
//               <p>09:00-18:00</p>
//             </div>
//             <div className="pl-5 md:pt-28 pb-6">
//               <i class="fa-brands fa-facebook text-lg pr-3"></i>
//               <i class="fa-brands fa-instagram text-lg px-3"></i>
//               <i className="fa-brands fa-twitter text-lg px-3"></i>
//             </div>
//           </div>

//           <h1
//             className="py-6 pl-5 text-3xl font-bold bg-gray-300 flex gap-2"
//             style={{ fontFamily: 'lato' }}
//           >
//             <i class="fa-solid fa-paw"></i>
//             Pawfect Match
//           </h1>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Contact

// const Contact = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 md:px-0">
//       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-3xl font-semibold text-gray-900 text-center">
//           Contact us
//         </h1>
//         <p className="text-center text-gray-600 mt-2">
//           Need to get in touch with us? Either fill out the form with your
//           inquiry or find the{' '}
//           <a href="#" className="text-blue-500 underline">
//             department email
//           </a>{' '}
//           you’d like to contact below.
//         </p>

//         <form className="mt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700">First name*</label>
//               <input
//                 type="text"
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your first name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Last name</label>
//               <input
//                 type="text"
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your last name"
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-gray-700">Email*</label>
//             <input
//               type="email"
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-gray-700">
//               What can we help you with?
//             </label>
//             <textarea
//               className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               rows="4"
//               placeholder="Type your message here..."
//             ></textarea>
//           </div>

//           <div className="mt-6 text-center">
//             <button
//               type="submit"
//               className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Contact

import React from 'react'

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8 md:flex md:items-center md:justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-bold text-gray-800">Contact us</h2>
          <p className="mt-4 text-gray-600">
            Need to get in touch with us? Either fill out the form with your
            inquiry or find the department email you'd like to contact below.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 bg-white p-6 shadow-lg rounded-lg mt-6 md:mt-0">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name*"
              className="border p-3 rounded-md w-full"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="border p-3 rounded-md w-full"
            />
            <input
              type="email"
              placeholder="Email*"
              className="border p-3 rounded-md w-full md:col-span-2"
              required
            />
            <textarea
              placeholder="What can we help you with?"
              className="border p-3 rounded-md w-full md:col-span-2"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className=" text-black px-6 py-2 rounded-md w-full md:col-span-2"
              style={{ backgroundColor: '#d6ddd6' }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
