import React, { useEffect, useState, useRef } from 'react';
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

  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      categoriesMap[category.id] = category.name;
    });
  }

  const handleGridActionBegin = async (args) => {
    const { requestType, action, data } = args;

    if (requestType === 'save' && action === 'edit' && data) {
      const updatedData = data;
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

  const newTransactionData = transactionData.map((transaction) => {
    if (transaction.category_id) {
      const categoryName = categoriesMap[transaction.category_id] || '';

      return {
        ...transaction,
        category: categoryName,
      };
    }
  });

  const toolbar = ['Edit', 'Delete', 'PdfExport'];
  let grid;

  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };

  return (
    <div>
      <GridComponent
        dataSource={newTransactionData}
        allowPaging={true}
        allowSorting={true}
        allowPdfExport={true}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
        editSettings={{
          allowDeleting: true,
          allowEditing: true,
          mode: 'Normal',
        }}
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
              const amount = cellData.amount;
              const textColor =
                cellData.transaction_type === 'income' ? 'green' : 'red';
              return <span style={{ color: textColor }}>{amount}</span>;
            }}
          />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="100"
          />
          <ColumnDirective field="date" headerText="Date" width="100" />
          <ColumnDirective
            field="category_id"
            headerText="CategoryID"
            width="100"
            editType="dropdownedit"
          />
          <ColumnDirective
            field="category"
            headerText="Category"
            width="100"
            editType="dropdownedit"
          />
          <ColumnDirective field="currency" headerText="Currency" width="100" />
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
