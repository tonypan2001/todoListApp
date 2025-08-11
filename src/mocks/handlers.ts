import { http } from "msw";
import { ensureSeed, loadTasks, saveTasks } from "./storage";
import type { Task } from "../types/api/task.types";

ensureSeed();

export const handlers = [
  // GET /api/tasks
  http.get("/api/tasks", () => {
    const tasks = loadTasks();
    return Response.json(tasks);
  }),

  // POST /api/tasks
  http.post("/api/tasks", async ({ request }) => {
    const body = (await request.json()) as Omit<Task, "id">;
    const newTask: Task = { ...body, id: crypto.randomUUID() };
    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    return Response.json(newTask, { status: 201 });
  }),

  // PATCH /api/tasks/:id
  http.patch("/api/tasks/:id", async ({ params, request }) => {
    const { id } = params as { id: string };
    const patch = (await request.json()) as Partial<Task>;

    const tasks = loadTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1)
      return Response.json({ error: "Not found" }, { status: 404 });

    tasks[idx] = { ...tasks[idx], ...patch };
    saveTasks(tasks);
    return Response.json(tasks[idx]);
  }),

  // DELETE /api/tasks/:id
  http.delete("/api/tasks/:id", ({ params }) => {
    const { id } = params as { id: string };
    const tasks = loadTasks();
    const next = tasks.filter((t) => t.id !== id);
    saveTasks(next);
    return Response.json({ ok: true });
  }),
];
