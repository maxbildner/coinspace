Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    # POST /user (create user)
    resources :users, only: [:create]

    # POST /session (log in)
    # DELETE /session (logout)
    resource :session, only: [:create, :destroy]

    # GET /currencies (list all currencies)
    # GET /currency/:id (show currency information)
    resources :currencies, only: [ :index, :show ]
  end

end
