export type ButtonProps = {
    label: string,
    onClick?: () => {}
    className?: string,
    type?: "button" | "submit" | "reset"
}