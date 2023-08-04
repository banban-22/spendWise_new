import * as React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import {
  Inject,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Edit,
  PdfExport,
  Toolbar,
} from '@syncfusion/ej2-react-grids';

const TransactionGrid = ({
  transactionData,
  categories,
  updatedDataInDatabase,
  deleteDataInDatabase,
}) => {
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
  const toolbar = ['Delete', 'PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  return (
    <div>
      <GridComponent
        id="grid"
        dataSource={enrichedTransactionData}
        allowPaging={true}
        allowSorting={true}
        allowPdfExport={true}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionBegin={handleGridActionBegin}
        filterSettings={{ type: 'Menu' }}
        allowFiltering={true}
        width="auto"
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="amount"
            headerText="Amount"
            width="100"
            template={(cellData) => {
              const transaction_type = cellData.transaction_type;
              const amount = cellData.amount;
              const textColor = transaction_type === 'income' ? 'green' : 'red';
              return <span style={{ color: textColor }}>{amount}</span>;
            }}
          />
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

            Edit,
            PdfExport,
            Toolbar,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default TransactionGrid;
