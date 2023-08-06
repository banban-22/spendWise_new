import React, { useEffect, useState } from 'react';
import { Transaction } from '../../requests';
import ApexCharts from 'react-apexcharts';

const BarChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [errors, setErrors] = useState([]);

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
      const [year, month] = transaction.date.split('-');
      const monthYear = `${month}/${year}`;

      const amount =
        Number(transaction.amount) *
        (transaction.transaction_type === 'income' ? 1 : -1);

      if (!totalExpense[monthYear]) {
        totalExpense[monthYear] = amount;
      } else {
        totalExpense[monthYear] += amount;
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
    },
    xaxis: {
      type: 'category',
      labels: {
        rotate: -45,
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
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
