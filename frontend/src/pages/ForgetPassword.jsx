// import React, { useState } from 'react'
// import { forgetpassword } from '../api/userApi'
// import Header from '../component/Header'

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('')
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     forgetpassword({ email })
//       .then((data) => {
//         if (data.error) {
//           setError(data.error)
//           setSuccess(false)
//         } else {
//           setError('')
//           setSuccess(true)
//           setEmail('')
//         }
//       })
//       .catch((err) => console.log(err))
//   }

//   const showError = () => {
//     if (error) {
//       alert(error)
//       setError('')
//     }
//   }

//   const showSuccess = () => {
//     if (success) {
//       alert('Password reset link has been sent to your email.')
//     }
//   }

//   return (
//     <>
//       <Header />
//       <div className="w-11/12 m-auto my-7" style={{ height: '40vh' }}>
//         <div className="my-5 pt-12">
//           <form className="shadow-md p-3 w-4/5 m-auto">
//             {showError()}
//             {showSuccess()}
//             <h1 className="text-center text-2xl font-semibold ">
//               Forget Password
//             </h1>
//             <div className="mt-5 flex gap-2 flex-wrap items-center">
//               <label htmlFor="email" className="text-xl">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="border-2 rounded-md border-black py-1 w-full xl:w-11/12 px-2"
//                 placeholder="Enter email..."
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mt-5 ">
//               <button
//                 className="mt-2 px-4 py-2 text-sm rounded-sm shadow-md"
//                 style={{ backgroundColor: '#d6ddd6' }}
//                 onClick={handleSubmit}
//               >
//                 Send Email
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ForgetPassword

import { useState } from 'react'
// import { forgetpassword } from '../api/userApi'
import Header from '../component/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  // const [error, setError] = useState('')
  // const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:5002/forgot-password',
        {
          email,
        }
      )
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred')
    }

    // Calling the API to send password reset email
    // forgetpassword({ email })
    //   .then((data) => {
    //     if (data.error) {
    //       setError(data.error)
    //       setSuccess(false)
    //     } else {
    //       setError('')
    //       setSuccess(true)
    //       setEmail('')
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //     setError('Something went wrong. Please try again later.')
    //     setSuccess(false)
    //   })
  }

  // const showError = () => {
  //   if (error) {
  //     alert(error) // Temporary way to show the error
  //     setError('')
  //   }
  // }

  // const showSuccess = () => {
  //   if (success) {
  //     alert('Password reset link has been sent to your email.')
  //   }
  // }

  return (
    <>
      <Header />
      <div className="w-11/12 m-auto my-7" style={{ height: '40vh' }}>
        <div className="my-5 pt-12">
          <form className="shadow-md p-3 w-4/5 m-auto" onSubmit={handleSubmit}>
            {/* {showError()}
            {showSuccess()} */}
            <h1 className="text-center text-2xl font-semibold">
              Forget Password
            </h1>
            {message && (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                {message}
              </div>
            )}
            <div className="mt-5 flex gap-2 flex-wrap items-center">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 rounded-md border-black py-1 w-full xl:w-11/12 px-2"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <button
                className="mt-2 px-4 py-2 text-sm rounded-sm shadow-md"
                style={{ backgroundColor: '#d6ddd6' }}
                type="submit"
              >
                Send Email
              </button>
            </div>
            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
