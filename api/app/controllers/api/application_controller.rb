class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

    def authenticate_user!
        render json: {status: 401, message: "Please Sign In or Sign Up to continue"}, status: 401 unless user_signed_in?
    end

    def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if user_signed_in?
  end

  def user_signed_in?
    session[:user_id].present?
  end
  
end
