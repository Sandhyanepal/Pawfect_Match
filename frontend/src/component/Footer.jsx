import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Footer = () => {
  const [mail, setMail] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Thank your for subscribing!!')
    setMail('')
  }
  return (
    <>
      <footer
        className="w-full absolute pt-5"
        style={{ backgroundColor: '#d6ddd6' }}
      >
        <div className="footer w-11/12 m-auto flex flex-col md:flex-row  pt-3 justify-between">
          <div className="md:w-1/5 text-center pt-2">
            <i className="fa-solid fa-paw font-bold py-2 mb-1 text-5xl -rotate-45"></i>
          </div>

          <div className="footer-middle flex justify-around md:w-2/5 max-sm:flex-col">
            <div className="list-none px-10 pt-3 text-start">
              <h2 className="font-bold mb-2">TOPICS</h2>
              <li className="pb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="pb-2">
                <Link to="/">About</Link>
              </li>
              <li className="pb-2">
                <Link to="/">Contact</Link>
              </li>
            </div>

            <div className="list-none px-10 pt-3 text-start">
              <h2 className="font-bold mb-2 text-xl">Quick Links</h2>
              <li className="pb-2">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="pb-2">
                <Link to="">Privacy</Link>
              </li>
              <li className="pb-2">
                <Link to="">Pet Care Information</Link>
              </li>
            </div>
          </div>

          <div className=" w-full flex-wrap md:w-2/5 mt-5 md:mt-0">
            <h2 className="font-semibold pt-3 pl-5 sm:pl-20 md:pl-10  sm:text-xl text-lg">
              Sign up for our newsletter
            </h2>

            <form
              className="flex pt-3 pl-5 sm:pl-20 md:pl-10  gap-1"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full p-2 rounded-md mt-1 text-black "
                type="email"
                placeholder="Enter email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <input type="hidden" />
              <input type="hidden" />
              <button
                type="submit"
                className="p-2 rounded-lg mt-1 shadow-md"
                style={{ backgroundColor: '#f9f8f6' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr className="w-11/12 m-auto mt-6 border-black" />
        <div className="cont py-6 text-sm md:text-lg w-11/12 mx-auto text-center">
          &copy; 2024 Copyright - Pawfect Match
        </div>
      </footer>
    </>
  )
}

export default Footer
