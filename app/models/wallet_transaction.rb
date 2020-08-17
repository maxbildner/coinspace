# == Schema Information
#
# Table name: wallet_transactions
#
#  id               :bigint           not null, primary key
#  wallet_id        :integer          not null
#  quantity         :float
#  price            :float
#  transaction_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint
#

class WalletTransaction < ApplicationRecord
    validates :wallet_id, :user_id, presence: true

    belongs_to :wallet,
        foreign_key: :wallet_id,
        class_name: :Wallet

    belongs_to :user
end
