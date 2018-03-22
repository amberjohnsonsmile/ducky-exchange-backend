exports.up = function(knex, Promise) {
  return knex.schema.createTable('exchange', table => {
    table.increments().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.float('DASH_bittrex');
    table.float('DASH_coincap');
    table.float('DASH_kraken');
    table.float('DASH_poloniex');
    table.float('ETH_bittrex');
    table.float('ETH_coincap');
    table.float('ETH_kraken');
    table.float('ETH_poloniex');
    table.float('LTC_bittrex');
    table.float('LTC_coincap');
    table.float('LTC_kraken');
    table.float('LTC_poloniex');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('exchange');
};
