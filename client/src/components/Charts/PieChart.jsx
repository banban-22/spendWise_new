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
import { Transaction, Category, User } from '../../requests';

const PieChart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [errors, setErrors] = useState([]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        setCategoryData(data);
      })
      .catch((err) => {
        setHasError(true);
      });
  };

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

  const nodata = [
    {
      x: 'No Data',
      y: 1,
    },
  ];

  const palette = ['#94a3b8'];

  return (
    <div className="bg-white rounded-lg p-1 shadow">
      {pieChartData.length > 0 ? (
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
      ) : (
        <div className="bg-white">
          <p className="z-50 flex justify-center align-middle content-center text-3xl no-data font-bold pt-10">
            No Data Available
          </p>

          <AccumulationChartComponent id="pie-charts">
            <Inject services={[PieSeries]} />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={nodata}
                xName="x"
                yName="y"
                type="Pie"
                palettes={palette}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      )}
    </div>
  );
};

export default PieChart;
