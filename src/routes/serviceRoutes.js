const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.put("/:service/start", serviceController.startService);
router.put("/:service/stop", serviceController.stopService);
router.get("/:service", serviceController.getServiceStatus);
module.exports = router;
