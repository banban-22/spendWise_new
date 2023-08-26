import React from 'react';
import loader from '../img/loading.gif';

const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="flex justify-center align-center h-auto w-auto">
        <img src={loader} alt="Loading..." />
      </div>
    )
  );
};

export default Loading;
