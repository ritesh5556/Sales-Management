import React from 'react';
import SeedDataButton from './SeedData';

const Navbar = () => {
  return (
    <nav className="bg-transparent text-black border-b border-black fixed top-0 left-0 w-full p-2 shadow-lg z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Roxilar</h1>
        <div className='flex justify-center items-center'>
        <ul className="flex space-x-8 text-lg">
          <li>
            <a
              href="#pieChart"
              className="hover:text-black hover:opacity-50 transition duration-300"
            >
              Pie Chart
            </a>
          </li>
          <li>
            <a
              href="#barChart"
              className="hover:text-black hover:opacity-50 transition duration-300"
            >
              Bar Chart
            </a>
          </li>
          <li>
            <a
              href="#trasactions"
              className="hover:text-black hover:opacity-50 transition duration-300"
            >
              Transactions
            </a>
          </li>
          <li>
            <a
              href="#statistics"
              className="hover:text-black hover:opacity-50 transition duration-300"
            >
              Statistics
            </a>
          </li>
        </ul>
          <SeedDataButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
