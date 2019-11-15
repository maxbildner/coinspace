# README

[Live Site](https://coin-space.herokuapp.com/)

## About
Coinspace is inspired by Coinbase, a digital currency brokerage exchange that allows users to buy, sell, and research various digital assets such as Bitcoin, Ethereum, or Lite coin. Currently, coinspace transactions are simulated and do not actually create liquidity or change any blockchains. However further support of an order book matching engine is in progress. Coinspace users can execute buy or sell market orders, track currency news and prices over multiple timeframes. 

## Technologies
* Frontend: JavaScript, React, Redux, CSS, HTML5
* Backend: Ruby on Rails, PostgreSQL
* Data Visualization: Recharts
* Financial Data: Cryptocompare API
* Misc: WebPack, BCrypt Ruby gem

## Features
### Custom User Authentication
I used a custom Rails back-end user authentication pattern with a BCrypt ruby gem. Bcrypt internally uses Blowfish encryption.
The following is part of the auth pattern from the user model:
```
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

def self.generate_session_token
  SecureRandom.urlsafe_base64
end

def ensure_session_token
  self.session_token ||= self.class.generate_session_token
end
```

### Cryptocurrency Search Bar
Users can search for cryptocurrencies by either symbol (ex. BTC) or name (Bitcoin). Since less than 100 currencies are stored, no database is queried. All search is done on the front end. The search algorithm is in O(N) time, where N is the number of currencies to search. 

### Portfolio and Currency Price Data Visualization
Coinspace has support for viewing price data in multiple timeframes (daily, weekly, monthly, yearly) for 17 different cryptocurrencies. 
I used [Cryptocompare](https://www.cryptocompare.com/coins/guides/how-to-use-our-api/) all of the currency price, volume, and market cap data. Recharts (Javascript Library) was used to render the charts which can be seen below:

### News

## Future Features
### Watchlist
### Order Matching Engine
### BTC Currency Deposits/Transfers


This README would normally document whatever steps are necessary to get the
application up and running.
Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
