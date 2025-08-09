import type { ContainerProps } from "../types/container.types";

export default function Container(props: ContainerProps) {
    return(
        <div className={`flex justify-between items-center p-4 shadow-md rounded-xl bg-[var(--secondary-background)] border-2 border-[var(--primary-border-color)] ${props.className}`}>
            {props.children}
        </div>
    )
}