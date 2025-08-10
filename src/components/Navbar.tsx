import { useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCalendarCheck, FaPlus } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Button from "./Button";
import Header from "./Header";
import Modal from "./Modal";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import Sidebar from "./Sidebar";
import DatePicker from "./DatePicker";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deadline, setDeadline] = useState("");

  const handleSelect = (item: string) => {
    console.log("You selected:", item);
  };
  return (
    <>
      {/*Modal Form*/}
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
                onSelect={handleSelect}
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

      <Container>
        <div className="flex flex-col items-start">
          <Header className="flex flex-row justify-between items-center gap-2">
            <FaCalendarCheck className="text-[var(--primary-color)]" />
            TodoList
          </Header>
          <p className="text-xs md:text-sm font-light italic">
            Don't forget to do your tasks.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            icon={<FaCirclePlus />}
            label="Create Task"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex"
          />
          <div className="w-px h-6 bg-[var(--primary-text-color)] hidden md:flex" />
          <Button
            icon={<FiMenu />}
            // label="Settings"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="py-3"
          />
        </div>
      </Container>

      {!isModalOpen && (
        <div className="fixed right-6 bottom-6 shadow-xl rounded-full flex md:hidden z-50">
            <Button 
                // label="Create Task"
                onClick={() => setIsModalOpen(true)}
                icon={<FaPlus />}
                className="!rounded-full !p-6 text-2xl" 
            />
        </div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        {/* ปุ่มหรือเมนูใน sidebar */}
          <ThemeToggle />
      </Sidebar>
    </>
  );
}
