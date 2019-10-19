class Api::WalletTransactionsController < ApplicationController
  def create                                  # create new wallet transaction AND update wallet value
    # Calculate total purchase price
    quantity = trade_params[:quantity].to_f   # float
    symbol = trade_params[:symbol]            # string
    price = trade_params[:price].to_f         # float
    total_price = quantity * price            # float
    user_id = current_user.id                 # integer

    # Make sure correct user is logged in 
    # Check if user_id matches user_id in DB by session cookie 
    correct_user = logged_in? && (user_id == trade_params[:user_id].to_i)
    # debugger

    # Validate user has enough cash
    if correct_user && (current_user.cash_balance >= total_price)

      # 1) Update correct wallet value
      wallet = Wallet.get_wallet(user_id, symbol)
      wallet.update_value(quantity)
      # debugger

      # decrease cash balance by total price
      current_user.cash_balance = current_user.cash_balance - total_price
      
      # 2) Create new wallet transaction
      @wallet_transaction = WalletTransaction.new(
        wallet_id: wallet.id,
        quantity: quantity,
        price: price,
        transaction_type: 'BUY'
      )
      

      # 3) Send back users new cash_balance, portfolio, (transactions but add this later)
      @wallet_transaction.save
  
      render json: {
        id: current_user.id,
        email: current_user.email,
        cash_balance: current_user.cash_balance,            # float
        portfolio: current_user.get_portfolio               # object { 'BTC': 1, 'LTC': .5 } 
      }
    else
      # Send back error
      render json: ['Not enough cash balance, and/or invalid params'], status: 422
    end
  end


  private
  def trade_params
    # ex. params == {"purchaseInfo"=>{"user_id"=>"11", "symbol"=>"BTC", "quantity"=>"1"}
    params.require(:purchaseInfo).permit(:user_id, :symbol, :quantity, :price)
  end
end