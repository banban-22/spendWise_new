import React from 'react';
import { ImCross } from 'react-icons/im';
import { BiError } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export const Error = ({ errors, handleClick }) => {
  console.log(errors);
  return (
    <div className="error border px-4 py-3 rounded relative mb-5 flex items-center">
      <BiError className="text-2xl" />
      <span className="block sm:inline">{errors}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-6 alert-icon text-sm"
        onClick={handleClick}
      >
        <ImCross />
      </span>
    </div>
  );
};

export const Alert = ({ alert, handleClick }) => {
  console.log(alert);
  return (
    <div className="alert border px-4 py-3 rounded relative mb-5 flex items-center">
      <AiOutlineCheckCircle className="text-2xl" />
      <span className="block sm:inline">{alert}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-6 alert-icon"
        onClick={handleClick}
      >
        <ImCross />
      </span>
    </div>
  );
};
