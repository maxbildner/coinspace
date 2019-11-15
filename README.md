# README

[Live Site](https://coin-space.herokuapp.com/)

## About
Coinspace is inspired by Coinbase, a digital currency brokerage exchange that allows users to buy, sell, and research various digital assets such as Bitcoin, Ethereum, or Lite coin. 


## Technologies
* Frontend: JavaScript, React, Redux, CSS, HTML5
* Backend: Ruby on Rails, PostgreSQL
* Data Visualization: Recharts
* Financial Data: Cryptocompare API
* Misc: WebPack, BCrypt Ruby gem

## Features
### Custom User Authentication
A custom Ruby on Rails back-end user authentication pattern with a BCrypt ruby gem was used. Bcrypt internally uses Blowfish encryption.
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
### Portfolio and Currency Price Data Visualization
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
