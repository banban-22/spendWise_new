class Api::V1::SessionsController < Api::ApplicationController
    def create
        @user = User.find_by_email(params[:email])

        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id 
            render json: { status: 200, id: @user.id, name: @user.full_name, email: @user.email }, status: 200
            p "user_id", session[:user_id]
        else
            render json: { status: 401, message: "Invalid email or password" }, status: 401
        end
    end


    def current
        render json: current_user
    end

    def destroy
        session[:user_id] = nil
        render json: {status: 200, message: "You have been logged out"}, status: 200
    end
end
