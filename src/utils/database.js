const { Pool } = require('pg');

const dbConfig = {
  connectionString: process.env.DATABASE_URL
}
const database = new Pool(dbConfig);

module.exports = database;