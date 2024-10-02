import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Shelter from './pages/Shelter'
import Layout from './component/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Adopt from './pages/Adopt'
import PetDesc from './pages/PetDesc'
import Login from './pages/Login'
import Register from './pages/Register'


const MyRoutes = () => {
  return (
    <BrowserRouter>
         <Routes>
             <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                {/* <Route path='/shelter' element={<Shelter/>} /> */}
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/adopt' element={<Adopt/>}/>
                <Route path='/petdesc' element={<PetDesc/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Route>
            
         </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes