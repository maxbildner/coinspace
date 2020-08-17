class CreateWallets < ActiveRecord::Migration[5.2]
  def change
    create_table :wallets do |t|
      t.integer :currency_id, null: false
      t.integer :user_id, null: false
      t.string :wallet_address, null: false
      t.float :total_value

      t.timestamps
    end

    add_index :wallets, :currency_id 
    add_index :wallets, :user_id
    add_index :wallets, :total_value
    add_index :wallets, :wallet_address, unique: true
  end
end
