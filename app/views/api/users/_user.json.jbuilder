json.extract! user, :id, :email, :cash_balance
json.portfolio current_user.get_portfolio

# partial form