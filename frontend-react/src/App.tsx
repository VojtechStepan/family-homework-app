import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreateUser } from "./components/CreateUser";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task, User } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Funkce pro načtení úkolů
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Chyba při načítání úkolů:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Chyba při načítání uživatelů:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Načtení úkolů při startu aplikace
    fetchUsers(); // Načtení všech uživatelů
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
      <CreateUser onUserAdded={fetchUsers} />
      <TaskForm onTaskAdded={fetchTasks} users={users} />
      <TaskList tasks={tasks} users={users} onDelete={handleDelete} />
    </div>
  );
};

export default App;
