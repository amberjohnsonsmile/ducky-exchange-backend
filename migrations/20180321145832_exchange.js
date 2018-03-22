exports.up = function(knex, Promise) {
  return knex.schema.createTable('exchange', table => {
    table.increments().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.float('bittrex_DASH');
    table.float('bittrex_ETH');
    table.float('bittrex_LTC');
    table.float('coincap_DASH');
    table.float('coincap_ETH');
    table.float('coincap_LTC');
    table.float('kraken_DASH');
    table.float('kraken_ETH');
    table.float('kraken_LTC');
    table.float('poloniex_DASH');
    table.float('poloniex_ETH');
    table.float('poloniex_LTC');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('exchange');
};
