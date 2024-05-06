import React from 'react';
import Card from './Card';

const Homepage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-16 mx-16 2xl:mx-36">
        <h1 className="text-primary font-bold text-2xl mb-4 lg:mb-0 lg:mr-4 whitespace-nowrap">Your Class</h1>
        <div className="w-full md:w-96">
          <select className="border border-primary rounded-lg w-full h-12 px-2 select-none">
            <option value="1">2024/2</option>
            <option value="2">2024/1</option>
            <option value="3">2023/2</option>
            <option value="4">2023/1</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:mt-6 mt-12 gap-2 md:gap-5 xl:gap-8 mx-16 2xl:mx-36'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Homepage;
