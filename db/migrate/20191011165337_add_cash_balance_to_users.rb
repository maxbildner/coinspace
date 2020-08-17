class AddCashBalanceToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cash_balance, :float
  end
end
