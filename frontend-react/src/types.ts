export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  importance: string;
  assignedTo?: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: boolean;
  password: string;
}
