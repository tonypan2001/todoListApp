import type { ModalProps } from "../types/modal.types";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import Header from "./Header";
import Input from "./Input";

export default function Modal(props: ModalProps) {
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
                        <Header>Create Todo</Header>
                        <Button
                            onClick={props.onClose}
                            icon={<FaXmark/>}
                        >
                        </Button>
                    </div>

                    {/* Form */}
                    <form>
                        <div className="flex flex-col gap-2 items-start">
                            <label htmlFor="title" className="font-medium">
                                Title
                            </label>
                            <Input placeholder="Enter title task"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}