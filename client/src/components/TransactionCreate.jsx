import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../requests';
import Input from './Input';
import Button from './Button';

const TransactionCreate = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'amount':
        setAmount(Number(value));
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
  };

  const addTransaction = async (amount, date, description, currency) => {
    try {
      const newTransaction = await Transaction.create({
        amount,
        date,
        description,
        currency,
      });

      if (newTransaction.errors) {
        throw new Error(newTransaction.errors);
      } else {
        const newTransactionId = newTransaction.id;
        navigate(`/transactions/${newTransactionId}`);
      }
      console.log(newTransaction);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    console.log(amount, date, description, currency);
    addTransaction(amount, date, description, currency);

    setAmount('');
    setDate('');
    setDescription('');
    setCurrency('');
  };

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
        onClick={handleClick}
        roundedSm={true}
        btnPadding={8}
        marginLeft={2}
      >
        Add Transaction
      </Button>
    </div>
  );
};

export default TransactionCreate;
