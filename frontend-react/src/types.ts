export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  importance: string;
  assignedTo?: { _id: string; name: string };
}

export interface User {
  _id: string;
  name: string;
  email: boolean;
  password: string;
}
