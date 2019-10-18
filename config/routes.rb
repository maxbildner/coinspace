Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    # POST api/user (create user)
    resources :users, only: [:create]

    # POST api/session (log in)
    # DELETE api/session (logout)
    resource :session, only: [:create, :destroy]

    # GET api/currencies (list all currencies)
    # GET api/currency/:id (show currency information)
    resources :currencies, only: [ :index, :show ]

    # POST api/trade (create new wallet transaction AND update wallet value, AND user cash balance)
    resources :wallet_transactions, only: [ :create ]
  end

end
