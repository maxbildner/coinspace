# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  state           :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  cash_balance    :float
#

class User < ApplicationRecord
	validates :email, :session_token, presence: true, uniqueness: true
	validates :password_digest, :first_name, :last_name, :state, presence: true
	validates :password, length: { minimum: 8, allow_nil: true }

	attr_reader :password

	after_initialize :ensure_session_token
	after_create :generate_wallets

	has_many :wallets,
		foreign_key: :user_id,
		class_name: :Wallet

	has_many :wallet_transactions

	has_many :watchlists

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		user && user.is_password?(password) ? user : nil
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = self.class.generate_session_token
		save!
		session_token
	end

	
	def generate_wallets
		supported_currencies = [
			'BTC', 'ETH', 'XRP', 'BCH', 'LTC', 
			'EOS', 'XLM', 'LINK', 'XTZ', 'DASH', 
			'ETC', 'USDC', 'ZEC', 'BAT', 'ZRX',
			'REP', 'DAI'
		]

		supported_currencies.each do |symbol|
			Wallet.create(
				:currency_symbol => symbol, 
				:user_id => self.id, 
				:total_value => 0.00,
				:wallet_address => SecureRandom.hex(16))
		end
	end


	def get_portfolio                                 # returns ex. # { 'BTC': 1, 'LTC': .5 } 
		# Get all wallets for a current user (array of wallet objects)
		wallets = Wallet.where(user_id: self.id)        # array of wallets that belong to user
		# wallets == [ {id: 23, currency_symbol: 'ETH', 'total_value': 0.0... }, {}, ... ]
		# debugger

		portfolio = {}                                  # to return

		# loop through wallets, grab symbol and total value
		i = 0
		while i < wallets.length
			wallet = wallets[i]
			symbol = wallet.currency_symbol
			# debugger

			if wallet.total_value > 0                  		# only populate portfolio if user owns that currency
				portfolio[symbol] = wallet.total_value
				# debugger
			end

			i = i + 1
		end
		# wallets.each do |wallet|                      # .each DOES NOT work on rails "array-like" objects!!!!
		#     symbol = wallet.currency_symbol
		#     debugger
		# end

		# debugger

		portfolio                                       # ex. # { 'BTC': 1, 'LTC': .5 } 
	end


	# def get_transactions
	# 	transactions = []

	# 	# get all wallets for user
	# 	wallets = self.wallets					# "array-like"

	# 	i = 0
	# 	while i < wallets.length				# go through each wallet
	# 		wallet = wallets[i]
	# 		wallet_id = wallet.id
	# 		wallet_transactions = 
	# 		# get all transactions for each wallet
	# 	end
		
	# 	# WalletTransaction.where()
	# end


	def get_wallets 
		Wallet.where(user_id: self.id)                 # return array of wallets that belong to user
	end


	def has_enough_currency(symbol, negativeQuantity)
		portfolio = self.get_portfolio

		quantity = negativeQuantity * -1

		# return false if user doesn't have any or enough of the currency in their wallet
		if ( (portfolio[symbol] == nil) || (portfolio[symbol] < quantity) )
			return false
		end

		true
	end


	private

	def self.generate_session_token
		SecureRandom.urlsafe_base64
	end

	def ensure_session_token
		self.session_token ||= self.class.generate_session_token
	end
end

