class AddDefaultCategories < ActiveRecord::Migration[7.0]
  def up
    default_categories = [
      { name: "Housing" },
      { name: "Transportation" },
      { name: "Food" },
      { name: "Utilities" },
      { name: "Insurance" },
      { name: "Medical & Healthcare" },
      { name: "Saving, Investing, & Debt Payments" },
      { name: "Personal Spending" },
      { name: "Recreation & Entertainment" },
      { name: "Miscellaneous" },
      { name: "Income"}
    ]

    default_categories.each do |category_params|
      category = Category.find_or_create_by(category_params)
      if category.persisted?
        puts "Category '#{category.name}' created or already exists."
      else
        puts "Error creating category '#{category.name}': #{category.errors.full_messages.join(', ')}"
      end
    end
  end

  def down
    # Optionally implement rollback if needed
    Category.delete_all
  end

end
