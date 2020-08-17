class AddUserIdToWalletTransactions < ActiveRecord::Migration[5.2]
  def change
    # add_column: :wallet_transactions, :user_id,   https://stackoverflow.com/questions/38718529/how-to-add-a-new-column-in-an-existing-table-in-rails-5
    add_reference :wallet_transactions, :user, index: true      # https://stackoverflow.com/questions/22815009/add-a-reference-column-migration-in-rails-4
  end
end
