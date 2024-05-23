import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home  from './Pages/Home';
import Auth from './Pages/Auth';
import CreateRecipe from './Pages/CreateRecipe';
import SavedRecipe from './Pages/SavedRecipe';
import Navbar from './Components/Navbar';
import Login from './Components/Login';

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipe" element={<SavedRecipe />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
