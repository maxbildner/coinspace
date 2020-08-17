class CreateWalletTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :wallet_transactions do |t|
      t.integer :wallet_id, null: false
      t.float :quantity
      t.float :price
      t.string :transaction_type

      t.timestamps
    end

    add_index :wallet_transactions, :wallet_id
  end
end
