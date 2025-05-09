require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRoute");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use((req, res) => res.status(404).send("Page not found!"));

app.listen(process.env.port, () => {
  console.log(`___listening on port ${process.env.port}___`);
});
