import React, { useEffect, useState } from 'react';
import InputDropDown from './InputDropDown';

const BaseCurrency = ({ baseCurrency, onBaseCurrencyChange }) => {
  const [baseCurrencyOptions, setBaseCurrencyOptions] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'baseCurrency':
        setSelectedBaseCurrency(value);
        localStorage.setItem('baseCurrency', value);
        onBaseCurrencyChange(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
      .then((response) => response.json())
      .then((data) => {
        const formattedCurrencies = data.supported_codes.map(
          ([code, name]) => ({
            value: code,
            label: `${code} - ${name}`,
          })
        );

        setBaseCurrencyOptions(formattedCurrencies);

        const savedCurrency = localStorage.getItem('baseCurrency');
        if (savedCurrency) {
          setSelectedBaseCurrency(savedCurrency);
          onBaseCurrencyChange(savedCurrency);
        }
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
      });
  }, [onBaseCurrencyChange]);

  return (
    <div className="p-2 rounded-lg">
      <InputDropDown
        placeholder="Base Currency"
        name="baseCurrency"
        value={selectedBaseCurrency}
        options={baseCurrencyOptions}
        onChange={handleInputChange}
        className="rounded-lg"
      />
    </div>
  );
};

export default BaseCurrency;
