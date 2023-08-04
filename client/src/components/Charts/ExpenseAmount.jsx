import React, { useEffect, useState } from 'react';
import Box from '../Box';
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
    });
    return totalAmounts;
  };

  const totalAmounts = calculateTotalAmounts();

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

  return (
    <div className="flex justify-center flex-wrap">
      {Object.entries(totalAmounts).map(([categoryName, amount]) => (
        <div
          key={categoryName}
          className="bg-white shadow overflow-hidden rounded-lg p-5 w-52 mx-3 mb-3"
        >
          <div className="w-5 h-5">{categoryIcons[categoryName]}</div>
          <h2>{categoryName}</h2>
          <p>{transactionData.length > 0 ? transactionData[0].currency : ''}</p>
          <p>{amount.toLocaleString('en-US')}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseAmount;
