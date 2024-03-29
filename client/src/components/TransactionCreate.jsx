import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../requests';

import Input from './Input';
import InputDropDown from './InputDropDown';
import Button from './Button';

const TransactionCreate = ({ baseCurrency, totalPriceFromOCR }) => {
  const [transaction_type, setTransactionType] = useState('');
  const [amount, setAmount] = useState('' || totalPriceFromOCR);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(baseCurrency);
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setCurrency(baseCurrency);
  }, [baseCurrency]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrors(JSON.parse(error.message));
      }
    };

    fetchCategories();
  }, []);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: `${category.id} - ${category.name}`,
  }));

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'transaction_type':
        setTransactionType(value);
        break;
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
      case 'category':
        setCategoryId(value);
        break;
      default:
        break;
    }
  }, []);

  const handleAddTransaction = useCallback(async () => {
    try {
      const newTransaction = await Transaction.create({
        transaction_type,
        amount: Number(amount),
        date,
        description,
        currency,
        category_id: Number(category_id),
      });

      if (newTransaction.errors) {
        throw new Error(newTransaction.errors);
      } else {
        navigate(`/transactions`, { replace: true });
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setErrors(JSON.parse(error.message));
    } finally {
      setTransactionType('');
      setAmount('');
      setDate('');
      setDescription('');
      setCurrency('');
      setCategoryId('');
    }
  }, [
    transaction_type,
    amount,
    date,
    description,
    currency,
    category_id,
    navigate,
  ]);

  return (
    <>
      {errors?.messages?.transaction_type && (
        <p className="error">Type {errors.messages.transaction_type[0]}</p>
      )}
      {errors?.messages?.amount && (
        <p className="error">Amount {errors.messages.amount.join(', ')}</p>
      )}
      {errors?.messages?.date && (
        <p className="error">Date {errors.messages.date.join(', ')}</p>
      )}
      {errors?.messages?.description && (
        <p className="error">
          Description {errors.messages.description.join(', ')}
        </p>
      )}
      {errors?.messages?.category && (
        <p className="error">Category {errors.messages.category.join(', ')}</p>
      )}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between">
        <InputDropDown
          placeholder="Type"
          name="transaction_type"
          value={transaction_type}
          options={[
            { value: 'expenditure', label: 'Expenditure' },
            { value: 'income', label: 'Income' },
          ]}
          onChange={handleInputChange}
        />

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
          value={currency || baseCurrency}
          onChange={handleInputChange}
        />
        <InputDropDown
          placeholder="Select a category"
          name="category"
          value={category_id}
          options={categoryOptions}
          onChange={handleInputChange}
        />
        <Button
          bgColor="orange"
          hoverBgColor="amber-200"
          onClick={handleAddTransaction}
          roundedSm={true}
          btnPadding={8}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default TransactionCreate;
