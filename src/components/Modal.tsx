import type { ModalProps } from "../types/modal.types";
import { FaXmark } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import Button from "./Button";
import Header from "./Header";
import Input from "./Input";
import Dropdown from "./Dropdown";

export default function Modal(props: ModalProps) {
    const handleSelect = (item: string) => {
        console.log("You selected:", item);
    };
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={props.onClose}
            ></div>


            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="relative bg-white p-6 w-full max-w-md shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <Header>Create Task</Header>
                        <Button
                            onClick={props.onClose}
                            icon={<FaXmark />}
                        >
                        </Button>
                    </div>

                    {props.children}

                </div>
            </div>
        </>
    )
}