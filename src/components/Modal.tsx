import type { ModalProps } from "../types/modal.types";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import Header from "./Header";

export default function Modal(props: ModalProps) {
    
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black opacity-70 z-40"
                onClick={props.onClose}
            ></div>


            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center mx-5">
                <div className="relative bg-[var(--primary-background)] p-6 w-full max-w-md shadow-xl rounded-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <Header>{props.label}</Header>
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