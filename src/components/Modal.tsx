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

                    {/* Form */}
                    <form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 items-start">
                            <label>
                                Title
                            </label>
                            <Input placeholder="Enter title" />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <label>
                                Task description
                            </label>
                            <Input placeholder="Enter description" useTextArea={true} />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <label>
                                Task color
                            </label>
                            <Dropdown label="Choose a color" items={["Red", "Green", "Blue"]} onSelect={handleSelect}/>
                        </div>
                    </form>
                    <div className="flex items-center mt-4">
                        <Button type="button" icon={<IoIosCreate />} label="Create Task" className="w-full rounded-4xl text-xl"/>
                    </div>
                </div>
            </div>
        </>
    )
}