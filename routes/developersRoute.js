const { Router } = require("express");

const developersRoute = Router();

developersRoute.get("/", (req, res) => {
  res.render("developers", { title: "Developers route" });
});

developersRoute.get("/create", (req, res) => {
  res.send("Create developer form");
});

developersRoute.post("/create", (req, res) => {
  const data = req.body;
  console.log(data);
});

developersRoute.get("/:id", (req, res) => {
  const developerId = req.params.id;
  res.send(`view specific developer, developer id : ${developerId}`);
});

developersRoute.get("/:id/update", (req, res) => {
  const developerId = req.params.id;
  res.send(`show update developer form, developer id : ${developerId}`);
});

developersRoute.post("/:id/update", (req, res) => {
  const data = req.body;
  console.log(data);
});

developersRoute.post("/:id/delete", (req, res) => {});

module.exports = developersRoute;
