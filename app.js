require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRoute");
const genresRoute = require("./routes/genresRoute");
const gamesRoute = require("./routes/gamesRoute");
const developersRoute = require("./routes/developersRoute");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/developers", developersRoute);
app.use("/games", gamesRoute);
app.use("/genres", genresRoute);
app.use((req, res) => res.status(404).send("Page not found!"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message || "Server error" });
});
app.listen(process.env.PORT, () => {
  console.log(`___listening on port ${process.env.PORT}___`);
});
