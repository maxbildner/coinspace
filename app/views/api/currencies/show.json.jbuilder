json.extract! @currency, :id, :symbol, :name


# DESIRED RESPONSE TO FRONT END:
# promise = $.ajax({
#   method: 'GET',
#   url: 'api/currencies/1',
# })

# promise.responseJSON =>
# {
#     id: 1,
#     symbol: 'BTC',
#     name: 'BITCOIN'
# }



