const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const queries = require('./queries');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  queries
    .list('exchange')
    .then(data => {
      response.json({data});
    })
    .catch(console.error);
});

app.post('/', (request, response) => {
  queries
    .create('exchange', request.body)
    .then(data => {
      response.status(201).json({data});
    })
    .catch(console.error);
});

// GET request for only latest item?

let body = {};

// Bittrex DASH
function bittrex() {
  axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-dash')
    .then(response => {
      body.bittrex_DASH = response.data.result[0].Last;
    })
    .catch(console.error);
}

// Still researching async await syntax
async function getRates() {
  await bittrex();
  console.log(body)
}

getRates();

// Bittrex LTC
// axios
//   .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-ltc')
//   .then(response => {
//     body.bittrex_LTC = response.data.result[0].Last;
//   })
//   .catch(console.error);

// // Bittrex ETH
// axios
//   .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-eth')
//   .then(response => {
//     body.bittrex_ETH = response.data.result[0].Last;
//   })
//   .catch(console.error);

// // CoinCap DASH
// axios
//   .get('http://coincap.io/page/DASH')
//   .then(response => {
//     body.coincap_DASH = response.data.price_btc;
//     console.log(body);
//   })
//   .catch(console.error);

// // CoinCap LTC
// axios
//   .get('http://coincap.io/page/LTC')
//   .then(response => {
//     body.coincap_LTC = response.data.price_btc;
//     console.log(body);
//   })
//   .catch(console.error);

// // CoinCap ETH
// axios
//   .get('http://coincap.io/page/ETH')
//   .then(response => {
//     body.coincap_ETH = response.data.price_btc;
//     console.log(body);
//   })
//   .catch(console.error);

// // Kraken API
// axios
//   .get('https://api.kraken.com/0/public/Ticker?pair=dashxbt,xltcxxbt,xethxxbt')
//   .then(response => {
//     body.kraken_DASH = parseFloat(response.data.result.DASHXBT.p[0]);
//     body.kraken_ETH = parseFloat(response.data.result.XETHXXBT.p[0]);
//     body.kraken_LTC = parseFloat(response.data.result.XLTCXXBT.p[0]);
//   })
//   .catch(console.error);

// // Poloniex API
// axios
//   .get('https://poloniex.com/public?command=returnTicker')
//   .then(response => {
//     body.poloniex_DASH = parseFloat(response.data.BTC_DASH.last);
//     body.poloniex_ETH = parseFloat(response.data.BTC_ETH.last);
//     body.poloniex_LTC = parseFloat(response.data.BTC_LTC.last);
//   })
//   .catch(console.error);

// axios.post to my server to add data?
// Need to wait until all post requests are complete... async await? How do I do that?

// async function getABC() {
//   let A = await getValueA(); // getValueA takes 2 second to finish
//   let B = await getValueB(); // getValueB takes 4 second to finish
//   let C = await getValueC(); // getValueC takes 3 second to finish

//   return A*B*C;
// }

app.use((request, response) => {
  response.sendStatus(404);
});

console.log('Listening on port 3000');
app.listen(process.env.PORT || 3000);
