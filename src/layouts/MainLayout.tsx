import type React from "react";
import Navbar from "../components/Navbar";

type Props = {
    children: React.ReactNode,
}

export default function MainLayout({children}: Props) {
    return(
        <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}