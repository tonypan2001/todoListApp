import { useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCalendarCheck, FaUserCircle } from "react-icons/fa";
import Button from "./Button";
import Header from "./Header";
import Modal from "./Modal";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          </form>
          <div className="flex items-center mt-4">
            <Button
              type="submit"
              icon={<IoIosCreate />}
              label="Create Task"
              className="w-full rounded-4xl text-xl"
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
          <p className="text-sm font-light italic">
            Don't forget to do your tasks.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            icon={<FaCirclePlus />}
            label="Create"
            type="button"
            onClick={() => setIsModalOpen(true)}
          />
          {/* <div className="w-px h-6 bg-[var(--primary-text-color)]" /> */}
          {/* <Button
            icon={<FaUserCircle />}
            label="Account"
            type="button"
          /> */}
          <div className="w-px h-6 bg-[var(--primary-text-color)]" />
          <ThemeToggle />
        </div>
      </Container>
    </>
  );
}
