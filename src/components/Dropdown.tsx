import { useState, useRef, useEffect } from "react";
import type { DropdownProps } from "../types/dropdown.types";
import Button from "./Button";

export default function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: string) => {
        setSelected(item);
        setIsOpen(false);
        if (props.onSelect) props.onSelect(item);
    };

    return (
        <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <Button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50"
                label={selected || props.label}
            />

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 shadow-lg">
                    <ul className="py-1 text-sm text-gray-700">
                        {props.items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(item)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
