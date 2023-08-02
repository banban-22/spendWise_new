import React, { useState, useEffect } from 'react';
import Input from './Input';
import InputDropDown from './InputDropDown';
import Button from './Button';

const CurrencyConverter = () => {
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('CAD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'currencyAmount':
        setCurrencyAmount(value);
        break;
      case 'fromCurrency':
        setFromCurrency(value);
        break;
      case 'toCurrency':
        setToCurrency(value);
        break;
      default:
        break;
    }
  };

  const handleGetCurrencyRate = () => {
    console.log(currencyAmount, fromCurrency, toCurrency);
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

        setCurrencies(formattedCurrencies);
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExchangeRate(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      <div className="flex justify-around">
        <p>From:</p>
        <Input
          type="number"
          placeholder="Amount"
          name="currencyAmount"
          value={currencyAmount}
          onChange={handleInputChange}
        />
        <InputDropDown
          placeholder="Currency"
          name="fromCurrency"
          value={fromCurrency}
          options={currencies}
          onChange={handleInputChange}
        />

        <p>To:</p>
        <InputDropDown
          placeholder="Currency"
          name="toCurrency"
          value={toCurrency}
          options={currencies}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-5 flex flex-col align-center items-center">
        <h2 className="text-2xl">
          Exchange Rate for {fromCurrency} to {toCurrency}:
        </h2>
        {exchangeRate.conversion_rate && (
          <div>
            <p>Conversion Rate: {exchangeRate.conversion_rate}</p>
            <p>Result: {exchangeRate.conversion_rate * currencyAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
