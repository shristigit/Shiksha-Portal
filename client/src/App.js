import React from 'react'
import { Route ,Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import error from './components/error';
import Logout from './components/Logout';


export const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    
    <Route path="contact"  element={<Contact/>} />
    <Route path="/" element={<Home/>} />
    <Route path="About" element={<About/>} />
    <Route path="Login" element={<Login/>} />
    <Route path="Signup" element={<Signup/>} />
    <Route path="logout " element={<Logout/>} />
    
    <Route  element={<error/>} />
    </Routes>
    
    
    </>
  )
}

export default App 
