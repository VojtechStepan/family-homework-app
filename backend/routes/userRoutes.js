// Předpokládejme, že máme model User pro MongoDB
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Model User

// GET /api/users – vrátí seznam uživatelů
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("_id name"); // Vrátí _id a name
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání uživatelů" });
  }
});

module.exports = router;
