import React, { useState } from "react";
import axios from "axios";

interface TaskFormProps {
  onTaskAdded: () => void;
  users: any[];
}

const importanceLevels = [
  { value: "low", label: "Nízká" },
  { value: "medium", label: "Střední" },
  { value: "high", label: "Vysoká" },
];

const TaskForm: React.FC<TaskFormProps> = ({ users, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [importance, setImportance] = useState(importanceLevels[1].value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        assignedTo: assignedTo || undefined,
        importance,
      });

      // Reset formu
      setTitle("");
      setAssignedTo("");
      setImportance(importanceLevels[0].value);
      onTaskAdded();
    } catch (error) {
      console.error("Chyba při vytváření úkolu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vytvořit nový úkol</h2>
      <label>
        Název úkolu:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br />
      Priorita:
      <select
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
      >
        {importanceLevels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
      <br />
      <label>
        Přiřadit uživateli:
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Nevybráno</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Přidat úkol</button>
    </form>
  );
};

export default TaskForm;
