import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../requests';
import NewTransaction from './NewTransaction';

const TransactionCreate = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const addTransaction = async (amount, date, description, currency) => {
    try {
      const newTransaction = await Transaction.create({
        amount: Number(amount),
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

  return <NewTransaction addTransaction={addTransaction} />;
};

export default TransactionCreate;
