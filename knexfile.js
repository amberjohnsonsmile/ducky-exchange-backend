module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql:///exchange'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
