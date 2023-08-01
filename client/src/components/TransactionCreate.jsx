import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../requests';

import Input from './Input';
import InputDropDown from './InputDropDown';
import Button from './Button';

const TransactionCreate = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
      case 'category':
        setCategoryId(value);
        break;
      default:
        break;
    }
  }, []);

  const handleAddTransaction = useCallback(async () => {
    try {
      console.log('Submitting transaction...');
      const newTransaction = await Transaction.create({
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
      console.log('Transaction created:', newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      // Reset the form fields
      setAmount('');
      setDate('');
      setDescription('');
      setCurrency('');
      setCategoryId('');
    }
  }, [amount, date, description, currency, category_id, navigate]);

  console.log('Categories:', categories);

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
      <InputDropDown
        placeholder="Select a category"
        name="category"
        value={category_id}
        options={categories}
        onChange={handleInputChange}
      />
      <Button
        bgColor="orange"
        hoverBgColor="amber-200"
        onClick={handleAddTransaction}
        roundedSm={true}
        btnPadding={8}
        marginLeft={4}
      >
        Add Transaction
      </Button>
    </div>
  );
};

export default TransactionCreate;