import React, { useEffect, useState } from 'react';
import TransactionCreate from '../components/TransactionCreate';
import TransactionGrid from '../components/TransactionGrid';
import { Transaction, Category, User } from '../requests';

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getCurrentUser();
    fetchTransactions();
    fetchCategories();
  }, []);

  const getCurrentUser = () => {
    User.current()
      .then((userData) => {
        if (userData?.id) {
          setUser(userData);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  };

  useEffect(() => {
    getCurrentUser();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = () => {
    if (user?.id) {
      Transaction.index()
        .then((data) => {
          const userTransactions = data.filter(
            (transaction) => transaction.user_id === user.id
          );
          setTransactionData(userTransactions);
        })
        .catch((err) => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const fetchCategories = () => {
    Category.index()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        setHasError(true);
      });
  };

  const updatedDataInDatabase = async (updatedData) => {
    try {
      const response = await Transaction.update(updatedData.id, updatedData);
      console.log('updatedData', response);
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDataInDatabase = async (deleteData) => {
    try {
      const response = await Transaction.destroy(deleteData.id);
      console.log('deleteData', response);
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="m-3">
      <div className="mb-10">
        <p className="text-3xl font-extrabold tracking-tight text-secondary">
          Transaction
        </p>
      </div>
      {/* TransactionCreateForm */}
      <TransactionCreate />
      {/* TransactionRecord */}
      <TransactionGrid
        transactionData={transactionData}
        categories={categories}
        updatedDataInDatabase={updatedDataInDatabase}
        deleteDataInDatabase={deleteDataInDatabase}
      />
    </div>
  );
};

export default TransactionPage;
