class AddTypeToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :transaction_type, :string, default: 'expenditure'
  end
end
