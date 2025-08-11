import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Button from "./Button";
import Header from "./Header";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
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
            icon={<FiMenu />}
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="py-3"
          />
        </div>
      </Container>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        {/* ปุ่มหรือเมนูใน sidebar */}
          <ThemeToggle />
      </Sidebar>
    </>
  );
}
