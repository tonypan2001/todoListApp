import type React from "react";
import Navbar from "../components/Navbar";

type Props = {
    children: React.ReactNode,
}

export default function MainLayout({children}: Props) {
    return(
        <div className="min-h-screen">
            <main className="max-w-5xl mx-auto px-4 py-6">
                <Navbar />
                {children}
            </main>
        </div>
    )
}