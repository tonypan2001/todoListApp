import type { HeaderProps } from "../types/header.types";

export default function Header(props: HeaderProps) {
    return <h1 className={`text-2xl font-bold text-black ${props.className}`}>{props.children}</h1>
}