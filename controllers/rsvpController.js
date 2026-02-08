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
      const totals = rsvps.reduce(
        (acc, rsvp) => {
          if (rsvp.attendance === "yes") {
            acc.totalAdults += Number(rsvp.adults || 0);
            acc.totalKids += Number(rsvp.kids || 0);
          }
          return acc;
        },
        { totalAdults: 0, totalKids: 0 }
      );

      await sendRSVPConfirmation(
        req.body.email,
        req.body.name,
        totals.totalAdults,
        totals.totalKids,
        newRSVP.email,
        newRSVP.name
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

    const totals = rsvps.reduce(
      (acc, rsvp) => {
        if (rsvp.attendance === "yes") {
          acc.totalAdults += Number(rsvp.adults || 0);
          acc.totalKids += Number(rsvp.kids || 0);
        }
        return acc;
      },
      { totalAdults: 0, totalKids: 0 }
    );

    const totalGuests = totals.totalAdults + totals.totalKids;

    res.render("admin", {
      totalRSVPs,
      totalAdults: totals.totalAdults,
      totalKids: totals.totalKids,
      totalGuests,
      rsvps,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
};

exports.updateRSVPUI = async (req, res) => {
  const { email, name } = req.query;
  res.render("updateRSVP", { email, name });
};

// Update RSVP
exports.updateRSVP = async (req, res) => {
  try {
    const { email, attendance, adults, kids, name } = req.body;

    // 1️⃣ Update RSVP record
    const updatedRSVP = await RSVP.findOneAndUpdate(
      { email },
      {
        $set: {
          attendance,
          adults: Number(adults || 0),
          kids: Number(kids || 0),
        },
      },
      { new: true }
    );

    if (!updatedRSVP) {
      return res.redirect(`/?msg=RSVP record not found 😕`);
    }

    // 2️⃣ Recalculate totals (same logic as createRSVP)
    const rsvps = await RSVP.find().lean();

    const totals = rsvps.reduce(
      (acc, rsvp) => {
        if (rsvp.attendance === "yes") {
          acc.totalAdults += Number(rsvp.adults || 0);
          acc.totalKids += Number(rsvp.kids || 0);
        }
        return acc;
      },
      { totalAdults: 0, totalKids: 0 }
    );

    // 3️⃣ Send updated confirmation email
    await sendRSVPConfirmation(
      email,
      name,
      totals.totalAdults,
      totals.totalKids,
      updatedRSVP.email,
      updatedRSVP.name
    );

    // 4️⃣ Redirect success
    return res.redirect(`/?msg=Your RSVP has been updated successfully 🎉`);
  } catch (err) {
    console.error(err);
    return res.redirect(`/?msg=Failed to update RSVP 😕`);
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
