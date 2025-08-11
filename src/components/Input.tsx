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
                    ${props.error ? "border-[var(--primary-error-color)]" : "border-[var(--primary-border-color)]"}`}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
      )}
      {props.useTextArea && (
        <textarea
          className={`w-full px-4 py-2 text-sm border-2 rounded-xl outline-none transition
                    focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] bg-[var(--primary-input-background-color)]
                    ${props.error ? "border-[var(--primary-error-color)]" : "border-[var(--primary-border-color)]"}`}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          rows={4}
        />
      )}
      {props.error && (
        <p className="mt-1 text-xs text-[var(--primary-error-color)]">{props.error}</p>
      )}
    </div>
  );
}
