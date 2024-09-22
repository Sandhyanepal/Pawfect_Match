import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shelter from './pages/Shelter'
import Layout from './component/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'


const MyRoutes = () => {
  return (
    <BrowserRouter>
         <Routes>
             <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='/shelter' element={<Shelter/>} />
                <Route path='/contact' element={<Contact/>}/>
            </Route>
            
         </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes