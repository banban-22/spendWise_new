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
  Toolbar,
  Edit,
  PdfExport,
} from '@syncfusion/ej2-react-grids';

const TransactionGrid = ({
  transactionData,
  categories,
  updatedDataInDatabase,
  deleteDataInDatabase,
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
    } else if (requestType === 'delete' && data) {
      const deleteData = Array.isArray(data) ? data[0] : data;
      if (deleteData.id) {
        console.log('Deleting data:', deleteData);
        deleteDataInDatabase(deleteData);
      }
    }
  };

  let grid;

  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  const amountColorTemplate = (cellData) => {
    if (cellData && cellData.amount && cellData.amount !== null) {
      const amount = cellData.amount;
      const textColor =
        cellData.transaction_type === 'income' ? 'green' : 'red';
      return <span style={{ color: textColor }}>{amount}</span>;
    }
    return null;
  };

  const categoryDropDownTemplate = (cellData) => {
    if (cellData && cellData.category_id && cellData.category_id !== null) {
      const category = categories.find(
        (category) => category.id === cellData.category_id
      );
      return (
        <span>
          {category.id} - {category.name}
        </span>
      );
    }
    return null;
  };

  return (
    <div>
      <GridComponent
        id="grid"
        dataSource={enrichedTransactionData}
        allowPaging={true}
        allowSorting={true}
        allowPdfExport={true}
        toolbar={['Delete', 'Edit', 'PdfExport']}
        toolbarClick={toolbarClick}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionBegin={handleGridActionBegin}
        width="auto"
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="transaction_type"
            headerText="Type"
            width="100"
            allowEditing={false}
          />
          <ColumnDirective
            field="amount"
            headerText="Amount"
            width="100"
            template={amountColorTemplate}
          />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="100"
          />
          <ColumnDirective field="date" headerText="Date" width="100" />
          <ColumnDirective
            field="category_id"
            headerText="Category"
            width="100"
            template={categoryDropDownTemplate}
          />
          <ColumnDirective
            field="category"
            headerText="Category"
            width="100"
            allowEditing={false}
            visible={false}
          />
          <ColumnDirective
            field="currency"
            headerText="Currency"
            width="100"
            allowEditing={false}
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            Toolbar,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default TransactionGrid;
