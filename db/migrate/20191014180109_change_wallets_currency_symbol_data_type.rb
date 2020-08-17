class ChangeWalletsCurrencySymbolDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :wallets, :currency_symbol, :string
  end
end