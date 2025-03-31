import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Definice typu pro úkoly
interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Funkce pro načtení úkolů
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Chyba při načítání úkolů:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Načtení úkolů při startu aplikace
  }, []);

  // Funkce pro mazání úkolu
  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Chyba při mazání úkolu:", error);
    }
  };

  return (
    <div>
      <h1>Rodinná aplikace pro úkoly</h1>
      <TaskForm onTaskAdded={fetchTasks} /> {/* Formulář pro přidání úkolu */}
      <TaskList tasks={tasks} onDelete={handleDelete} /> {/* Seznam úkolů */}
    </div>
  );
};

export default App;
