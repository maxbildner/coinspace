json.extract! user, :id, :email, :cash_balance
json.portfolio current_user.get_portfolio
json.transactions current_user.wallet_transactions

# partial form