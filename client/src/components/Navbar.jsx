import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineMenu } from 'react-icons/ai';
import { Session } from '../requests';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, onSignOut }) => {
  const { setActiveMenu, screenSize, setScreenSize } = useStateContext();
  const navigation = useNavigate();

  const handleClickSetting = () => {
    console.log('clicked');
    Session.destroy().then(() => {
      onSignOut();
    });
    navigation('/signin');
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

      <TooltipComponent content="Sign Out" position="BottomCenter">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={handleClickSetting}
        >
          <p>
            <span className="text-lg font-bold">
              Hi, {currentUser.first_name}
            </span>
          </p>
        </div>
      </TooltipComponent>
    </div>
  );
};

export default Navbar;
