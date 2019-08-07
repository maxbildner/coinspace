class Api::CurrenciesController < ApplicationController
    def index
        @currencies = Currency.all
        render :index                       # renders index.json.jbuilder
    end

    def show 
        # debugger
        @currency = Currency.find_by(currency_params)         
        # debugger
        render :show
    end

    private
    def currency_params
        params.permit(:symbol)    
        # debugger
    end
end



# To test INDEX on the window:
# promise = $.ajax({
#     method: 'GET',
#     url: 'api/currencies'
# })

# promise => 
# {
#     cryptocurrencies: {
#         1: {id: 1, symbol: "BTC", name: "Bitcoin"}
#         2: {id: 2, symbol: "ETH", name: "Ethereum"}
#         3: {id: 3, symbol: "XRP", name: "XRP"}
#         4: {id: 4, symbol: "BCH", name: "Bitcoin"}
#         5: {id: 5, symbol: "LTC", name: "Litecoin"}
#     }
# }
 


# To test on SHOW the browser/console window: 
# promise = $.ajax({
#   method: 'GET',
#   url: 'api/currencies/ethereum',
# })

# promise.responseJSON =>
# {
#     id: 2,
#     symbol: 'ETH',
#     name: 'BITCOIN',
#     description: "Ethereum is both a cryptocurrency and a decentralized computing platform. Developers can use the platform to create decentralized applications and issue new crypto assets, known as Ethereum tokens."
# }