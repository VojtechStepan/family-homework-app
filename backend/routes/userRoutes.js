const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Model User

// GET /api/users – vrátí seznam uživatelů
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("_id name");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání uživatelů" });
  }
});

// API pro registraci nového uživatele
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kontrolajestli už uživatel s tímto emailem neexistuje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Uživatel s tímto emailem již existuje" });
    }

    // Vytvoření nového uživatele
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ msg: "Uživatel vytvořen", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Chyba při registraci uživatele" });
  }
});

module.exports = router;
