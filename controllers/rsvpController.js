const RSVP = require("../models/RSVP");

// Create RSVP
exports.createRSVP = async (req, res) => {
  try {
    const newRSVP = new RSVP(req.body);
    await newRSVP.save();
    res.status(201).json({ message: "RSVP submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit RSVP." });
  }
};

// Update RSVP
exports.updateRSVP = async (req, res) => {
  try {
    const updated = await RSVP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update RSVP." });
  }
};

// Delete RSVP
exports.deleteRSVP = async (req, res) => {
  try {
    await RSVP.findByIdAndDelete(req.params.id);
    res.json({ message: "RSVP deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete RSVP." });
  }
};

// (Optional) Get All RSVPs
exports.getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find();
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve RSVPs." });
  }
};
