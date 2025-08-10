import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { DropdownProps } from "../types/components/dropdown.types";

export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    <div className="relative w-full" ref={dropdownRef}>
      {/* ปุ่มหลัก */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 border-2 border-gray-300 rounded-lg bg-[var(--primary-input-background-color)] text-sm text-[var(--primary-text-color)] shadow-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <span>{selected || props.label}</span>
        <FiChevronDown
          className={`ml-2 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* เมนู Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[var(--primary-input-background-color)] border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul className="py-1 text-sm text-[var(--primary-text-color)]">
            {props.items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="text-start px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
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
