import React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  Edit,
  PdfExport,
} from '@syncfusion/ej2-react-grids';

const TransactionGrid = ({
  transactionData,
  categories,
  updatedDataInDatabase,
}) => {
  console.log(transactionData);

  const categoriesMap = {};
  categories.forEach((category) => {
    categoriesMap[category.id] = category.name;
  });

  const enrichedTransactionData = transactionData.map((transaction) => ({
    ...transaction,
    category: categoriesMap[transaction.category_id],
  }));

  const handleGridActionBegin = (args) => {
    const { requestType, action, data } = args;

    if (requestType === 'save' && action === 'edit' && data) {
      const updatedData = Array.isArray(data) ? data[0] : data;
      if (updatedData.id) {
        updatedDataInDatabase(updatedData);
      }
    }
  };

  return (
    <div>
      <GridComponent
        dataSource={enrichedTransactionData}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionBegin={handleGridActionBegin}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective field="amount" headerText="Amount" width="100" />
          <ColumnDirective field="currency" headerText="Currency" width="100" />
          <ColumnDirective field="category" headerText="Category" width="100" />
          <ColumnDirective field="date" headerText="Date" width="100" />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="100"
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default TransactionGrid;
