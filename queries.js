const database = require('./database-connection')

module.exports = {
  list(table){
    return database(table);
  },
  create(table, body){
    return database(table)
      .insert(body)
      .returning("*")
      .then(record => record[0])
  },
  latest(table) {
    return database(table)
      .last();
  }
}
