import React from "react";

// Definice typu pro úkol
interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

// Definujeme prop pro komponentu TaskList
interface TaskListProps {
  tasks: Task[]; // Komponenta očekává prop tasks typu Task[]
  onDelete: (taskId: string) => void; // Callback funkce pro mazání
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
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
            <button onClick={() => onDelete(task._id)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
