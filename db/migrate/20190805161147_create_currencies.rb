class CreateCurrencies < ActiveRecord::Migration[5.2]
  def change
    create_table :currencies do |t|
      t.string :symbol, null: false
      t.string :name, null: false
      t.string :description
      t.float :high                   # all time high
      t.float :low                    # all time low

      t.timestamps
    end

    add_index :currencies, :symbol, unique: true
    add_index :currencies, :name
  end
end
