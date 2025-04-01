// Express je populární framework pro tvorbu backendových serverů v Node.js. Po jeho načtení lze vytvářet API, pracovat s routami, middlewarem atd.
const express = require("express");
// Knihovna k hashování hesel
const bcrypt = require("bcryptjs");
// Knihovna k vytváření a ověřování tokenů
const jwt = require("jsonwebtoken");
// Model uživatele
const User = require("../models/User");
// Router umožňuje rozdělit backendovou aplikaci na menší moduly, což zlepšuje čitelnost a udržitelnost kódu.
const router = express.Router();

// Registrace uživatele
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Uživatel již existuje" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Uživatel vytvořen" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Přihlášení uživatele
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Neplatný email nebo heslo" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Neplatný email nebo heslo" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
