import React, { useState, useEffect } from 'react';
import Input from './Input';
import InputDropDown from './InputDropDown';
import Button from './Button';
import { FiArrowRightCircle } from 'react-icons/fi';

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
    <div className="flex flex-col content-center items-center">
      <div className="flex justify-around items-center bg-white p-20 mx-10 rounded-xl shadow-lg">
        <Input
          type="number"
          placeholder="Amount"
          name="currencyAmount"
          value={currencyAmount}
          onChange={handleInputChange}
          className="rounded-lg"
        />
        <InputDropDown
          placeholder="Currency"
          name="fromCurrency"
          value={fromCurrency}
          options={currencies}
          onChange={handleInputChange}
          className="rounded-lg"
        />
        <FiArrowRightCircle className="text-3xl mt-8" />
        <InputDropDown
          placeholder="Currency"
          name="toCurrency"
          value={toCurrency}
          options={currencies}
          onChange={handleInputChange}
          className="rounded-lg"
        />
      </div>

      <div className="mt-10 flex flex-col align-center items-center bg-orange shadow-xl rounded-2xl py-10 w-1/2">
        <h2 className="text-2xl">
          Exchange Rate:{' '}
          <span className="text-3xl font-bold">{fromCurrency}</span> to{' '}
          <span className="text-3xl font-bold">{toCurrency}</span>
        </h2>
        {exchangeRate.conversion_rate && (
          <div>
            <p className="text-lg">
              Conversion Rate: {exchangeRate.conversion_rate}
            </p>
            <p className="text-xl">
              Price:
              <span className="text-3xl font-bold ml-3">
                {exchangeRate.conversion_rate * currencyAmount} {toCurrency}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
