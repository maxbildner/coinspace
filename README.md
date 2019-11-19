# README

[Live Site](https://coin-space.herokuapp.com/)

## About
Coinspace is inspired by Coinbase, a digital currency brokerage exchange that allows users to buy, sell, and research various digital assets such as Bitcoin, Ethereum, or Lite coin. Currently, coinspace transactions are simulated and do not actually create liquidity or change any blockchains. However further support of an order book matching engine is in progress. Coinspace users can execute buy or sell market orders, track currency news and prices over multiple timeframes. 

![Home Page GIF](https://github.com/maxbildner/coinspace/blob/master/app/assets/images/homepage.gif)

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
![Searchbar Prices GIF](https://github.com/maxbildner/coinspace/blob/master/app/assets/images/searchbar.gif)

### Portfolio and Currency Price Data Visualization
Coinspace has support for viewing price data in multiple timeframes (daily, weekly, monthly, yearly) for 17 different cryptocurrencies. 
I used [Cryptocompare](https://www.cryptocompare.com/coins/guides/how-to-use-our-api/) all of the currency price, volume, and market cap data. Recharts (Javascript Library) was used to render the charts which can be seen below:
![Prices Visualization GIF](https://github.com/maxbildner/coinspace/blob/master/app/assets/images/charts.gif)

A large problem I encoutered with the data visualization rendering was aggregating the price data. Since the cryptocompare API did not support a single AJAX call to fetch historical data for multiple currencies at a time, and the coinspace user could have an unknown number of currencies in their portfolio, I could not hard code the data fetches and needed a dynamic way of fetching data. To solve this issue, I used a Promise.all with a mapping function that produced a variable number of callback functions.  Only after all the data has been fetched that the promise is resolved and local react state is updated with all the relevant price data. 
A snippet of the function (in portfolio_chart.jsx) used to aggregate the JSON api data is below:
```
// ONLY CALLED ONCE AFTER THE FIRST RENDER
componentDidMount() {                                                         
	// On initial page load, get all 1M data for each currency in portfolio
	// inputs = timeframe in days/min/or hours, interval, key to set state                                  
    	this.getPortfolioData("30", "day", "1M-values");                            
}

// timeframe in days, minutes, or hours
getPortfolioData(timeframe, interval, timeframeKey) {                         
    const { transactions, portfolio } = this.props;
    // timeframe            == '30'        On initial render, refers to 30 days
    // interval             == 'day', 'hour', or 'minute'
    // this.props.portfolio == { 'BTC': 1, 'LTC' }
    // transactions == { quantity: 1, price: 8143.05, transaction_type: "BUY", created_at: "2019-10-22T21:13:03.849Z", currency_symbol: 'BTC' }

    let portfolioArray = Object.keys(this.props.portfolio);
    // portfolioArray == ['BTC', 'LTC']
    
    // raw data of historical prices { BTC: [], LTC: [], ... }
    let priceData = {};     

    // Promise.all takes an array of callbacks
    Promise.all(portfolioArray.map( (symbol)=> {
      return fetchHistoricalPrices(symbol, timeframe, interval).then(
        (response) => {                                                         // response == currencyArray of objects
          // response.Data == [ {time:1569801600, close:8000 }, {}, ... ]       // for 1 currency!
          priceData[symbol] = response.Data;                                    // populate priceData object (outside of asynch func/loop) with currencyArray
        } 
      )  
    })).then(
      // This callback below will be executed only after all callbacks in promise.all array are finished
      () => {
        return (
          this.setState({
            [timeframeKey]: calculatePortfolioValues(priceData, transactions),
            timePeriodActive: timeframeKey
          })
        );
      }
    );
  }
```

### News
Users can view the latest news (from the cryptocompare API) related to any currency they are viewing. Updated news is fetched on every page refresh.

![News PNG](https://raw.githubusercontent.com/maxbildner/coinspace/master/app/assets/images/news.png)


## Future Features
### Watchlist
### Order Matching Engine
### BTC Currency Deposits/Transfers


## MISC
* Ruby version
* System dependencies
* Configuration
* Database creation
* Database initialization
* How to run the test suite
* Services (job queues, cache servers, search engines, etc.)
* Deployment instructions
