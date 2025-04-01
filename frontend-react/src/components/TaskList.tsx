import React from "react";
import { Task } from "../types";
interface TaskListProps {
  tasks: Task[]; // Komponenta očekává prop tasks typu Task[]
  onDelete: (taskId: string) => void; // Callback funkce pro mazání
  users: any[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, users }) => {
  const getUserName = (userId: string | null) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "Nepřiřazeno"; // Defaultní hodnota
  };

  return (
    <div>
      <h2>Seznam úkolů</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
            <div>{task.importance}</div>
            <div>{getUserName(task.assignedTo || null)}</div>
            <button onClick={() => onDelete(task._id)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
