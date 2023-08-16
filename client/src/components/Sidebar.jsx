import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Session } from '../requests';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoneyWithdraw, BiReceipt } from 'react-icons/bi';
import { MdCurrencyExchange } from 'react-icons/md';
import { SiMoneygram } from 'react-icons/si';
import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';

const Sidebar = ({ currentUser, onSignOut }) => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { pathname } = useLocation();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 768) setActiveMenu(false);
  };

  const handleSignOut = async () => {
    await Session.destroy().then(() => {
      onSignOut();
    });
  };

  const isActiveLink = (path) => {
    return pathname === path ? 'bg-orange text-white' : '';
  };

  const activeLink =
    'flex items-center gap-3 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md m-2 hover:bg-sky-700';
  const normalLink =
    'flex items-center gap-3 pl-4 pt-3 pb-2.5 rounded-lg text-gray-500 text-md m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-black text-xl font-extrabold tracking-tight "
            >
              <SiMoneygram className="text-orange" />
              <span>SpendWise</span>
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
          <div className="mt-10">
            <NavLink
              to="/dashboard"
              onClick={handleCloseSidebar}
              className={`${isActiveLink('/dashboard')} ${normalLink}`}
            >
              <AiOutlineHome />
              <span className="capitalize">home</span>
            </NavLink>
          </div>
          <div className="mt-1">
            <NavLink
              to="/transactions"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'bg-secondary' : '',
              })}
              className={`${isActiveLink('/transactions')} ${normalLink}`}
            >
              <BiMoneyWithdraw />
              <span className="capitalize">transaction</span>
            </NavLink>
          </div>
          <div className="mt-1">
            <NavLink
              to="/receipts"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'bg-secondary' : '',
              })}
              className={`${isActiveLink('/receipts')} ${normalLink}`}
            >
              <BiReceipt />
              <span className="capitalize">receipt</span>
            </NavLink>
          </div>
          <div className="mt-1">
            <NavLink
              to="/currency_rates"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'bg-secondary' : '',
              })}
              className={`${isActiveLink('/currency_rates')} ${normalLink}`}
            >
              <MdCurrencyExchange />
              <span className="capitalize">currency rate</span>
            </NavLink>
          </div>
          {currentUser && (
            <div className="mt-1">
              <NavLink
                to="/signin"
                onClick={handleSignOut}
                className="flex items-center gap-3 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md m-2 signout"
              >
                <PiSignOut /> <span>SignOut</span>
              </NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
