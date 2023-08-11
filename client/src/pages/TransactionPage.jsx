import React, { useEffect, useState } from 'react';
import BaseCurrency from '../components/BaseCurrency';
import TransactionCreate from '../components/TransactionCreate';
import TransactionGrid from '../components/TransactionGrid';
import { Transaction, Category, User } from '../requests';
import Loading from '../components/Loading';

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
    return <Loading isLoading={isLoading} />;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-3">
      <div className="sm:mt-10 md:mt-0 md:mb-4">
        <p className="text-3xl font-extrabold tracking-tight text-secondary mt-10 md:mt-0">
          Transaction
        </p>
      </div>
      <BaseCurrency />
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
