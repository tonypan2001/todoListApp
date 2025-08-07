import type { ButtonProps } from "../types/button.types";

export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={`flex justify-content-between gap-2 items-center px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-2 focus:ring-[var(--secondary)] cursor-pointer ${props.className}`}
            type={props.type}
        >
            {props.icon}
            {props.label}
        </button>
    )
}