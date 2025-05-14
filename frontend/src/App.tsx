import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/button/button'
import { UserCart } from './components/cart/cart'
import { Dashboard } from './components/dashboard'
import { SendMoneyCart } from './components/cart/sendMoney'
import { Signup } from './components/authentication/singup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './components/authentication/signin'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
         <Route path="/signin" element={<SignIn/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/sendmoney/:id" element={<SendMoneyCart/>}></Route>
      </Routes>
    </BrowserRouter>
         
    </>
  )
}

export default App
