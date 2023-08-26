import React from 'react';

const Input = (props) => {
  const {
    id,
    label,
    type,
    value,
    name,
    onChange,
    placeholder,
    inputAttributes,
    min,
    max,
    formBorderColor,
    formWidth,
    className,
  } = props;

  const borderColorClass = formBorderColor
    ? `border-${formBorderColor}`
    : 'border-gray-400';
  const widthClass = formWidth ? `w-${formWidth}` : 'w-full';

  return (
    <div className="mt-2 flex flex-col">
      <label htmlFor={id} className="font-semibold">
        {placeholder}
      </label>
      <input
        type={type || 'text'}
        className={`border-color border-2 p-2 rounded ${widthClass} ${className}`}
        value={value}
        id={id}
        name={name || id}
        onChange={onChange}
        placeholder={placeholder || label}
        min={min}
        max={max}
        {...inputAttributes}
      />
    </div>
  );
};

export default Input;
