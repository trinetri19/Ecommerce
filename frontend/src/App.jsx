import react, { useState } from 'react'
import Navbar from './Navbar/navbar'
import Footer from './footer/Footer'
import './App.css'
import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from "./Components/products/createProduct/Create"
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import ProductDetails from './Components/products/getAllProducts/ProductDetails'


const App = () => {
  return (
    <>
      <Navbar></Navbar>
     
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path="/createProduct" element={<Create></Create>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/product/details/:id" element={<ProductDetails></ProductDetails>}></Route>
        </Routes>
      <Footer></Footer>
    </>
  )
}
export default App;

