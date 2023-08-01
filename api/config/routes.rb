Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :transactions, only: [:index, :show, :create, :update, :destroy] do
        resources :bills, only: [:index, :show, :create, :update, :destroy]
        resources :categories, only: [:index, :show, :create, :update, :destroy]
      end
      resources :categories, only: [:index, :show] do
        resources :transactions, only: [:index]
      end

      resource :session, only: [:create, :destroy] do
        collection do
          get :current
        end
      end
      resources :users, only: [:create, :update, :destroy] do
        collection do 
          get :current
        end
      end
    end
  end
end
