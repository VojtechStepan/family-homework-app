const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Získání všech úkolů
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // 📌 Načítáme všechny úkoly
    res.json(tasks);
  } catch (error) {
    console.error("Chyba při načítání úkolů:", error);
    res.status(500).json({ msg: "Serverová chyba" });
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
