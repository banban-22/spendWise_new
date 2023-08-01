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
        className={`border-color border-2 p-2 rounded ${widthClass}`}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropDown;
