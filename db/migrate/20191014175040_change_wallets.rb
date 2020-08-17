class ChangeWallets < ActiveRecord::Migration[5.2]
  def change
    # arguments (table to change, old column name, new_column_name)
    rename_column :wallets, :currency_id, :currency_symbol
  end
end
