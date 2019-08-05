# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# USERS
harry = User.create({
    first_name: 'harry',
    last_name: 'hobart',
    state: 'New York',
    email: 'harry@gmail.com',
    password: '12345678'
})

demo_user = User.create({
    first_name: 'demo user',
    last_name: 'henry',
    state: 'New York',
    email: 'demo_user@gmail.com',
    password: '12345678'
})


# CURRENCIES
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
    name: 'Bitcoin',
    description: 'Bitcoin Cash is a fork of Bitcoin that seeks to add more transaction capacity to the network in order to be useful for everyday transactions.',
    high: 4355.62
})

litecoin = Currency.create({
    symbol: 'LTC',
    name: 'Litecoin',
    description: 'Litecoin is a cryptocurrency that uses a faster payment confirmation schedule and a different cryptographic algorithm than Bitcoin.',
    high: 375.29
})

