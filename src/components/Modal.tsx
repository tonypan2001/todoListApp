import { FaXmark  } from "react-icons/fa6";
import Button from "./Button";
import Header from "./Header";

export default function Modal() {
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="fixed flex justify-center items-center z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white p-4 w-100">
                    <div className=" flex justify-between items-center">
                        <Header>Create Todo</Header>
                        <Button className="absolute top-0 right-0" icon={<FaXmark  />} type="button" />
                    </div>
                    <form>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" className="border border-gray-300 p-2" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}