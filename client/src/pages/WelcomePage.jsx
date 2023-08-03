import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcome from '../img/pic1.svg';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const WelcomePage = ({
  bgColor,
  hoverBgColor,
  customMargin,
  customWidth,
  onClick,
  rounded,
  btnPadding,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex justify-around bg-secondary h-full w-full py-20 background-pattern ">
          <div className="flex flex-col w-1/2 place-items-center">
            <p className="text-white text-8xl mt-10 px-10 w-full text-center font-bold">
              Empowering Your Financial Future with SpendWise
            </p>
            <Button
              bgColor="orange"
              hoverBgColor="amber-200"
              customMargin={10}
              customWidth={'1/2'}
              btnPadding={10}
              rounded
              onClick={handleClick}
            >
              Sign Up
            </Button>

            <div className="flex flex-col text-center">
              <p className="mt-5 text-white">Already have an account? </p>
              <Link
                to="/signin"
                className="underline mt-1 cursor-pointer text-white"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div>
            <img
              src={welcome}
              alt="finance"
              className="mr-10 h-full w-full flex-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
