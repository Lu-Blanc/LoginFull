import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = async()=>{
    try {
      const response = await axios.delete('http://localhost:5000/login/logout');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav class="bg-gray-800 p-2 mt-0 w-full">
      <div class="container mx-auto flex flex-wrap items-center">
        <div class="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
          <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
            <span class="text-2xl pl-2">Dashboard</span>
          </a>
        </div>
        <div class="flex w-full md:w-1/2 justify-center md:justify-end text-white font-extrabold">
          <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li class="mr-3">
              <a class="inline-block py-2 px-4 text-white no-underline" href="#">Home</a>
            </li>
            <li class="mr-3">
              <button onClick={Logout} class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4">Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    )
};

export default Navbar