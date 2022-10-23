const express = require("express");
toolsController = require("../../controllers/tools.controller");
const limiter = require("../../middleware/apiRateLimit.middleWare");

const router = express.Router();

router.get("/", toolsController.getAllTools);
router.delete("/:id", toolsController.delete);
router.get("/:id", toolsController.tool);
router.post("/save", toolsController.saveTool);

module.exports = router;
