class Api::CurrenciesController < ApplicationController
    def index
        @currencies = Currency.all
        render :index                       # renders index.json.jbuilder
    end

    # def show 
    #     @currency = Currency.find()
    # end
end




# $.ajax({
#     method: 'GET',
#     url: 'api/currencies'
# })