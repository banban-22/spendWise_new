import React, { useEffect, useState } from 'react';
import { Session } from '../requests';
import { useStateContext } from '../contexts/ContextProvider';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ currentUser, onSignOut }) => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const handleSignOut = async () => {
    await Session.destroy().then(() => {
      onSignOut();
    });
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

      {currentUser && (
        <span className="text-4xl">Welcome {currentUser.first_name}</span>
      )}
      <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
        <p>
          <span className="text-14 font-bold">{currentUser.first_name}</span>
        </p>
        <MdKeyboardArrowDown className="text-gray-400 text-14" />
      </div>
    </div>
  );
};

export default Navbar;
