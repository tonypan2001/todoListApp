import type { ContainerProps } from "../types/container.types";

export default function Container(props: ContainerProps) {
    return(
        <div className={`flex justify-between items-center p-4 shadow-md rounded-xl bg-white dark:bg-[var(--primary-dark)] border border-gray-200 dark:border-[var(--primary-dark-hover)] ${props.className}`}>
            {props.children}
        </div>
    )
}