import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Session } from '../requests';
import Input from './Input';
import Button from './Button';
import { SiMoneygram } from 'react-icons/si';

const SignIn = ({
  onSignIn,
  formBorderColor,
  formWidth,
  roundedSm,
  btnPadding,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const request = {
      email,
      password,
    };

    try {
      const response = await Session.create(request);
      if (response.status === 401) {
        setErrors([{ message: response.message }]);
      } else if (response?.id) {
        onSignIn();
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors([{ message: error.message }]);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="text-3xl flex pt-6 pl-8 font-extrabold">
        <SiMoneygram className="mr-3 text-orange" /> SpendWise
      </div>
      <div className="flex flex-col justify-items-center items-center h-screen justify-center">
        <p className="text-2xl font-bold text-center">Welcome back</p>

        <div className="w-2/6 flex flex-col justify-items-center">
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

          <Button
            bgColor="orange"
            hoverBgColor="amber-200"
            customMargin={5}
            customWidth={'full'}
            onClick={handleSignIn}
            roundedSm={true}
            btnPadding={8}
          >
            Log In
          </Button>

          <Link to="/signup" className="underline mt-5 cursor-pointer">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
