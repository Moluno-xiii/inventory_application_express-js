const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { admin: "Moluno" });
});

module.exports = indexRouter;
