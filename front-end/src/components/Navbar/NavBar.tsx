"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../../public/Logo.svg';
import Link from 'next/link';
import { FaUser } from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
import { axioslib } from '@/lib/axioslib';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('65090500447');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };
  
  const fetchUser = async () => {
    try {
      const response = await axioslib.get('/api/getuserbyid');
      setUserName(response.data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-xl">
      <div className="mx-0 md:mx-12 flex items-center space-x-2">
        <Link href="/">
          <Image className='md:mr-5' src={logo} width={60} height={60} alt='Learno+' />
        </Link>
        <Link href="/">
          <span className="text-xl md:text-2xl font-bold text-primary">LEARNO+</span>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className='ml-3 sm:ml-0 mx-2 md:mx-10 flex space-x-2 sm:space-x-4'>
          <div className='border-primary-light border-2 rounded-full pr-4 flex space-x-2'>
            <FaUser className="h-12 w-12 text-white bg-primary-light rounded-full p-3" />
            <span className="text-black font-bold mt-3">{userName}</span>
          </div>
          <button onClick={handleLogout} className="text-black flex items-center">
            <FiLogOut className="h-12 w-12 mr-2 text-white bg-primary-light rounded-full p-3 " />
          </button>
        </div>
      ) : (
        <div className='ml-3 sm:ml-0 mx-2 md:mx-10 flex space-x-2 sm:space-x-4'>
          <Link href='/login'>
            <button className="
              bg-primary-light transition-all duration-300 transform hover:scale-105 
              text-white ml-16 md:ml-4 xl:ml-6 text-sm lg:text-base font-bold 
              whitespace-nowrap rounded-3xl px-4 sm:px-8 h-12">
              Log in
            </button>
          </Link>
          <Link href='/signup'>
            <button className="
              bg-primary-light transition-all duration-300 transform hover:scale-105 
              text-white md:mr-4 xl:mr-6 text-sm lg:text-base font-bold 
              whitespace-nowrap rounded-3xl px-4 sm:px-8 h-12">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
