import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Merge from './components/Merge'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/merge" element={<Merge />} /> */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App