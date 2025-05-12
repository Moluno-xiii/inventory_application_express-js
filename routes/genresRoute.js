const { Router } = require("express");

const genresRoute = Router();

genresRoute.get("/", (req, res) => {
  res.render("genres", { title: "Genres route" });
});

genresRoute.get("/create", (req, res) => {
  res.send("Create genre form");
});

genresRoute.post("/create", (req, res) => {
  const data = req.body;
  console.log(data);
});

genresRoute.get("/:id", (req, res) => {
  const genreId = req.params.id;
  res.send(`view specific genre, genre id : ${genreId}`);
});

genresRoute.get("/:id/update", (req, res) => {
  const genreId = req.params.id;
  res.send(`show update genre form, genre id : ${genreId}`);
});

genresRoute.post("/:id/update", (req, res) => {
  const data = req.body;
  console.log(data);
});

genresRoute.post("/:id/delete", (req, res) => {});

module.exports = genresRoute;
