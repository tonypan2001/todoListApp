import type { ButtonProps } from "../types/button.types";

export default function Button (props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
            {props.label}
        </button>
    )
}