// import React, { useState, useEffect } from 'react';
// import Input from './Input';
// import InputDropDown from './InputDropDown';
// import Button from './Button';
// import { FiArrowRightCircle, FiArrowDownCircle } from 'react-icons/fi';
// import Loading from './Loading';

// const CurrencyConverter = () => {
//   const [currencyAmount, setCurrencyAmount] = useState('');
//   const [fromCurrency, setFromCurrency] = useState('CAD');
//   const [toCurrency, setToCurrency] = useState('USD');
//   const [currencies, setCurrencies] = useState([]);
//   const [exchangeRate, setExchangeRate] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const isMediumScreen = window.innerWidth <= 1024;

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     switch (name) {
//       case 'currencyAmount':
//         setCurrencyAmount(value);
//         break;
//       case 'fromCurrency':
//         setFromCurrency(value);
//         break;
//       case 'toCurrency':
//         setToCurrency(value);
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
//     fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedCurrencies = data.supported_codes.map(
//           ([code, name]) => ({
//             value: code,
//             label: `${code} - ${name}`,
//           })
//         );

//         setCurrencies(formattedCurrencies);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching currencies:', error);
//       });
//   }, []);

//   useEffect(() => {
//     const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
//     const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

//     fetch(BASE_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         setExchangeRate(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [fromCurrency, toCurrency]);

//   return (
//     <div className="flex flex-col content-center items-center">
//       {isLoading && <Loading isLoading={isLoading} />}
//       <p className="text-3xl font-extrabold tracking-tight text-secondary mt-20 md:mt-0">
//         Currency Converter
//       </p>
//       <div className="flex flex-col bg-white p-16 mx-10 rounded-xl shadow-lg mt-10">
//         <div className="flex flex-col lg:flex-row justify-around items-center mb-10 ">
//           <Input
//             type="number"
//             placeholder="Amount"
//             name="currencyAmount"
//             value={currencyAmount}
//             onChange={handleInputChange}
//             className="rounded-lg"
//           />
//           <InputDropDown
//             placeholder="From"
//             name="fromCurrency"
//             value={fromCurrency}
//             options={currencies}
//             onChange={handleInputChange}
//             className="rounded-lg"
//           />
//           {isMediumScreen ? (
//             <FiArrowDownCircle className="text-3xl mt-8" />
//           ) : (
//             <FiArrowRightCircle className="text-3xl mt-8" />
//           )}
//           <InputDropDown
//             placeholder="To"
//             name="toCurrency"
//             value={toCurrency}
//             options={currencies}
//             onChange={handleInputChange}
//             className="rounded-lg"
//           />
//         </div>
//       </div>
//       <div className="mt-10 flex flex-col align-center items-center bg-orange shadow-xl rounded-2xl py-10 w-3/4 lg:w-1/2">
//         <h2 className="text-2xl">
//           Exchange Rate:{' '}
//           <span className="text-3xl font-bold">{fromCurrency}</span> to{' '}
//           <span className="text-3xl font-bold">{toCurrency}</span>
//         </h2>

//         {exchangeRate.conversion_rate && (
//           <div>
//             <p className="text-lg">
//               Conversion Rate: {exchangeRate.conversion_rate}
//             </p>
//             <p className="text-xl">
//               Price:
//               <span className="text-3xl font-bold ml-3">
//                 {(exchangeRate.conversion_rate * currencyAmount).toFixed(2)}{' '}
//                 {toCurrency}
//               </span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;

import React, { useState, useEffect } from 'react';
import Input from './Input';
import InputDropDown from './InputDropDown';
import Button from './Button';
import { FiArrowRightCircle, FiArrowDownCircle } from 'react-icons/fi';
import Loading from './Loading';

const CurrencyConverter = () => {
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('CAD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [manualExchangeRate, setManualExchangeRate] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [apiNotWorking, setApiNotWorking] = useState(false);
  const isMediumScreen = window.innerWidth <= 1024;

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

  const handleManualConversion = () => {
    if (manualExchangeRate && currencyAmount) {
      const convertedAmount = (manualExchangeRate * currencyAmount).toFixed(2);
      setExchangeRate({ conversion_rate: manualExchangeRate });
      setManualMode(false);
      setIsLoading(false);
      setCurrencyAmount(currencyAmount);
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

        setCurrencies(formattedCurrencies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching currencies:', error);
        setApiNotWorking(true);
        setManualMode(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!manualMode && !apiNotWorking) {
      const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY;
      const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

      fetch(BASE_URL)
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setManualMode(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fromCurrency, toCurrency, manualMode, apiNotWorking]);

  return (
    <div className="flex flex-col content-center items-center">
      {isLoading && <Loading isLoading={isLoading} />}
      <p className="text-3xl font-extrabold tracking-tight text-secondary mt-20 md:mt-0">
        Currency Converter
      </p>
      <div className="flex flex-col bg-white p-16 mx-10 rounded-xl shadow-lg mt-10">
        <div className="flex flex-col lg:flex-row justify-around items-center mb-10 ">
          <Input
            type="number"
            placeholder="Amount"
            name="currencyAmount"
            value={currencyAmount}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          {apiNotWorking || manualMode ? (
            <Input
              type="text"
              placeholder="From"
              name="fromCurrency"
              value={fromCurrency}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          ) : (
            <InputDropDown
              placeholder="From"
              name="fromCurrency"
              value={fromCurrency}
              options={currencies}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          )}
          {isMediumScreen ? (
            <FiArrowDownCircle className="text-3xl mt-8" />
          ) : (
            <FiArrowRightCircle className="text-3xl mt-8" />
          )}
          {apiNotWorking || manualMode ? (
            <Input
              type="text"
              placeholder="To"
              name="toCurrency"
              value={toCurrency}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          ) : (
            <InputDropDown
              placeholder="To"
              name="toCurrency"
              value={toCurrency}
              options={currencies}
              onChange={handleInputChange}
              className="rounded-lg"
            />
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-col align-center items-center bg-orange shadow-xl rounded-2xl py-10 w-3/4 lg:w-1/2">
        <h2 className="text-2xl">
          Exchange Rate:{' '}
          <span className="text-3xl font-bold">{fromCurrency}</span> to{' '}
          <span className="text-3xl font-bold">{toCurrency}</span>
        </h2>

        {!manualMode && exchangeRate.conversion_rate && (
          <div>
            <p className="text-lg">
              Conversion Rate: {exchangeRate.conversion_rate}
            </p>
            <p className="text-xl">
              Price:
              <span className="text-3xl font-bold ml-3">
                {(exchangeRate.conversion_rate * currencyAmount).toFixed(2)}{' '}
                {toCurrency}
              </span>
            </p>
            <Button onClick={() => setManualMode(true)} className="mt-2">
              Use Manual Rate
            </Button>
          </div>
        )}

        {manualMode && (
          <div className="flex flex-row">
            <Input
              type="number"
              placeholder="Manual Exchange Rate"
              value={manualExchangeRate}
              onChange={(e) => setManualExchangeRate(e.target.value)}
              className="rounded-lg"
            />
            <button
              onClick={handleManualConversion}
              className="manual-input mt-8 ml-3 bg-white px-3 rounded-lg shadow-md border-black"
            >
              Convert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
