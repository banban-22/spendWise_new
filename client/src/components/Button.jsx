import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  bgColor,
  hoverBgColor,
  customMargin,
  customWidth,
  onClick,
  rounded,
  roundedSm,
  btnPadding,
  marginLeft,
}) => {
  const buttonClass = classNames(
    `bg-${bgColor}`,
    `p-${btnPadding || 4}`,
    'text-center',
    `mt-${customMargin}`,
    `w-${customWidth}`,
    `ml-${marginLeft}`,
    'font-semibold',
    { 'shadow-xl': rounded, 'rounded-full': rounded },
    { rounded: roundedSm },
    { [`hover:bg-${hoverBgColor}`]: hoverBgColor }
  );

  return (
    <button
      type="subtmit"
      className={buttonClass}
      style={{ backgroundColor: bgColor, padding: btnPadding }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
