const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");

// POST - Create RSVP
router.post("/", rsvpController.createRSVP);

router.get("/dashboard/vihang", rsvpController.getRSVPList);

router.get("/updatersvp", rsvpController.updateRSVPUI);

// PUT - Update RSVP
router.post("/updatersvpRecord", rsvpController.updateRSVP);

// DELETE - Delete RSVP
router.delete("/:id", rsvpController.deleteRSVP);

// GET - Optional: Get all
router.get("/", rsvpController.getAllRSVPs);

module.exports = router;
