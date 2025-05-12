const { Pool } = require("pg");

module.exports = new Pool({
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_ROLE_PASSWORD,
  user: process.env.PG_ROLE_NAME,
  port: 5432,
});
