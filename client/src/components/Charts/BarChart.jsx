import React, { useEffect, useState } from 'react';
import { Transaction, User } from '../../requests';
import ApexCharts from 'react-apexcharts';

const BarChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [errors, setErrors] = useState([]);
  const currency =
    transactionData.length > 0 ? transactionData[0].currency : '';

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getCurrentUser();
    fetchTransactions();
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

  useEffect(() => {
    Transaction.index()
      .then((data) => {
        setTransactionData(data);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  const calculateTotalExpenseByMonth = (transactions) => {
    const totalExpense = {};

    transactions.forEach((transaction) => {
      if (transaction.transaction_type === 'expenditure') {
        const [year, month] = transaction.date.split('-');
        const monthYear = `${month}/${year}`;

        const amount = Number(transaction.amount);

        if (!totalExpense[monthYear]) {
          totalExpense[monthYear] = amount;
        } else {
          totalExpense[monthYear] += amount;
        }
      }
    });

    // Convert the totalExpense object into an array of objects with x and y properties
    const totalExpenseArray = Object.keys(totalExpense).map((key) => ({
      x: key,
      y: totalExpense[key],
    }));

    return totalExpenseArray;
  };

  const totalExpenseData = calculateTotalExpenseByMonth(transactionData);

  const options = {
    chart: {
      id: 'bar-chart',
      type: 'bar',
      defaultLocale: 'en',
    },
    xaxis: {
      type: 'month',
      labels: {
        rotate: -45,
      },
      title: {
        text: 'Month/Year',
      },
    },
    yaxis: {
      title: {
        text: `Total Expense (${currency})`,
      },
    },
    annotations: {},
    noData: {
      text: 'No expense data available.',
      align: 'center',
      verticalAlign: 'middle',
    },
    bar: {
      columnWidth: '100%',
      barHeight: '100%',
      colors: {
        ranges: [
          {
            from: -5000,
            to: 0,
            color: '#F15B46',
          },
        ],
      },
    },
  };

  const series = [
    {
      name: 'Expense',
      data: totalExpenseData,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-1 shadow">
      <ApexCharts options={options} series={series} type="bar" height={450} />
    </div>
  );
};

export default BarChart;
