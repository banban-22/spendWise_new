class Api::V1::TransactionsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :set_params, only: [:show, :update, :destroy]

    def index
        transactions = Transaction.order(created_at: :desc).includes(:category, :user)
        render json: transactions, include: :category
    end

    def show
        render json: @transaction, include: :category
    end

    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user = current_user

        if @transaction.save
            render json: { status: 200, transaction: @transaction }, status: 200
        else
            render json: { status: :unprocessable_entity, messages: @transaction.errors.messages }, status: 422
        end
    end

    def update
        if can?(:update, @transaction) == false
            render json: { status: 401, message: "Unauthorized" }, status: 401
        elsif @transaction.update(transaction_params)
            render json: @transaction, include: :category
        else
            render json: { status: :unprocessable_entity, messages: @transaction.errors.messages }, status: 422
        end
    end

    def destroy
        if @transaction.destroy
            render json: { status: 200, message: "Transaction deleted" }, status: 200
        else
            render json: { status: 422, messages: @transaction.errors.messages }, status: 422
        end
    end


    private
    def set_params
        @transaction = Transaction.find(params[:id])
    end

    def transaction_params
        params.require(:transaction).permit(:amount, :description, :date, :currency, :category_id, :transaction_type, :user_id, :id)
    end
end
