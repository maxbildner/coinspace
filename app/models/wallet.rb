# == Schema Information
#
# Table name: wallets
#
#  id             :bigint           not null, primary key
#  currency_id    :integer          not null
#  user_id        :integer          not null
#  wallet_address :string           not null
#  total_value    :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Wallet < ApplicationRecord
    validates :wallet_address, :currency_id, :user_id

    belongs_to :currency,
        foreign_key: :currency_id,
        class_name: :Currency
    
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :wallet_transactions,
        foreign_key: :wallet_id,
        class_name: :WalletTransaction

       
end
