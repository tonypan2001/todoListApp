// import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import TaskCard from "../components/TaskCard";
import Container from "../components/Container";
import { useTasks } from "../hooks/useTask";
import { useState } from "react";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import DatePicker from "../components/DatePicker";
import { IoIosCreate } from "react-icons/io";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deadline, setDeadline] = useState("");

  const { tasks, loading, error, patchTask, removeTask } = useTasks();

  if (loading) return <p>Loading tasks…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  return (
    <>
      {isModalOpen && (
        <Modal label="Create Task" onClose={() => setIsModalOpen(false)}>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-start">
              <label>Title</label>
              <Input placeholder="Enter title" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Task description</label>
              <Input placeholder="Enter description" useTextArea={true} />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Task color</label>
              <Dropdown
                label="Choose a color"
                items={["Red", "Green", "Blue"]}
                // onSelect={handleSelect}
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label>Deadline</label>
              <DatePicker
                value={deadline}
                onChange={(date: string) => setDeadline(date)}
                allowPast={false} // ไม่ให้เลือกวันในอดีต
              />
            </div>
          </form>
          <div className="flex items-center mt-4">
            <Button
              type="submit"
              icon={<IoIosCreate />}
              label="Create Task"
              className="w-full text-2xl"
            />
          </div>
        </Modal>
      )}
      <Container className="relative flex-col items-start mt-4 gap-3">
        <div className="flex flex-col justify-between w-full gap-4">
          <div className="flex items-end justify-between w-full">
            <div className="flex flex-col justify-between items-start w-full">
              <h1>Search your tasks</h1>
              <Input className="mt-2" placeholder="Type something..." />
            </div>
            <div className="pl-2">
              <Button icon={<FaSearch />} label="Search" />
            </div>
          </div>

          <div className="flex justify-start items-center w-full mt-2">
            <div className="w-[60px] h-[60px] flex items-center justify-center border-2 border-[var(--primary-success-color)] rounded-4xl shadow-lg">
              <h1 className="font-bold text-[var(--primary-success-color)]">
                100%
              </h1>
            </div>
            <div className="flex flex-col ms-3">
              <p className="font-bold text-start text-sm md:text-xl">
                Your have 1 task(s) to complete
              </p>
              <p className="text-sm text-start">
                No tasks completed yet. Keep going!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-content-between items-start w-full">
          <div className="flex gap-2">
            <Button label="Coding" />
            <Button label="Workout" />
            <Button label="Dinner" />
          </div>
        </div>

        {!isModalOpen && (
          <div className="fixed right-6 bottom-10 shadow-xl rounded-full z-50">
            <Button
              // label="Create Task"
              onClick={() => setIsModalOpen(true)}
              icon={<FaPlus />}
              className="!rounded-full !p-6 text-2xl"
            />
          </div>
        )}

        {/*Tasks*/}
        <div className="flex flex-col w-full min-h-120 py-4 gap-3">
          {/* <h1 className="text-gray-400">You don't have any tasks yet</h1> */}
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              title={t.title}
              date={t.deadline}
              description={t.description}
              icon="📝"
              isDone={t.done}
              onToggleDone={() => patchTask(t.id, { done: !t.done })}
              onEdit={() => {
                /* เปิด modal แล้วเรียก patchTask หลัง submit */
              }}
              onDelete={() => removeTask(t.id)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
