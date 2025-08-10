import type { Task } from "../types/api/task.types";

const KEY = crypto.randomUUID();

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {
    /* no-op */
  }
}

// ใช้ครั้งแรก: ถ้าไม่มีข้อมูล ให้ seed เริ่มต้น
export function ensureSeed() {
  const existing = loadTasks();
  if (existing.length === 0) {
    const seed: Task[] = [
      {
        id: crypto.randomUUID(),
        title: "Buy groceries",
        description: "Milk, bread, cheese",
        color: "#00c868",
        deadline: "2025-08-15",
        done: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Finish project",
        description: "Todo list app with API",
        color: "#34b7ff",
        deadline: "2025-08-20",
        done: true,
      },
    ];
    saveTasks(seed);
  }
}
