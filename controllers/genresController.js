const db = require("../database/pg");

async function getGenres() {
  const { rows } = await db.query("SELECT * FROM genres ORDER BY name");
  return rows;
}

module.exports = { getGenres };
