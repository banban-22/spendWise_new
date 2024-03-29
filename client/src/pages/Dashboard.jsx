import React from 'react';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import ExpenseAmount from '../components/Charts/ExpenseAmount';

const Dashboard = ({ isLoading }) => {
  return (
    <>
      <ExpenseAmount isLoading={isLoading} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-around mx-5">
        <PieChart />
        <BarChart />
      </div>
    </>
  );
};

export default Dashboard;
