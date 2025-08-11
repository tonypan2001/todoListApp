// import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // เก็บ task ที่จะ edit
  const [search, setSearch] = useState("");

  // ฟอร์ม state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#ff7d34"); // ค่าเริ่มต้น
  const [deadline, setDeadline] = useState("");

  const { tasks, loading, error, addTask, patchTask, removeTask } = useTasks();

  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});

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
      setColor("#ff7d34");
      setDeadline("");
    }
  }, [editingTask, isModalOpen, setDeadline]);

  const { total, completed, remaining, percent } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const remaining = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, remaining, percent };
  }, [tasks]);

  // สร้างรายการที่ถูกกรองจาก search (กรองทั้ง title และ description)
  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }, [search, tasks]);

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

  if (loading) return <p>Loading tasks…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
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
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
                label={editingTask?.color || "Choose a color"}
                items={["#df2929", "#00a6ff", "#2acd01", "#ffb700"]}
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
              {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
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
          <div className="flex items-end justify-between w-full">
            <div className="flex flex-col justify-between items-start w-full">
              <h1>Search your tasks</h1>
              <Input 
              className="mt-2" 
              placeholder="Type something..." 
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>
            <div className="pl-2">
              <Button icon={<FaSearch />} label="Search" type="button"/>
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
                {/* <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--primary-success-color)] transition-all duration-300"
                        style={{ width: `${percent}%` }}
                    />
                </div> */}
            </div>
          </div>
        </div>

        {/* <div className="flex justify-content-between items-start w-full">
          <div className="flex gap-2">
            <Button label="Coding" />
            <Button label="Workout" />
            <Button label="Dinner" />
          </div>
        </div> */}

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
            {filteredTasks.length === 0 ? (
            <p className="text-gray-400">
              {search ? "No tasks match your search." : "You don't have any tasks yet"}
            </p>
          ) : (
            filteredTasks.map((t) => (
                <TaskCard
                key={t.id}
                title={t.title}
                date={t.deadline}
                description={t.description}
                color={t.color}
                icon="📝"
                isDone={t.done}
                onToggleDone={() => patchTask(t.id, { done: !t.done })}
                onEdit={() => {
                    handleOpenEdit(t);
                }}
                onDelete={() => removeTask(t.id)}
                />
            ))
          )}
        </div>
      </Container>
    </>
  );
}
