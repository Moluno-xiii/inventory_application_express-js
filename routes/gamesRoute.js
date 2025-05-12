const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { getGenres } = require("../controllers/genresController");
const { getDevelopers } = require("../controllers/developersController");
const {
  createGame,
  getAllGames,
  deleteGame,
} = require("../controllers/gamesController");

const gamesRoute = Router();

gamesRoute.get("/", async (req, res) => {
  res.render("games", {
    title: "Games route",
    games: await getAllGames(),
    deleteError: "",
  });
});

gamesRoute.get(
  "/create",
  asyncHandler(async (req, res) => {
    const rows = await getGenres();
    const developers = await getDevelopers();
    res.render("createGame", {
      title: "Create game form",
      developers,
      genres: rows,
      formErrors: [],
      submissionError: "",
    });
  })
);

gamesRoute.post(
  "/create",
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title : At least 3 characters required."),
    body("description").notEmpty().withMessage("Description is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("genres")
      .isLength({ min: 1 })
      .withMessage("Select at least one genre"),
    body("developers")
      .isLength({ min: 1 })
      .withMessage("Select at least one developer"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("createGame", {
        title: "Create Game",
        formErrors: errors.array(),
        genres: await getGenres(),
        developers: await getDevelopers(),
        submissionError: "",
      });
    }

    try {
      await createGame(req.body);
      res.redirect("/games");
    } catch (err) {
      console.error("Error creating game :", err.message);
      res.status(400).render("createGame", {
        title: "Create Game",
        formErrors: errors.array(),
        genres: await getGenres(),
        developers: await getDevelopers(),
        submissionError: err.message,
      });
    }
  }
);

gamesRoute.get("/:id", (req, res) => {
  const gameId = req.params.id;
  res.send(`view specific game, game id : ${gameId}`);
});

gamesRoute.get("/:id/update", (req, res) => {
  const gameId = req.params.id;
  res.send(`show update game form, game id : ${gameId}`);
});

gamesRoute.post("/:id/update", (req, res) => {
  const data = req.body;
  console.log(data);
});

gamesRoute.get("/:id/delete", async (req, res) => {
  try {
    await deleteGame(req.params.id);
    res.redirect("/games");
  } catch (err) {
    console.error(err.message);
    res.status(404).render("games", {
      title: "Games route",
      games: await getAllGames(),
      deleteError: err.message,
    });
  }
});

module.exports = gamesRoute;
