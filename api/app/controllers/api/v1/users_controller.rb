class Api::V1::UsersController < Api::ApplicationController
  before_action :find_user, only: [:show, :destroy]
  
  def create
    @user = User.new(user_params)

    if @user.valid? 
      @user.save
      session[:user_id] = @user.id
      render json: { status: 200, id: @user.id, name: @user.full_name, email: @user.email }, status: 200
    else
      render json: { status: 422, messages: @user.errors.messages }, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    @transactions = @user.transactions.order(created_at: :desc)
  rescue ActiveRecord::RecordNotFound
    render json: { status: :not_found, message: "User not found" }, status: 404
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: { status: 200, message: "User deleted" }, status: 200
  end

  def current
    p "current_user", current_user
  if current_user
     render json: current_user
  else
    render json: { status: 401, message: "Unauthorized" }, status: 401
  end
end


  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
