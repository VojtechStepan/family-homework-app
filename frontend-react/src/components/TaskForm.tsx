import React, { useState, useEffect } from "react";
import axios from "axios";

interface TaskFormProps {
  onTaskAdded: () => void;
}

interface User {
  _id: string;
  name: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Stáhneme seznam uživatelů

  // Načtení uživatelů při načtení komponenty
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Chyba při načítání uživatelů:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        assignedTo: assignedTo || undefined, // Přidáme vybraného uživatele
      });

      setTitle("");
      setAssignedTo("");
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
      <label>
        Přiřadit uživateli:
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Vyberte uživatele</option>
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
