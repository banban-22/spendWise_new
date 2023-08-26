class CallbacksController < ApplicationController
    def index
        omniauth_data = request.env['omniauth.auth']
        @user = User.find_from_omniauth(omniauth_data)
        @user ||= User.create_from_omniauth(omniauth_data)
        session[:user_id] = @user.id
        redirect_to root_path, notice: "Thanks for signing in with #{omniauth_data['provider'].capitalize}!"
        # If you want to use oAuth with react, redirect_to json: @user
    end
end