import React from 'react';
import PageNotFound from '../img/page_not_found.svg';

const NotFoundPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col">
          <div className="text-center text-[10rem] font-extrabold">404</div>
          <p className="text-center text-5xl">Page Not Found</p>
        </div>
        <div className="">
          <img src={PageNotFound} alt="" />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
