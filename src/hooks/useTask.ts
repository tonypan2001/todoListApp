import { useEffect, useState } from "react";
import type { Task } from "../types/api/task.types";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksApi";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load tasks");
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Load error");
    } finally {
      setLoading(false);
    }
  };


  // load ครั้งแรก
  useEffect(() => {
    refetch();
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // actions
  const addTask = async (payload: Omit<Task, "id">) => {
    const newOne = await createTask(payload);
    setTasks((prev) => [newOne, ...prev]);
  };

  const patchTask = async (id: string, patch: Partial<Task>) => {
    const updated = await updateTask(id, patch);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, addTask, patchTask, removeTask, refetch };
}
