import React from 'react';
import PieChart from '../components/Charts/PieChart';
import ExpenseAmount from '../components/Charts/ExpenseAmount';

const Dashboard = () => {
  return (
    <>
      <ExpenseAmount />
      <PieChart />
    </>
  );
};

export default Dashboard;
