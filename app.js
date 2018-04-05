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

app.get('/latest', (request, response) => {
  queries
    .latest('exchange')
    .then(rates => {
      response.json({rates});
    })
    .catch(console.error);
});

app.get('/latest-dash', (request, response) => {
  queries
    .latestDASH('exchange')
    .then(rates => {
      let orderedRates = [
        rates.DASH_bittrex,
        rates.DASH_coincap,
        rates.DASH_kraken,
        rates.DASH_poloniex
      ];
      orderedRates.sort();
      let bestRate = orderedRates[0];
      Object.keys(rates).forEach(key => {
        if (rates[key] === bestRate) {
          switch (key) {
            case 'DASH_bittrex':
              response.json({bestRate: bestRate, source: 'Bittrex'});
              break;
            case 'DASH_coincap':
              response.json({bestRate: bestRate, source: 'CoinCap'});
              break;
            case 'DASH_kraken':
              response.json({bestRate: bestRate, source: 'Kraken'});
              break;
            case 'DASH_poloniex':
              response.json({bestRate: bestRate, source: 'Poloniex'});
              break;
          }
        }
      });
    })
    .catch(console.error);
});

app.get('/latest-eth', (request, response) => {
  queries
    .latestETH('exchange')
    .then(rates => {
      let orderedRates = [
        rates.ETH_bittrex,
        rates.ETH_coincap,
        rates.ETH_kraken,
        rates.ETH_poloniex
      ];
      orderedRates.sort();
      let bestRate = orderedRates[0];
      Object.keys(rates).forEach(key => {
        if (rates[key] === bestRate) {
          switch (key) {
            case 'ETH_bittrex':
              response.json({bestRate: bestRate, source: 'Bittrex'});
              break;
            case 'ETH_coincap':
              response.json({bestRate: bestRate, source: 'CoinCap'});
              break;
            case 'ETH_kraken':
              response.json({bestRate: bestRate, source: 'Kraken'});
              break;
            case 'ETH_poloniex':
              response.json({bestRate: bestRate, source: 'Poloniex'});
              break;
          }
        }
      });
    })
    .catch(console.error);
});

app.get('/latest-ltc', (request, response) => {
  queries
    .latestLTC('exchange')
    .then(rates => {
      let orderedRates = [
        rates.LTC_bittrex,
        rates.LTC_coincap,
        rates.LTC_kraken,
        rates.LTC_poloniex
      ];
      orderedRates.sort();
      let bestRate = orderedRates[0];
      Object.keys(rates).forEach(key => {
        if (rates[key] === bestRate) {
          switch (key) {
            case 'LTC_bittrex':
              response.json({bestRate: bestRate, source: 'Bittrex'});
              break;
            case 'LTC_coincap':
              response.json({bestRate: bestRate, source: 'CoinCap'});
              break;
            case 'LTC_kraken':
              response.json({bestRate: bestRate, source: 'Kraken'});
              break;
            case 'LTC_poloniex':
              response.json({bestRate: bestRate, source: 'Poloniex'});
              break;
          }
        }
      });
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

let body = {};

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
    .catch(console.error);
}

function bittrexDASH() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-dash')
    .then(response => {
      body.DASH_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

function bittrexETH() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-eth')
    .then(response => {
      body.ETH_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

function bittrexLTC() {
  return axios
    .get('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-ltc')
    .then(response => {
      body.LTC_bittrex = response.data.result[0].Last;
    })
    .catch(console.error);
}

function coincapDASH() {
  return axios
    .get('http://coincap.io/page/DASH')
    .then(response => {
      body.DASH_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

function coincapETH() {
  return axios
    .get('http://coincap.io/page/ETH')
    .then(response => {
      body.ETH_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

function coincapLTC() {
  return axios
    .get('http://coincap.io/page/LTC')
    .then(response => {
      body.LTC_coincap = response.data.price_btc;
    })
    .catch(console.error);
}

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
