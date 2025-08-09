import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import type { SidebarProps } from "../types/sidebar.types";
import Header from "./Header";
import { FaCalendarCheck } from "react-icons/fa6";

export default function Sidebar(props: SidebarProps) {
    // ปิด sidebar เมื่อกด ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") props.onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [props.onClose]);

    return (
        <>
            {/* Overlay ด้านหลัง */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${props.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={props.onClose}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-100 bg-[var(--primary-background)] text-[var(--primary-text-color)] shadow-lg z-50 transform transition-transform duration-300 ${props.isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--secondary-border-color)]">
                    {/* <span className="text-lg font-bold">🚀 MyLogo</span> */}
                    <Header className="flex flex-row justify-between items-center gap-2">
                        <FaCalendarCheck className="text-[var(--primary-color)]" />
                        TodoList
                    </Header>
                    <button onClick={props.onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-4">
                    {props.children}
                </div>
            </div>
        </>
    );
}