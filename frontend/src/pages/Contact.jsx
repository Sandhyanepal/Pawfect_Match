import React from 'react'

const Contact = () => {
  return (
    <>
       <div className="contact mt-8 bg-sky-50 h-[100vh]">
        <div className="contactimg">
          <img src="contact3.jpg" className='w-full h-[65vh] m-auto' alt="" />
        </div>
        <h1 className='text-2xl pt-9 ps-32 text-orange-500'>Contact</h1>
        <div className="wrapper w-11/12 mx-auto pt-5 flex ps-16">
        <h2 className='text-4xl w-1/3'>Contact us for more information</h2>
        <p className='pt-3 w-7/12'>
        Are you looking forward to give a pet its forever home? Your perfect furry companion is waiting for you with us. Just leave behind the details by filling up the simple form below and our team will get in touch with you about the adoption process.
        </p>
        </div>
       </div>

       <div className="container mt-14 w-11/12 m-auto">
          <h3 className=' text-2xl text-center font-bold'>Send Us A Message</h3>
          <form action="" className='py-2 mt-3'>
            <div className="form-top flex pb-2 gap-3">
               <input type="text" placeholder='Enter your name' className='border p-2 w-1/2 mb-2'/>
               <input type="text" placeholder='Enter your number' className='border p-2 w-1/2 mb-2' />
            </div>

            <div className="form-top flex pb-2 gap-3">
               <input type="text" placeholder='Enter your email' className='border p-2 w-full mb-2'/>
            </div>
               <textarea name="" id="" rows="5" cols="5" placeholder='Message' className='border w-full p-2'></textarea>
          </form>
          <div className='flex justify-end'>
            <button className='bg-orange-400 px-4 py-1 rounded-xl'>Send Message</button>
          </div>
          

       </div>
    </>
  )
}

export default Contact