import React, { useEffect, useState } from 'react';
import { Transaction, Category } from '../../requests';
import { GiHealthNormal } from 'react-icons/gi';
import {
  PiHouseLine,
  PiTrain,
  PiForkKnife,
  PiDotsThreeCircleLight,
} from 'react-icons/pi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { GrMoney } from 'react-icons/gr';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import { AiOutlineTool } from 'react-icons/ai';

const ExpenseAmount = ({ selectedCategory }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [categories, setCategories] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    Transaction.index()
      .then((data) => {
        setTransactionData(data);
      })
      .catch((err) => {
        setErrors(err);
      });

    Category.index()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  const calculateTotalAmounts = () => {
    const totalAmounts = {};
    let totalIncome = 0;
    let totalExpense = 0;

    transactionData.forEach((transaction) => {
      const categoryId = transaction.category_id;
      const currency = transaction.currency;
      const amount = parseFloat(transaction.amount);
      const category = categories.find((cat) => cat.id === categoryId);
      const categoryName = category ? category.name : 'Uncategorize';

      if (!totalAmounts[categoryName]) {
        totalAmounts[categoryName] =
          transaction.transaction_type === 'income' ? amount : -amount;
      } else {
        totalAmounts[categoryName] +=
          transaction.transaction_type === 'income' ? amount : -amount;
      }

      if (transaction.transaction_type === 'income') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
    });

    return { totalAmounts, totalIncome, totalExpense };
  };

  const { totalAmounts, totalIncome, totalExpense } = calculateTotalAmounts();

  const categoryIcons = {
    Housing: <PiHouseLine />,
    Transportation: <PiTrain />,
    Food: <PiForkKnife />,
    Utilities: <AiOutlineTool />,
    Insurance: <MdOutlinePrivacyTip />,
    'Medical & healthcare': <GiHealthNormal />,
    'Saving, investing, & debt payments': <GrMoney />,
    'Personal spending': <HiOutlineShoppingBag />,
    'Recreation & entertainment': <BiCameraMovie />,
    Miscellaneous: <PiDotsThreeCircleLight />,
  };
  console.log(transactionData);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="bg-white shadow overflow-hidden rounded-lg p-5 w-auto mx-3 mb-3 text-center">
          <p className="text-xl">Total Expense</p>
          <p className="text-3xl font-bold flex justify-center">
            <p className="mr-2">
              {transactionData.length > 0 ? transactionData[0].currency : ''}
            </p>
            {totalExpense.toLocaleString('en-US')}
          </p>
        </div>
        <div className="bg-white shadow overflow-hidden rounded-lg p-5 w-auto mx-3 mb-3 text-center">
          <p className="text-xl">Total Income</p>
          <p className="text-3xl font-bold flex justify-center">
            <p className="mr-2">
              {transactionData.length > 0 ? transactionData[0].currency : ''}
            </p>
            {totalIncome.toLocaleString('en-US')}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-center content-center items-center">
        {Object.entries(totalAmounts).map(([categoryName, amount]) => (
          <div
            key={categoryName}
            className="bg-white shadow overflow-hidden rounded-lg p-5 w-auto mx-3 mb-3"
          >
            <div className="flex justify-start items-center">
              <div className=" bg-primary rounded-full p-3 mr-3">
                {categoryIcons[categoryName]}
              </div>
              <h2>{categoryName}</h2>
            </div>

            {amount ? (
              <div className="flex justify-center items-center mt-3">
                <p>
                  {transactionData.length > 0
                    ? transactionData[0].currency
                    : ''}
                </p>
                <p
                  className="ml-2 text-2xl font-bold"
                  style={{ color: amount < 0 ? 'red' : 'green' }}
                >
                  {amount.toLocaleString('en-US')}
                </p>
              </div>
            ) : (
              <p>N/A</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseAmount;
