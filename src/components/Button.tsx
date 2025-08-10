import type { ButtonProps } from "../types/components/button.types";

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`
                button flex justify-content-between gap-2 items-center px-4 py-2 rounded-xl cursor-pointer ${props.className}`}
      type={props.type}
    >
      {props.icon}
      {props.label}
    </button>
  );
}
