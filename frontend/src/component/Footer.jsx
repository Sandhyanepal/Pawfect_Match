import React from 'react'


const Footer = () => {
  return (
    <footer className='text-white text-center bg-gray-700'>
    <div className='footer w-11/12 m-auto flex justify-between'>
    <div className="foot text-4xl py-20 px-16">
    <i class="fa-solid fa-paw"></i>     
    </div>

    <div className="footer-middle flex justify-around">
         <div className="list-none pt-5 text-start">
            <h2 className='font-bold text-xl mb-2'>Adopt a pet</h2>
            <li className="pb-2">Adopt a dog</li>
            <li className="pb-2">Adopt a cat</li>
            <li className="pb-2">Adopt a bird</li>
            <li className="pb-2">Adopt a bird</li>
         </div>
         <div className="list-none px-16 pt-5 text-start">
            <h2 className="font-bold mb-2 text-xl">Topics</h2>
            <li className="pb-2">About Us</li>
            <li className="pb-2">How it works</li>
            <li className="pb-2">Shop</li>
            <li className="pb-2">Contact</li>
          </div>          
    </div>

    <div className="footer-end">
        <h2 className='font-bold text-xl text-start pt-5'>Sign up for our newsletter</h2>
        <form className="flex pt-3 justify-center">
            <input className="p-2 mt-1 text-black " type="email" placeholder='Enter email' />
            <button className='bg-gray-400 p-2 mt-1 '>Subscribe</button>
        </form>
    </div>
   
    </div>
    <hr className="w-11/12 m-auto mt-6" />
    <div className="cont text-start px-14 py-6 text-lg">&copy; 2024.All rights reserved
    <div className="footer-icons flex justify-end">
       <h5 className='px-6'>Follow us</h5>
       <i class="fa-brands fa-facebook text-lg px-3"></i>
       <i class="fa-brands fa-instagram text-lg px-3"></i>
       <i className="fa-brands fa-twitter text-lg px-3"></i>
    </div>
    </div>
    </footer>
  )
}

export default Footer