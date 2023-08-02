import React, { useEffect, useState } from 'react';
import TransactionCreate from '../components/TransactionCreate';
import TransactionGrid from '../components/TransactionGrid';
import { Transaction, Category } from '../requests';

// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Inject,
//   Filter,
//   Sort,
//   Resize,
//   ContextMenu,
//   ExcelExport,
//   PdfExport,
//   Edit,
// } from '@syncfusion/ej2-react-grids';

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Transaction.index()
      .then((data) => {
        setTransactionData(data);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  useEffect(() => {
    Category.index()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  return (
    <div>
      <div className="mb-10">
        <p className="text-3xl font-extrabold tracking-tight text-secondary">
          Transaction
        </p>
      </div>
      {/* TransactionCreateForm */}
      <TransactionCreate />
      {/* TransactionRecord */}
      <TransactionGrid
        transactionData={transactionData}
        categories={categories}
      />
    </div>
  );
};

export default TransactionPage;
