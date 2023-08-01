import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

import { AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ currentUser }) => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const handleClickSetting = () => {
    console.log('clicked');
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between p-2 relative md:mx-6">
      <button
        type="button"
        onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        className="relative text-2xl p-3 rounded-full hover:bg-slate-50"
      >
        <span className="absolute inline-flex rounded-full h-2 w-2 righ-2 top-2" />
        <AiOutlineMenu className="text-xl" />
      </button>

      {/* {currentUser && (
        <span className="text-4xl">Welcome {currentUser.first_name}</span>
      )} */}

      <div
        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        onClick={handleClickSetting}
      >
        <p>
          <span className="text-14 font-bold">
            {' '}
            Hi, {currentUser.first_name}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
