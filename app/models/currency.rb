# == Schema Information
#
# Table name: currencies
#
#  id          :bigint           not null, primary key
#  symbol      :string           not null
#  name        :string           not null
#  description :string
#  high        :float
#  low         :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Currency < ApplicationRecord
    validates :symbol, uniqueness: true
    validates :symbol, :name, presence: true
    
    has_many :watchlists

    # OLD Table:
    # has_many :wallets,
    #     foreign_key: :currency_id,
    #     class_name: :Wallet
end
