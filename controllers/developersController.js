const db = require("../database/pg");

async function getDevelopers() {
  const { rows } = await db.query("SELECT * FROM developers ORDER BY name");
  return rows;
}

module.exports = { getDevelopers };
