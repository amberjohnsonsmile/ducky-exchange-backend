const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const queries = require('./queries');
const postURL = 'https://hidden-everglades-48205.herokuapp.com/';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  queries
    .list('exchange')
    .then(rates => {
      response.json({rates});
    })
    .catch(console.error);
});

app.post('/', (request, response) => {
  queries
    .create('exchange', request.body)
    .then(rates => {
      response.status(201).json({rates});
    })
    .catch(console.error);
});

// GET request for only latest item?

let body = {};

// Repeat get requests
getRates();
setInterval(getRates, 300000);

function getRates() {
  axios
    .all([
      bittrexDASH(),
      bittrexETH(),
      bittrexLTC(),
      coincapDASH(),
      coincapETH(),
      coincapLTC(),
      kraken(),
      poloniex()
    ])
    .then(axios.spread(addRates));
}

function addRates() {
  axios
    .post(postURL, body)
    .then(console.log)
    .catch(console.error);
}

// Bittrex DASH
function bittrexDASH() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-dash')
    .then(response => {
      body.DASH_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

// Bittrex ETH
function bittrexETH() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-eth')
    .then(response => {
      body.ETH_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

// Bittrex LTC
function bittrexLTC() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-ltc')
    .then(response => {
      body.LTC_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

// CoinCap DASH
function coincapDASH() {
  return axios
    .get('http://coincap.io/page/DASH')
    .then(response => {
      body.DASH_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

// CoinCap ETH
function coincapETH() {
  return axios
    .get('http://coincap.io/page/ETH')
    .then(response => {
      body.ETH_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

// CoinCap LTC
function coincapLTC() {
  return axios
    .get('http://coincap.io/page/LTC')
    .then(response => {
      body.LTC_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

// Kraken API
function kraken() {
  return axios
    .get(
      'https://api.kraken.com/0/public/Ticker?pair=dashxbt,xltcxxbt,xethxxbt'
    )
    .then(response => {
      body.DASH_kraken = parseFloat(response.data.result.DASHXBT.p[0]);
      body.ETH_kraken = parseFloat(response.data.result.XETHXXBT.p[0]);
      body.LTC_kraken = parseFloat(response.data.result.XLTCXXBT.p[0]);
    })
    .catch(console.error);
}

// Poloniex API
function poloniex() {
  return axios
    .get('https://poloniex.com/public?command=returnTicker')
    .then(response => {
      body.DASH_poloniex = parseFloat(response.data.BTC_DASH.last);
      body.ETH_poloniex = parseFloat(response.data.BTC_ETH.last);
      body.LTC_poloniex = parseFloat(response.data.BTC_LTC.last);
    })
    .catch(console.error);
}

app.use((request, response) => {
  response.sendStatus(404);
});

app.listen(process.env.PORT || 3000);
