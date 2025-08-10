import type { InputProps } from "../types/components/input.types";

export default function Input(props: InputProps) {
  return (
    <div className="w-full">
      {props.label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {props.label}
        </label>
      )}
      {!props.useTextArea && (
        <input
          className={`${props.className} 
                    w-full px-4 py-2 text-sm border-2 rounded-xl outline-none transition
                    focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] bg-[var(--primary-input-background-color)]
                    ${props.error ? "border-red-500" : "border-gray-300"}`}
          placeholder={props.placeholder}
        />
      )}
      {props.useTextArea && (
        <textarea
          className={`w-full px-4 py-2 text-sm border-2 rounded-xl outline-none transition
                    focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] bg-[var(--primary-input-background-color)]
                    ${props.error ? "border-red-500" : "border-gray-300"}`}
          placeholder={props.placeholder}
          rows={4}
        />
      )}
      {props.error && (
        <p className="mt-1 text-xs text-red-500">{props.error}</p>
      )}
    </div>
  );
}
