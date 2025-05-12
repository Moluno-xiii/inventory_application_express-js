const pg = require("../database/pg");

function normalizeText(text) {
  return text.trim().replace(/\s+/g, " ");
}

async function getAllGames(req, res) {
  const { rows } = await pg.query("SELECT * FROM games ORDER BY title");
  return rows;
}

async function createGame(data) {
  const result = await pg.query(
    "SELECT COUNT(*) FROM games WHERE title ILIKE $1",
    [normalizeText(data.title)]
  );

  const count = Number(result.rows[0].count);
  if (count > 0) {
    throw new Error("game already exists");
  }

  const genreList = Array.isArray(data.genres) ? data.genres : [data.genres];
  const developersList = Array.isArray(data.developers)
    ? data.developers
    : [data.developers];

  const { rows } = await pg.query(
    "INSERT INTO games (title, description, release_date, price) VALUES ($1, $2, $3, $4) RETURNING id",
    [
      normalizeText(data.title),
      normalizeText(data.description),
      data.release_date,
      data.price,
    ]
  );
  const gameId = rows[0].id;

  for (const genreId of genreList) {
    await pg.query(
      "INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)",
      [gameId, genreId]
    );
  }

  for (const developerId of developersList) {
    await pg.query(
      "INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)",
      [gameId, developerId]
    );
  }
}

async function deleteGame(game_id) {
  try {
    await pg.query("DELETE FROM games WHERE id = $1", [game_id]);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getAllGames, createGame, deleteGame };
