import React, { useEffect, useState } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from '@syncfusion/ej2-react-charts';
// import { useStateContext } from '../../contexts/ContextProvider';
import { Transaction, Category } from '../../requests';

const PieChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    Promise.all([Transaction.index(), Category.index()])
      .then(([transactionData, categoryData]) => {
        setTransactionData(transactionData);
        setCategoryData(categoryData);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  const categoryLookup = categoryData.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const groupedData = transactionData.reduce((acc, transaction) => {
    const { category_id, amount } = transaction;
    const categoryName = categoryLookup[category_id];

    if (categoryName !== undefined) {
      if (categoryName in acc) {
        acc[categoryName] += amount;
      } else {
        acc[categoryName] = amount;
      }
    }
    return acc;
  }, {});

  let pieChart;
  const pieChartData = Object.keys(groupedData).map((categoryName) => {
    return { x: categoryName, y: parseFloat(groupedData[categoryName]) };
  });

  return (
    <div className="bg-white rounded-lg p-1 shadow">
      <AccumulationChartComponent
        id="chart-pie"
        ref={(pie) => (pie = pieChart)}
        legendSettings={{ visible: true, background: 'white' }}
        enableSmartLabels={true}
        tooltip={{ enable: true }}
        height="auto"
        width="auto"
      >
        <Inject
          services={[
            AccumulationLegend,
            PieSeries,
            AccumulationTooltip,
            AccumulationDataLabel,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            name="Expenses"
            dataSource={pieChartData}
            explode={true}
            xName="x"
            yName="y"
            radius="60%"
            explodeOffset="10%"
            explodeIndex={0}
            pointColorMapping="fill"
            dataLabel={{
              visible: true,
              name: 'x',
              position: 'Outside',
              font: { color: '#000', fontWeight: '600' },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default PieChart;
