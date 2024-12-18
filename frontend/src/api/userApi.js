import { API } from '../config'

// REGISTER
export const register = (user) => {
  return fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error during registration:', error)
      throw new Error('An error occurred while registering')
    })
}

// LOGIN
export const login = (user) => {
  console.log(API)
  return fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// TO KEEP LOGGED IN
export const authenticate = (data) => {
  localStorage.setItem('jwt', JSON.stringify(data))
}

// to check if logged in
export const isAuthenticate = () => {
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
