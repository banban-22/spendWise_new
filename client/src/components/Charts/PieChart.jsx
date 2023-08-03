import React, { useEffect, useState } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  Inject,
  AccumulationDataLabel,
  AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';
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

  const pieChartData = Object.keys(groupedData).map((categoryName) => {
    return { x: categoryName, y: parseFloat(groupedData[categoryName]) };
  });
  
  return (
    <div>
      <AccumulationChartComponent
        id="chart-pie"
        legendSettings={{ visible: true, background: 'white' }}
        height="full"
        tooltip={{ enable: true }}
      >
        <Inject
          services={[
            AccumulationLegend,
            PieSeries,
            AccumulationDataLabel,
            AccumulationTooltip,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            name="Expenses"
            dataSource={pieChartData}
            xName="x"
            yName="y"
            innerRadius="40%"
            startAngle={0}
            endAngle={360}
            radius="70%"
            explode
            explodeOffset="10%"
            explodeIndex={2}
            dataLabel={{
              visible: true,
              name: 'x',
              position: 'Inside',
              font: { color: 'white' },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default PieChart;
