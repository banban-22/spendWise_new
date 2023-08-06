import React from 'react';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import ExpenseAmount from '../components/Charts/ExpenseAmount';

const Dashboard = () => {
  return (
    <>
      <ExpenseAmount />
      <div className="grid grid-cols-2 gap-5 justify-around mx-5">
        <PieChart />
        <BarChart />
      </div>
    </>
  );
};

export default Dashboard;
