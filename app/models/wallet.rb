# == Schema Information
#
# Table name: wallets
#
#  id              :bigint           not null, primary key
#  currency_symbol :string           not null
#  user_id         :integer          not null
#  wallet_address  :string           not null
#  total_value     :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Wallet < ApplicationRecord
	validates :wallet_address, :user_id,  presence: true

	# OLD Table:
	# belongs_to :currency,
	#     foreign_key: :currency_id,
	#     class_name: :Currency
	
	belongs_to :user,
		foreign_key: :user_id,
		class_name: :User

	has_many :wallet_transactions,
		foreign_key: :wallet_id,
		class_name: :WalletTransaction

	
	# Find appropriate wallet to update
	def self.get_wallet(user_id, symbol)
		# find wallets, given by a user_id and symbol
		wallet = Wallet.find_by(user_id: user_id, currency_symbol: symbol)					
	end

	# Increment wallets total value
	def update_value(quantity)															# quantity == crypto value NOT USD
		if quantity > 0																				# BUY 
			self.total_value = self.total_value + quantity			# increment wallet value by quantity
		else 																									# SELL
			self.total_value = self.total_value - quantity			# decrement wallet value by quantity
		end
		
		save!
	end
end
