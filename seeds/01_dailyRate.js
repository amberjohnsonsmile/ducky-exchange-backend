exports.seed = function(knex, Promise) {
  return knex('exchange')
    .del()
    .then(function() {
      return knex('exchange').insert([
        {
          id: 1,
          DASH_bittrex: 0.0485018,
          ETH_bittrex: 0.063,
          LTC_bittrex: 0.01912,
          DASH_coincap: 0.05262244592405035,
          ETH_coincap: 0.07530249662193882,
          LTC_coincap: 0.019196079501067484,
          DASH_kraken: 0.04852172,
          ETH_kraken: 0.0633,
          LTC_kraken: 0.01908741,
          DASH_poloniex: 0.0437779,
          ETH_poloniex: 0.062965,
          LTC_poloniex: 0.01907777
        },
        {
          id: 2,
          DASH_bittrex: 0.0485018,
          ETH_bittrex: 0.063,
          LTC_bittrex: 0.01912,
          DASH_coincap: 0.05262244592405035,
          ETH_coincap: 0.07530249662193882,
          LTC_coincap: 0.019196079501067484,
          DASH_kraken: 0.04852172,
          ETH_kraken: 0.0633,
          LTC_kraken: 0.01908741,
          DASH_poloniex: 0.0437779,
          ETH_poloniex: 0.062965,
          LTC_poloniex: 0.01907777
        }
      ]);
    })
    .then(() => {
      return knex.raw('ALTER SEQUENCE exchange_id_seq RESTART WITH 3');
    });
};
