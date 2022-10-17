const express = require("express");
const greetControllers = require("../../controllers/greetings.controller");
const viewCount = require("../../middleware/viweCount.middleware");
const limiter = require("../../middleware/apiRateLimit.middleWare");

const router = express.Router();

router
  .route("/")
  .get(viewCount, limiter, greetControllers.getGreetings)
  .post(greetControllers.saveGreettings);

module.exports = router;
