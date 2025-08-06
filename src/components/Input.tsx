import type { InputProps } from "../types/input.types";

export default function Input(props: InputProps) {
    return (
        <div className="w-full">
            {props.label && (
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    {props.label}
                </label>
            )}
            <input
                className={`${props.className} 
                w-full px-4 py-2 text-sm border outline-none transition
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${props.error ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={props.placeholder}
            />
            {props.error && <p className="mt-1 text-xs text-red-500">{props.error}</p>}
        </div>
    )
}