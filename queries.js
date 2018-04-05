const database = require('./database-connection');

module.exports = {
  list(table) {
    return database(table);
  },
  create(table, body) {
    return database(table)
      .insert(body)
      .returning('*')
      .then(record => record[0]);
  },
  latest(table) {
    return database(table)
      .orderBy('id', 'desc')
      .first();
  },
  latestDASH(table) {
    return database(table)
      .orderBy('id', 'desc')
      .first()
      .select('DASH_bittrex', 'DASH_coincap', 'DASH_kraken', 'DASH_poloniex')
      .orderBy(
        'DASH_bittrex' && 'DASH_coincap' && 'DASH_kraken' && 'DASH_poloniex',
        'desc'
      );
  },
  latestETH(table) {
    return database(table)
      .orderBy('id', 'desc')
      .first()
      .select('ETH_bittrex', 'ETH_coincap', 'ETH_kraken', 'ETH_poloniex');
  },
  latestLTC(table) {
    return database(table)
      .orderBy('id', 'desc')
      .first()
      .select('LTC_bittrex', 'LTC_coincap', 'LTC_kraken', 'LTC_poloniex');
  }
};
