"use client";
import { useState } from "react";
import type { DatePickerProps } from "../types/components/datepicker.types";

export default function DatePicker(props: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(props.value || "");

  // วันที่ปัจจุบันใน format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={handleChange}
      min={props.allowPast ? undefined : today} // ถ้าไม่ให้เลือกอดีต จะ set min เป็นวันนี้
      className={`${props.className} 
        w-full px-4 py-2 text-sm border-2 rounded-xl outline-none transition
        focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] bg-[var(--primary-input-background-color)]
        ${props.error ? "border-red-500" : "border-gray-300"}`}
    />
  );
}
