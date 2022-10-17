const express = require("express");
toolsController = require("../../controllers/tools.controller");
const limiter = require("../../middleware/apiRateLimit.middleWare");

const router = express.Router();

router
  .route("/")
  .get(toolsController.getAllTools)
  .post(limiter, toolsController.saveTool)
  .delete(toolsController.delete);
router.get("/:id", toolsController.tool);

module.exports = router;
