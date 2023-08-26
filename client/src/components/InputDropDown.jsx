import React from 'react';

const InputDropDown = (props) => {
  const {
    id,
    label,
    type,
    inputAttributes,
    min,
    max,
    value,
    name,
    onChange,
    placeholder,
    formBorderColor,
    formWidth,
    options,
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

      <select
        name={name || id}
        id={id}
        className={`border-color border-2 p-2 rounded ${widthClass} ${className}`}
        onChange={onChange}
        value={value}
      >
        <option value="">--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropDown;
