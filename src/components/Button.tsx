import type { ButtonProps } from "../types/button.types";

export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={`flex justify-content-between gap-2 items-center px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer ${props.className}`}
            type={props.type}
        >
            {props.icon}
            {props.label}
        </button>
    )
}