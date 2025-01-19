import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // To access the token in the URL

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  // const [error, setError] = useState('')
  // const [success, setSuccess] = useState(false)

  useEffect(() => {
    // You can verify the token or fetch related data here if needed
    console.log('Token:', token)
  }, [token])

  // const handleResetPassword = (e) => {
  //   e.preventDefault()
  //   // Call your API to reset the password here
  //   fetch(`http://localhost:5002/resetpassword/${token}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ newPassword: newPassword }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         setError(data.error)
  //         setSuccess(false)
  //       } else {
  //         setError('')
  //         setSuccess(true)
  //       }
  //     })
  //     .catch((err) => {
  //       setError('Something went wrong. Please try again later.')
  //       setSuccess(false)
  //     })
  // }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:5002/reset-password/${token}`,
        {
          password,
        }
      )
      setMessage(response.data.message)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {/* {error && <div className="error">{error}</div>} */}
      {/* {success && (
        <div className="success">
          Your password has been reset successfully.
        </div>
      )} */}
      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          {message}
        </div>
      )}
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
