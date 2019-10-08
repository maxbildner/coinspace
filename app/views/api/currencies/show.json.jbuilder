json.extract! @currency, :id, :symbol, :name, :description

json.imageurl asset_path("#{@currency.symbol.downcase}.png")


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
#     imageurl: "/assets/eth-99bf2102cc13a51bb226f931b8d0fa4c5b3ca9dc4179167e89d7ee3f677c3fdb.png"
# }



