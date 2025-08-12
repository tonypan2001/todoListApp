// import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaList,
  FaPlus,
  FaRegCircle,
} from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import TaskCard from "../components/TaskCard";
import Container from "../components/Container";
import { useTasks } from "../hooks/useTask";
import React, { useEffect, useState, useMemo } from "react";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import DatePicker from "../components/DatePicker";
import { IoIosCreate } from "react-icons/io";
import type { Task } from "../types/api/task.types";
import SkeletonLoading from "../components/SkeletonLoading";
import ErrorState from "../components/ErrorState";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // เก็บ task ที่จะ edit
  const [search, setSearch] = useState("");

  const root = getComputedStyle(document.documentElement);
  const defaultColor = root.getPropertyValue("--primary-color").trim();
  // desc = ล่าสุดก่อน, asc = เก่าสุดก่อน
  const [dateOrder, setDateOrder] = useState<"desc" | "asc">("desc");
  const [completionFilter, setCompletionFilter] = useState<
    "all" | "done" | "undone"
  >("all");

  // ฟอร์ม state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(defaultColor); // ค่าเริ่มต้น
  const [deadline, setDeadline] = useState("");

  const { tasks, loading, error, addTask, patchTask, removeTask, refetch } = useTasks();

  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>(
    {}
  );

  // เมื่อเปิดแก้ไข ให้ prefill ฟอร์ม
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDesc(editingTask.description);
      setColor(editingTask.color);
      setDeadline(editingTask.deadline ?? "");
    } else {
      // สร้าง: เคลียร์ฟอร์ม
      setTitle("");
      setDesc("");
      setColor(defaultColor);
      setDeadline("");
    }
  }, [editingTask, isModalOpen, setDeadline, defaultColor]);

  const { total, completed, remaining, percent } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const remaining = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, remaining, percent };
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    const q = search.trim().toLowerCase();

    // 1) กรองจากคำค้น
    let list = q
      ? tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        )
      : tasks;

    // 2) กรองตามสถานะ
    if (completionFilter === "done") {
      list = list.filter((t) => t.done);
    } else if (completionFilter === "undone") {
      list = list.filter((t) => !t.done);
    }

    // 3) เรียงตามวันที่
    const toTime = (d?: string) => (d ? new Date(d).getTime() : 0);
    const sorted = [...list].sort((a, b) => {
      const ta = toTime(a.deadline);
      const tb = toTime(b.deadline);
      return dateOrder === "desc" ? tb - ta : ta - tb;
    });

    return sorted;
  }, [tasks, search, completionFilter, dateOrder]);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setDeadline(task.deadline || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; deadline?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a title";
    }
    if (!deadline) {
      newErrors.deadline = "Please select a deadline";
    }

    setErrors(newErrors);

    // ถ้ามี error จะไม่ทำต่อ
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editingTask) {
        // แก้ไข
        await patchTask(editingTask.id, {
          title,
          description: desc,
          color,
          deadline,
        });
      } else {
        // สร้างใหม่
        await addTask({
          title,
          description: desc,
          color,
          deadline,
          done: false,
        });
      }
      closeModal();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      alert(message);
    }
  };

  if (loading) {
    return (
      <Container className="relative flex-col items-start mt-4 gap-3">
        <h1 className="text-lg font-semibold mb-2">Loading tasks…</h1>
        <SkeletonLoading />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="relative flex-col items-start mt-4 gap-3">
        <ErrorState message={error} onRetry={refetch} />
      </Container>
    );
  }
  return (
    <>
      {isModalOpen && (
        <Modal
          label={editingTask ? "Edit Task" : "Create Task"}
          onClose={closeModal}
        >
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 items-start">
              <label>Title</label>
              <Input
                placeholder="Enter title"
                defaultValue={editingTask?.title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Task description</label>
              <Input
                placeholder="Enter description"
                useTextArea={true}
                defaultValue={editingTask?.description || ""}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Task color</label>
              <Dropdown
                label={editingTask?.color || "Select a color"}
                items={["#e64747", "#00a6ff", "#2acd01", "#ffb700"]}
                onSelect={(val) => setColor(val)}
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Deadline</label>
              <DatePicker
                value={deadline}
                onChange={(date: string) => setDeadline(date)}
                allowPast={false} // ไม่ให้เลือกวันในอดีต
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">{errors.deadline}</p>
              )}
            </div>
            <div className="flex items-center mt-4">
              <Button
                type="submit"
                icon={<IoIosCreate />}
                label={editingTask ? "Save Changes" : "Create Task"}
                className="w-full text-2xl"
              />
            </div>
          </form>
        </Modal>
      )}
      <Container className="relative flex-col items-start mt-4 gap-3">
        <div className="flex flex-col justify-between w-full gap-4">
          <div className="flex flex-col items-start justify-between w-full gap-2">
            <div className="flex flex-col justify-between items-start w-full">
              <h1>Search your tasks</h1>
              <Input
                className="mt-2"
                placeholder="Type something..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 py-1">
              <Button
                icon={<FaCalendarAlt />}
                type="button"
                label={
                  dateOrder === "desc" ? "Latest → Oldest" : "Oldest → Latest"
                }
                onClick={() =>
                  setDateOrder((prev) => (prev === "desc" ? "asc" : "desc"))
                }
                className="whitespace-nowrap"
              />

              <div className="w-[1px] h-8 bg-[var(--primary-border-color)] hidden md:block"></div>

              <div className="flex items-center rounded-xl overflow-hidden gap-2">
                <Button
                  type="button"
                  onClick={() => setCompletionFilter("all")}
                  icon={<FaList />}
                  label="All"
                  className={`${
                    completionFilter === "all"
                      ? "bg-[var(--primary-color)] border-2 border-[var(--secondary-color)]"
                      : "bg-[var(--primary-background)] text-[var(--primary-text-color)] hover:bg-gray-100"
                  }`}
                />

                <Button
                  type="button"
                  onClick={() => setCompletionFilter("done")}
                  aria-pressed={completionFilter === "done"}
                  icon={<FaCheckCircle />}
                  label="Done"
                  className={`${
                    completionFilter === "done"
                      ? "bg-[var(--primary-color)] border-2 border-[var(--secondary-color)]"
                      : "bg-[var(--primary-background)] text-[var(--primary-text-color)] hover:bg-gray-100"
                  }`}
                />

                <Button
                  type="button"
                  onClick={() => setCompletionFilter("undone")}
                  aria-pressed={completionFilter === "undone"}
                  icon={<FaRegCircle />}
                  label="Undone"
                  className={`${
                    completionFilter === "undone"
                      ? "bg-[var(--primary-color)] border-2 border-[var(--secondary-color)]"
                      : "bg-[var(--primary-background)] text-[var(--primary-text-color)] hover:bg-gray-100"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center w-full mt-2">
            <div className="w-[60px] h-[60px] flex items-center justify-center border-2 border-[var(--primary-success-color)] rounded-4xl shadow-lg">
              <h1 className="font-bold text-[var(--primary-success-color)]">
                {percent}%
              </h1>
            </div>
            <div className="flex flex-col ms-3">
              <p className="font-bold text-start text-sm md:text-xl">
                You have {remaining} task(s) to complete
              </p>
              <p className="text-sm text-start">
                {completed === 0
                  ? "No tasks completed yet. Keep going!"
                  : `${completed}/${total} completed`}
              </p>
            </div>
          </div>
        </div>

        {!isModalOpen && (
          <div className="fixed right-6 bottom-10 shadow-xl rounded-full z-50">
            <Button
              label="Create Task"
              onClick={() => handleOpenCreate()}
              icon={<FaPlus />}
              className="!rounded-full !p-6 text-lg"
            />
          </div>
        )}

        {/*Tasks*/}
        <div className="flex flex-col w-full min-h-120 py-4 gap-3">
          {filteredAndSortedTasks.length === 0 ? (
            <p className="text-gray-400">
              {search
                ? "No tasks match your search."
                : "You don't have any tasks yet"}
            </p>
          ) : (
            filteredAndSortedTasks.map((t) => (
              <TaskCard
                key={t.id}
                title={t.title}
                date={t.deadline}
                color={t.color}
                description={t.description}
                icon="📝"
                isDone={t.done}
                onToggleDone={() => patchTask(t.id, { done: !t.done })}
                onEdit={() => handleOpenEdit(t)}
                onDelete={() => removeTask(t.id)}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
}
