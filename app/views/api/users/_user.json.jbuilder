# Partial form
# OLD:
# json.extract! user, :id, :email, :cash_balance
# json.portfolio current_user.get_portfolio
# json.transactions current_user.wallet_transactions

# OUTPUT ?:
# {
#   id: 42,
#   email: 'demo@gmail.com',
#   cash_balance: 10000
#   transactions: [ { quantity: 1, price: 8000, transaction_type: 'BUY', ... }, ... ]
# }



# NEW:
json.extract! user, :id, :email, :cash_balance
json.portfolio current_user.get_portfolio
json.transactions do 
  json.array! current_user.wallet_transactions do |transaction|
    json.quantity transaction.quantity
    json.price transaction.price
    json.transaction_type transaction.transaction_type
    json.created_at transaction.created_at
    json.currency_symbol Wallet.find(transaction.wallet_id).currency_symbol
  end
end

# OUTPUT: ?
# {
#   id: 42,
#   email: 'demo@gmail.com',
#   cash_balance: 10000
#   transactions: [ { currency_symbol: 'BTC', quantity: 1, price: 8000, transaction_type: 'BUY', ... }, ... ]
# }








