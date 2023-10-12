class AddDefaultCategories < ActiveRecord::Migration[7.0]
   def up
    Category.create(name: "Housing")
    Category.create(name: "Transportation")
    Category.create(name: "Food")
    Category.create(name: "Utilities")
    Category.create(name: "Insurance")
    Category.create(name: "Medical & Healthcare")
    Category.create(name: "Saving, Investing, & Debt Payments")
    Category.create(name: "Personal Spending")
    Category.create(name: "Recreation & Entertainment")
    Category.create(name: "Miscellaneous")
    Category.create(name: "Income")
    Category.create(name: "Transportation")

    # Using raw SQL insert for performance and simplicity
  #   execute "INSERT INTO categories (name, created_at, updated_at) VALUES
  #            ('Housing', now(), now()),
  #            ('Transportation', now(), now()),
  #            ('Food', now(), now()),
  #            ('Utilities', now(), now()),
  #            ('Insurance', now(), now()),
  #            ('Medical & Healthcare', now(), now()),
  #            ('Saving, Investing, & Debt Payments', now(), now()),
  #            ('Personal Spending', now(), now()),
  #            ('Recreation & Entertainment', now(), now()),
  #            ('Miscellaneous', now(), now()),
  #            ('Income', now(), now());"
  # end

  def down
    # Optionally implement rollback if needed
    Category.destroy_all
  end

end
