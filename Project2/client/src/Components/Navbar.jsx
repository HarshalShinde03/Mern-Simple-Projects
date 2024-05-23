import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Navbar = () => {
  const [cookies,setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate(); 

  const logout = () =>{
    setCookies("access_token",null);
    window.localStorage.removeItem("userID");
    navigate('/auth');
  }
  return (
    <div className='bg-black text-white flex gap-40 p-8 rounded-md '>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipes</Link>
        {!cookies.access_token ? (<Link to="/auth">Register</Link>) 
        : <button onClick={logout}>
            Logout
          </button>}
    </div>
  )
}

export default Navbar