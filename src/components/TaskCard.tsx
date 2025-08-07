import { FaCheckCircle, FaRegCircle, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import type { TaskCardProps } from "../types/taskcard.types";
import { useState, useRef, useEffect } from "react";

export default function TaskCard(props: TaskCardProps) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`flex items-start justify-between p-4 border rounded-lg shadow-sm transition 
            ${props.isDone ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200 hover:shadow-md"}`}>

            {/* Left Section */}
            <div className="flex items-start gap-3 flex-1">
                <div className="text-green-500 mt-1">
                    {props.isDone ? <FaCheckCircle /> : <FaRegCircle />}
                </div>

                <div className="flex items-start gap-3">
                    <div className="text-2xl">{props.icon}</div>
                    <div className="text-start">
                        <h3 className={`text-lg font-semibold 
                            ${props.isDone ? "text-gray-500 line-through" : "text-gray-800"}`}>
                            {props.title}
                        </h3>
                        <p className={`text-sm 
                            ${props.isDone ? "text-gray-400 line-through" : "text-gray-600"}`}>
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Dropdown Menu */}
            <div className="relative ml-4" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Task Menu"
                >
                    <FaEllipsisV />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                            onClick={() => {
                                props.onToggleDone?.();
                                setDropdownOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 text-green-500"
                        >
                            {!props.isDone ? <FaCheckCircle /> : <FaRegCircle />}
                            {props.isDone ? "Mark as Undone" : "Mark as Done"}
                        </button>
                        <button
                            onClick={() => {
                                props.onEdit?.();
                                setDropdownOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 text-blue-500"
                        >
                            <FaEdit/>
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                props.onDelete?.();
                                setDropdownOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-md text-red-600 hover:bg-gray-100"
                        >
                            <FaTrash/>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
