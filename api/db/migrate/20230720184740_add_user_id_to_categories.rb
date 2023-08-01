class AddUserIdToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :user_id, :bigint
    add_foreign_key :categories, :users
  end
end
