# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
  Category.find_or_create_by(category_params)
end