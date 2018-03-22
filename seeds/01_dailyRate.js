exports.seed = function(knex, Promise) {
  return knex('exchange')
    .del()
    .then(function() {
      return knex('exchange').insert([
        {
          id: 1,
          bittrex_DASH: 0.0485018,
          bittrex_ETH: 0.063,
          bittrex_LTC: 0.01912,
          coincap_DASH: 0.05262244592405035,
          coincap_ETH: 0.07530249662193882,
          coincap_LTC: 0.019196079501067484,
          kraken_DASH: 0.04852172,
          kraken_ETH: 0.0633,
          kraken_LTC: 0.01908741,
          poloniex_DASH: 0.0437779,
          poloniex_ETH: 0.062965,
          poloniex_LTC: 0.01907777
        }
      ]);
    })
    .then(() => {
      return knex.raw('ALTER SEQUENCE exchange_id_seq RESTART WITH 2');
    });
};
