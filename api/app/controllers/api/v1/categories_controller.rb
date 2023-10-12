class Api::V1::CategoriesController < ApplicationController
  def index
    @categories = Category.all
    puts "Categories: #{@categories}"
    render json: @categories
    # render json: { categories: @categories, count: @categories.size }
  end

  def show
    @category = Category.find_by(id: params[:id])
    if @category
      @transactions = @category.transactions.order(created_at: :desc).includes(:user)
      render json: { category: @category, transactions: @transactions }
    else
      render json: { error: "Category not found" }, status: :not_found
    end
  end
end

