// require('dotenv').config();
const { Pool } = require('pg');


const dbConfig = {
  connectionString: process.env.DATABASE_URL
}
const database = new Pool(dbConfig);

// const database = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD
// });

module.exports = database;