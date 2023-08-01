import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import { SiMoneygram } from 'react-icons/si';

const SignUp = ({ formBorderColor, formWidth, roundedSm, btnPadding }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = (event) => {
    navigate('/dashboard');
  };

  const { first_name, last_name, email, password, password_confirmation } =
    user;

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="text-3xl flex pt-6 pl-8 font-extrabold">
        <SiMoneygram className="mr-3 text-orange" /> SpendWise
      </div>
      <div className="flex flex-col justify-items-center items-center h-screen justify-center">
        <p className="text-2xl font-bold text-center">Get started here</p>

        <div className="w-2/6 flex flex-col justify-items-center">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              name="first_name"
              id="first_name"
              value={first_name}
              onChange={handleChange}
            />
            <Input
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              value={last_name}
              onChange={handleChange}
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="grid gird-cols-1"
            formWidth="full"
            formBorderColor="gray-300"
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            id="password_confirmation"
            value={password_confirmation}
            onChange={handleChange}
          />

          <Button
            bgColor="orange"
            hoverBgColor="amber-200"
            customMargin={5}
            customWidth={'full'}
            onClick={handleClick}
            roundedSm={true}
            btnPadding={8}
          >
            Sign Up
          </Button>
        </div>
        <Link to="/signin" className="underline mt-5 cursor-pointer">
          already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
