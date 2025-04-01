const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Získání úkolů s možností filtrace podle assignedTo
router.get("/", async (req, res) => {
  try {
    const { assignedTo } = req.query; // Příjem parametru pro uživatele

    let query = {};

    if (assignedTo) {
      if (assignedTo === "unassigned") {
        query.assignedTo = null;
      } else {
        query.assignedTo = new mongoose.Types.ObjectId(assignedTo);
      }
    }

    // Načítání úkolů z databáze s možným filtrováním
    const tasks = await Task.find(query).populate("assignedTo", "name"); // Populace pro získání jména uživatele
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Chyba při načítání úkolů", error: error.message });
  }
});

// Vytvoření úkolu
router.post("/", async (req, res) => {
  try {
    const { title, completed, importance, assignedTo } = req.body;

    const newTask = new Task({
      title,
      completed: completed || false,
      importance: importance || "low",
      assignedTo,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Mazání úkolu
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ error: "Úkol nenalezen" });
    }

    res.json({ message: "Úkol byl úspěšně smazán" });
  } catch (error) {
    res.status(500).json({ error: "Chyba při mazání úkolu" });
  }
});

module.exports = router;
