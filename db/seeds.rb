# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Currency.destroy_all
Wallet.destroy_all
WalletTransaction.destroy_all

# USERS
harry = User.create({
	first_name: 'harry',
	last_name: 'hobart',
	state: 'New York',
	email: 'harry@gmail.com',
	password: '12345678',
	cash_balance: 10000.00
})

demo_user = User.create({
	first_name: 'demo user',
	last_name: 'henry',
	state: 'New York',
	email: 'demo_user@gmail.com',
	password: '12345678',
	cash_balance: 10000.00
})



# WALLETS- NOT Needed bec. Wallets are automatically created when a user is created
# supported_currencies = [
# 	'BTC', 'ETH', 'XRP', 'BCH', 'LTC', 
# 	'EOS', 'XLM', 'LINK', 'XTZ', 'DASH', 
# 	'ETC', 'USDC', 'ZEC', 'BAT', 'ZRX',
# 	'REP', 'DAI'
# ]

# # Create 7 wallets for each user
# supported_currencies.each do |symbol|
#     Wallet.create(
#         :currency_symbol => symbol,
#         :user_id => harry.id,
#         :total_value => 0.00,
#         :wallet_address => SecureRandom.hex(16)
#     )
# end



# WALLET TRANSACTIONS- create default transactions for demo user
# grab demo_user btc wallet
btc_wallet = demo_user.wallets.find_by(currency_symbol: 'BTC')

# create 3 new transactions
transaction1 = WalletTransaction.create(
	wallet_id: btc_wallet.id,
	user_id: demo_user.id,
	quantity: 1.0,
	price: 8143.05,
	transaction_type: 'BUY'
)

transaction2 = WalletTransaction.create(
	wallet_id: btc_wallet.id,
	user_id: demo_user.id,
	quantity: -1.0,
	price: 8143.05,
	transaction_type: 'SELL'
)

transaction3 = WalletTransaction.create(
	wallet_id: btc_wallet.id,
	user_id: demo_user.id,
	quantity: 1.0,
	price: 8128.43,
	transaction_type: 'BUY'
)

# create new times
time1 = DateTime.new(2019, 10, 22, 9, 0, 0)  		#=> Sun, 22 Oct 2019 09:00:00 +0000
time2 = DateTime.new(2019, 10, 22, 10, 0, 0)  	#=> Sun, 22 Oct 2019 10:00:00 +0000
time3 = DateTime.new(2019, 10, 22, 11, 0, 0)  	#=> Sun, 22 Oct 2019 11:00:00 +0000

# modify the dates of all 3 transactions
transaction1.created_at = time1
transaction1.updated_at = time1
transaction1.save

transaction2.created_at = time2
transaction2.updated_at = time2
transaction2.save

transaction3.created_at = time3
transaction3.updated_at = time3
transaction3.save

# Update bitcoin wallet so that there's 1 BTC in the demo user's wallet
btc_wallet.update_value(1)

# Decrease User Model's cash balance by appropriate amount
demo_user.cash_balance = 10000 - 8128.43
demo_user.save

# @wallet_transaction = WalletTransaction.new(
#           wallet_id: wallet.id,
#           user_id: current_user.id,
#           quantity: quantity,
#           price: price,
#           transaction_type: 'BUY'
#         )

# demo_user.wallet_transactions =>
# or btc_wallet.wallet_transactions =>
# [#<WalletTransaction:0x00007fa3c2bf5820
#   id: 30,
#   wallet_id: 253,
#   quantity: 1.0,
#   price: 8143.05,
#   transaction_type: "BUY",
#   created_at: Tue, 22 Oct 2019 21:13:03 UTC +00:00,
#   updated_at: Tue, 22 Oct 2019 21:13:03 UTC +00:00,
#   user_id: 43>,
#  #<WalletTransaction:0x00007fa3c2c201b0
#   id: 31,
#   wallet_id: 253,
#   quantity: -1.0,
#   price: 8143.05,
#   transaction_type: "SELL",
#   created_at: Tue, 22 Oct 2019 21:13:43 UTC +00:00,
#   updated_at: Tue, 22 Oct 2019 21:13:43 UTC +00:00,
#   user_id: 43>,
#  #<WalletTransaction:0x00007fa3c2c2b9e8
#   id: 32,
#   wallet_id: 253,
#   quantity: 1.0,
#   price: 8128.43,
#   transaction_type: "BUY",
#   created_at: Tue, 22 Oct 2019 21:15:24 UTC +00:00,
#   updated_at: Tue, 22 Oct 2019 21:15:24 UTC +00:00,
#   user_id: 43>]






# SUPPORTED CURRENCIES
bitcoin = Currency.create({
	symbol: 'BTC',
	name: 'Bitcoin',
	description: 'The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.',
	high: 20089
})

ethereum = Currency.create({
	symbol: 'ETH',
	name: 'Ethereum',
	description: 'Ethereum is both a cryptocurrency and a decentralized computing platform. Developers can use the platform to create decentralized applications and issue new crypto assets, known as Ethereum tokens.',
	high: 1432.88
})

xrp = Currency.create({
	symbol: 'XRP',
	name: 'XRP',
	description: 'XRP is the cryptocurrency used by the Ripple payment network. Built for enterprise use, XRP aims to be a fast, cost-efficient cryptocurrency for cross-border payments.',
	high: 3.84
})

bitcoin_cash = Currency.create({
	symbol: 'BCH',
	name: 'Bitcoin Cash',
	description: 'Bitcoin Cash is a fork of Bitcoin that seeks to add more transaction capacity to the network in order to be useful for everyday transactions.',
	high: 4355.62
})

litecoin = Currency.create({
	symbol: 'LTC',
	name: 'Litecoin',
	description: 'Litecoin is a cryptocurrency that uses a faster payment confirmation schedule and a different cryptographic algorithm than Bitcoin.',
	high: 375.29
})

eos = Currency.create({
	symbol: 'EOS',
	name: 'EOS',
	description: 'EOS is a cryptocurrency designed to support large-scale applications. There are no fees to send or receive EOS. Instead, the protocol rewards the entities that run the network periodically with new EOS, effectively substituting inflation for transaction fees.',
	high: 22.29
})

stellar = Currency.create({
	symbol: 'XLM',
	name: 'Stellar Lumens',
	description: 'Stellar’s cryptocurrency, the Stellar Lumen (XLM), powers the Stellar payment network. Stellar aims to connect banks, payment systems, and individuals quickly and reliably.',
	high: 0.94
})


# New Currency Support added (12/2/19)
chainlink = Currency.create({
	symbol: 'LINK',
	name: 'Chainlink',
	description: 'Chainlink (LINK) is an Ethereum token that powers the Chainlink decentralized oracle network. This network allows smart contracts on Ethereum to securely connect to external data sources, APIs, and payment systems.',
	high: 4.54
})

dash = Currency.create({
	symbol: 'DASH',
	name: 'Dash',
	description: 'Dash is a cryptocurrency with optional speed and privacy features. Its unique network architecture consists of both regular miners and privileged machines called Masternodes.',
	high: 1642.22
})

tezos = Currency.create({
	symbol: 'XTZ',
	name: 'Tezos',
	description: "Tezos is a cryptocurrency and decentralized computing platform. Its features include proof of stake consensus, formal verification (which lets developers verify the correctness of their code), and the ability to let stakeholders vote on changes to the protocol. Tezos's block creation process is called \"baking\" — Tezos holders who stake their tokens can receive Tezos tokens as a reward for creating and verifying blocks.",
	high: 12.19
})

ethereum_classic = Currency.create({
	symbol: 'ETC',
	name: 'Ethereum Classic',
	description: "Ethereum Classic is a cryptocurrency with a special focus on immutability, popularly expressed as \"code is law.\"",
	high: 47.77
})

usd_coin = Currency.create({
	symbol: 'USDC',
	name: 'USD Coin',
	description: "USD Coin (USDC) is a stablecoin fully backed by the US dollar and developed by the CENTRE consortium. Coinbase customers with US dollar accounts may exchange 1 USDC for US$1.00 (and vice versa) on Coinbase in jurisdictions where USDC support is available. The graph above reflects USDC’s current and historical redemption value of US$1.00, which may not match the price of USDC on other exchanges. USDC is an Ethereum token and is the only fiat-backed stablecoin currently supported by Coinbase.",
	high: 1
})

zcash = Currency.create({
	symbol: 'ZEC',
	name: 'Zcash',
	description: "Zcash is a cryptocurrency that offers two types of addresses: transparent addresses that are publicly visible on the Zcash blockchain and shielded addresses that are more private. Coinbase customers can receive Zcash from both transparent and shielded addresses and send Zcash to transparent addresses. Sending to shielded addresses is not supported at this time.",
	high: 124.3
})

bat = Currency.create({
	symbol: 'BAT',
	name: 'Basic Attention Token',
	description: "BAT is an Ethereum token that powers Brave Software's blockchain-based digital advertising platform. Internet users who browse the web using Brave's free web browser (available at Brave.com) can choose to replace the ads they see with ads on Brave's ad network. Users then receive BAT from advertisers as compensation for their attention.",
	high: 0.98
})

ox = Currency.create({
	symbol: 'ZRX',
	name: 'Ox',
	description: "ZRX is an Ethereum token that is used to power the 0x protocol. The protocol itself is designed to allow Ethereum tokens to be traded at a low cost directly from your wallet.",
	high: 2.53
})

augur = Currency.create({
	symbol: 'REP',
	name: 'Augur',
	description: "Augur’s Reputation token (REP) is an Ethereum token designed for reporting and disputing the outcome of events on online prediction markets. Reporters are rewarded for reporting the outcome of events correctly.",
	high: 123.24
})

dai = Currency.create({
	symbol: 'DAI',
	name: 'Dai',
	description: "Dai (DAI) is a decentralized stablecoin running on Ethereum (ETH) that attempts to maintain a value of $1.00 USD. Unlike centralized stablecoins, Dai isn't backed by US dollars in a bank account. Instead, it’s backed by collateral on the Maker platform. Note: if the Dai credit system is upgraded or shutdown, Dai holders may need to convert their Dai to Ethereum through the Maker platform. Read more at makerdao.com/whitepaper.",
	high: 2.57
})



# NOT SUPPORTED CURRENCIES
tether = Currency.create({
	symbol: 'USDT',
	name: 'Tether',
	description: "USDT is a token that attempts to be tied to the US dollar. Ideally, this means that 1 USDT trades on exchanges at a value of exactly US$1.00. Please note that Coinbase does not support USDT — do not send it to your Bitcoin account on Coinbase.",
	high: 1.22
})

binance = Currency.create({
	symbol: 'BNB',
	name: 'Binance Coin',
	description: "Binance Coin is a cryptocurrency used to pay fees on the Binance cryptocurrency exchange. Fees paid in Binance Coin on the exchange receive a discount.",
	high: 39.57
})

bitcoin_sv = Currency.create({
	symbol: 'BSV',
	name: 'Bitcoin SV',
	description: "Bitcoin SV is a fork of Bitcoin Cash (BCH). It attempts to restore the original Bitcoin protocol as defined by version 0.1 of Bitcoin.",
	high: 255.88
})

tron = Currency.create({
	symbol: 'TRX',
	name: 'Tron',
	description: "TRX or Tronix is a cryptocurrency running on the TRON blockchain. Its goal is to create a decentralized Internet.",
	high: 0.3
})

cardano = Currency.create({
	symbol: 'ADA',
	name: 'Cardano',
	description: "Cardano is both a cryptocurrency and a decentralized computing platform. Cardano features a unique consensus algorithm (called Ouroboros) that validates transactions without high energy costs.",
	high: 0.11
})

monero = Currency.create({
	symbol: 'XMR',
	name: 'Monero',
	description: "Monero is a cryptocurrency focused on privacy. Transactions on the Monero blockchain can’t be tracked or traced. Monero uses a proof of work consensus algorithm to issue new coins and secure transactions.",
	high: 495.84
})

unus_sed_leo = Currency.create({
	symbol: 'LEO',
	name: 'UNUS SED LEO',
	description: "UNUS SED LEO is a cryptocurrency that describes itself as \"the utility token at the heart of the iFinex ecosystem.\" It's designed to be used on the Bitfinex cryptocurrency exchange as a way of reducing trading, lending, and other exchange fees.",
	high: 2
})

iota = Currency.create({
	symbol: 'MIOTA',
	name: 'Iota',
	description: "IOTA is designed to facilitate microtransactions between devices on the Internet of Things (IoT). IOTA uses a unique consensus algorithm (called the Tangle) that requires users to validate two transactions in order to make a transaction of their own.",
	high: 0.56
})








