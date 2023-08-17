import React, { useEffect, useState } from 'react';
import BaseCurrency from '../components/BaseCurrency';
import TransactionCreate from '../components/TransactionCreate';
import TransactionGrid from '../components/TransactionGrid';
import { Transaction, Category, User } from '../requests';
import Loading from '../components/Loading';
import { ImCross } from 'react-icons/im';

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState(null);

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
      setAlert(response.message);
    } catch (error) {
      console.error(error);
      setErrors('Failed to update transaction');
    }
  };

  const deleteDataInDatabase = async (deleteData) => {
    try {
      const response = await Transaction.destroy(deleteData.id);
      console.log('deleteData', response);
      fetchTransactions();
      setAlert(response.message);
    } catch (error) {
      console.error(error);
      setErrors('Failed to delete transaction');
    }
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
  };

  const handleClick = () => {
    setAlert(null);
    setErrors(null);
  };

  return (
    <div className="p-3">
      {alert && (
        <div className="alert border px-4 py-3 rounded relative mb-5 flex items-center">
          <span className="block sm:inline">{alert}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-4"
            onClick={handleClick}
          >
            <ImCross />
          </span>
        </div>
      )}

      {errors && (
        <div className="error border px-4 py-3 rounded relative mb-5 flex items-center">
          <span className="block sm:inline">{errors}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-4"
            onClick={handleClick}
          >
            <ImCross />
          </span>
        </div>
      )}
      <div className="sm:mt-10 md:mt-0 md:mb-4">
        <p className="text-3xl font-extrabold tracking-tight text-secondary mt-10 md:mt-0">
          Transaction
        </p>
      </div>
      <BaseCurrency
        baseCurrency={baseCurrency}
        onBaseCurrencyChange={handleBaseCurrencyChange}
      />
      {/* TransactionCreateForm */}
      <TransactionCreate baseCurrency={baseCurrency} />
      {/* TransactionRecord */}
      <TransactionGrid
        transactionData={transactionData}
        setTransactionData={setTransactionData}
        categories={categories}
        updatedDataInDatabase={updatedDataInDatabase}
        deleteDataInDatabase={deleteDataInDatabase}
        baseCurrency={baseCurrency}
      />
    </div>
  );
};

export default TransactionPage;
