import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import Button from "./Button";
import Header from "./Header";
import Modal from "./Modal";

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return(
        <>
            {isModalOpen && <Modal />}
            <nav className="flex justify-between items-center p-4 text-white shadow-md">
                <div className="flex flex-col items-start">
                    <Header className="flex flex-row justify-between items-center gap-2">
                        <FaCalendarCheck className="text-green-600"/>
                        TodoList
                    </Header>
                    <p className="text-sm text-black font-light italic">Don't forget to do your tasks.</p>
                </div>
                <div className="flex items-center">
                    <Button icon={<FaCirclePlus />} label="Create" type="button" onClick={() => setIsModalOpen(true)}/>
                </div>
            </nav>
        </>
    )
}