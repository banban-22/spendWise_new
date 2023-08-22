import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PageNotFound from '../img/page_not_found.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col">
          <div className="text-center text-[10rem] font-extrabold">404</div>
          <p className="text-center text-5xl">Page Not Found</p>
          <Button
            bgColor="orange"
            hoverBgColor="amber-200"
            customMargin={5}
            customWidth={'full'}
            onClick={handleHome}
            roundedSm={true}
            btnPadding={8}
          >
            Back To Home
          </Button>
        </div>
        <div className="">
          <img src={PageNotFound} alt="" />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
