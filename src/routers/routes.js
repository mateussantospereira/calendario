const { Router } = require("express");
const viewController = require("../controllers/viewController");
const calendarioController = require("../controllers/calendarioController");
const router = Router();

// Views
router.get("/", viewController.inicio);
router.get("/calendario", viewController.calendario);
router.get("/info", viewController.info);

// ReadMe.md
router.get("/read", viewController.read);

// Calendário
router.post("/calculate", calendarioController.calculate);

module.exports = router;