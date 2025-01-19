import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying')
  const { token } = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002verify-email/${token}`
        )
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center">Email Verification</h2>

          {status === 'verifying' && (
            <div className="text-center">
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                Your email has been verified successfully!
              </div>
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Proceed to Login
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                Verification failed. The link may be invalid or expired.
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-800"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
