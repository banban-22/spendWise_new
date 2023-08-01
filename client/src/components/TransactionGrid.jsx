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

const TransactionGrid = ({ transactionData }) => {
  console.log(transactionData);

  return (
    <div>
      <GridComponent
        dataSource={transactionData}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective field="amount" headerText="Amount" width="100" />
          {/* <ColumnDirective
            field="category_id"
            headerText="Category ID"
            width="100"
          /> */}
          <ColumnDirective field="currency" headerText="Currency" width="100" />
          <ColumnDirective field="date" headerText="Date" width="100" />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="100"
          />
          {/* <ColumnDirective field="id" headerText="ID" width="100" />
          <ColumnDirective field="user_id" headerText="User ID" width="100" /> */}
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
