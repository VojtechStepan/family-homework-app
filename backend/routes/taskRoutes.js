const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Získání všech úkolů pro přihlášeného uživatele
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
    const { title, completed, assignedTo } = req.body;

    const newTask = new Task({
      title,
      completed: completed || false,
      assignedTo, // `createdBy` úplně odstraníme
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;

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

// Označení úkolu jako hotového
router.put("/:id/complete", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Úkol nenalezen" });

    if (task.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ msg: "Nemáš oprávnění k úpravě tohoto úkolu" });
    }

    task.completed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Smazání úkolu
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Úkol nenalezen" });

    if (task.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ msg: "Nemáš oprávnění ke smazání tohoto úkolu" });
    }

    await task.remove();
    res.json({ msg: "Úkol smazán" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
