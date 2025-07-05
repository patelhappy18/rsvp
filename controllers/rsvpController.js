const RSVP = require("../models/RSVP");
const { sendRSVPConfirmation } = require("../utils/mailer");

// Create RSVP

exports.createRSVP = async (req, res) => {
  try {
    const user = await RSVP.findOne({ email: req.body.email });
    if (!user) {
      const newRSVP = new RSVP(req.body);
      await newRSVP.save();
      const rsvps = await RSVP.find().sort({ createdAt: -1 }).lean();
      const totalGuests = rsvps.reduce(
        (sum, rsvp) => sum + (rsvp.guests || 0),
        0
      );
      await sendRSVPConfirmation(
        req.body.email,
        req.body.name,
        req.body.guests,
        totalGuests
      );

      return res.redirect(`/?msg=Thank you for your RSVP! 🎉`);
    } else {
      return res.redirect(
        `/?msg=You have already Registered 😕 Use another Email`
      );
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getRSVPList = async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 }).lean();
    const totalRSVPs = rsvps.length;
    const totalGuests = rsvps.reduce(
      (sum, rsvp) => sum + (rsvp.guests || 0),
      0
    );

    res.render("admin", {
      totalRSVPs,
      totalGuests,
      rsvps,
    });
  } catch (err) {
    res.status(500).send("Error loading dashboard");
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
