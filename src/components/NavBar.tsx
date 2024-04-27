import Image from 'next/image';
import React from 'react';
import logo from '../../public/Logo.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-xl">
      <div className="mx-2 md:mx-12 flex items-center space-x-2">
      <Image className='mr-2 md:mr-5' src={logo} width={60} height={60} alt='Learno+'/> 
        <span className="text-2xl sm:text-3xl font-bold text-primary">LEARNO+</span>
      </div>
      <div className='mx-2 md:mx-10 flex space-x-4'>
      <button className="bg-primary-light transition-all duration-300 transform hover:scale-105 text-white md:ml-4 xl:ml-6 text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-8 h-12 ">
          Login
        </button>
        <button className="bg-primary-light transition-all duration-300 transform hover:scale-105 text-white md:ml-4 xl:ml-6 text-sm lg:text-base font-bold whitespace-nowrap rounded-3xl px-4 lg:px-8 h-12">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
