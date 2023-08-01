import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../requests';

import Input from './Input';
import Button from './Button';

const NewTransaction = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'currency':
        setCurrency(value);
        break;

      default:
        break;
    }
  }, []);

  const handleAddTransaction = async () => {
    console.log(amount, date, description, currency);
    addTransaction(amount, date, description, currency);

    setAmount('');
    setDate('');
    setDescription('');
    setCurrency('');
  };

  //   const handleAddTransaction = () => {
  //     const transactionData = {
  //       amount,
  //       date,
  //       description,
  //       currency,
  //     };
  //     Transaction.create(transactionData)
  //       .then((data) => {
  //         const newTransactionData = {
  //           ...data,
  //         };

  //         addTransaction(newTransactionData);

  //         setAmount('');
  //         setDate('');
  //         setDescription('');
  //         setCurrency('');
  //       })
  //       .catch((error) => console.error(error));
  //   };
  return (
    <div className="flex items-end justify-center">
      <Input
        type="number"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={handleInputChange}
      />
      <Input
        type="date"
        placeholder="Date"
        name="date"
        value={date}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Description"
        name="description"
        value={description}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Currency"
        name="currency"
        value={currency}
        onChange={handleInputChange}
      />
      <Button
        bgColor="orange"
        hoverBgColor="amber-200"
        onClick={handleAddTransaction}
        roundedSm={true}
        btnPadding={8}
        marginLeft={2}
      >
        Add Transaction
      </Button>
    </div>
  );
};

export default NewTransaction;
