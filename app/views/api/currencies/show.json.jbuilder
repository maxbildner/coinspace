json.extract! @currency, :id, :symbol, :name, :description


# DESIRED RESPONSE TO FRONT END:
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



