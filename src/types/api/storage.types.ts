export type Task = {
  id: string;
  title: string;
  description: string;
  color: string;
  deadline: string; // ISO string: "2025-08-15"
  done: boolean;
};
