const database = require("./database-connection")

module.exports = {
  list(table){
    return database(table);
  }
}
