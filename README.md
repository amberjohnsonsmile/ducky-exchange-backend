# Ducky Exchange - Backend Code

Donald wants to give each of his three kids, Huey, Luey, and Duey, birthday presents. He intends to give each of his children 5 Bitcoin each. The problem is that each of his kids has requested different coin currencies. Huey wants Ethereum. Luey is all about Litecoin. Duey is gloating about being into DASH. Donald wants to get the best rates possible when he converts the coins to give his children and wants a tool to calculate that for him. 

Because Donald doesn't believe in alt coins and will live and die by Bitcoin, he also wants to set up a savings account of Bitcoin for each of his children to get when they are of age. The problem is that none of his kids have Bitcoin accounts and are confused by wallets.

[Visit app](https://ducky-exchange.firebaseapp.com/)

[View frontend code](https://github.com/amberjohnsonsmile/exchange)

![screenshot](https://user-images.githubusercontent.com/31632938/37859747-8d3b6300-2ede-11e8-8aee-9ed77b79f94e.png)

## About the App

The Ducky Exchange app gets the latest Bitcoin exchange rates every five minutes from four different APIs, formats the data, and adds it to a database hosted on Heroku. The front-facing client portal displays the latest data and the best rates from each source.

## Technologies
* React
* Node.js
* Express.js
* PostgreSQL
* Knex.js
* Heroku
* Firebase
* APIs - Bittrex, CoinCap, Kraken, Poloniex

## Local Installation Instructions
If you would like to run the server locally, follow these steps:

1. Create a fork of this repo

1. Clone it to your local machine

1. Navigate to the new folder on the command line and run `npm install`

1. Run `npm run dev`

1. Visit the API in your web browser at localhost:3000 with the following endpoints:
* GET
  * `/` - list all exchange rates over time
  * `/latest` - list only the latest rates
  * `/latest-dash` - get the current best rate for Dash-Bitcoin and the API source
  * `/latest-eth` - get the current best rate for Ethereum-Bitcoin and the API source
  * `/latest-ltc` - get the current best rate for Litecoin-Bitcoin and the API source

## Contact

Amber Johnson, Full Stack Web Developer

![headshot](https://user-images.githubusercontent.com/31632938/36687590-517de15e-1ae7-11e8-8753-5c28cefd5e69.jpeg)
* Email amberjohnsonsmile@gmail.com
* Portfolio [amberjohnsonsmile.co](https://amberjohnsonsmile.co)
* GitHub [@amberjohnsonsmile](https://github.com/amberjohnsonsmile)
* LinkedIn [@amberjohnsonsmile](https://linkedin.com/in/amberjohnsonsmile)

## License

MIT
