import { FaSearch } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Home() {
    return (
        <>
            <div className="flex justify-between items-center p-4 mt-4 shadow-md">
                <div className="flex items-end">
                    <div className="flex flex-col justify-between items-start">
                        <h1>Search your tasks</h1>
                        <Input className="mt-2" placeholder="Type something..."/>
                    </div>
                    <div className="pl-2">
                        <Button icon={<FaSearch />} label="Search" />
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="w-[60px] h-[60px] flex items-center justify-center border-2 rounded-4xl shadow-lg">
                        <h1 className="font-bold">100%</h1>
                    </div>
                    <div className="flex flex-col items-start ms-3">
                        <p className="font-bold text-xl">Your have 1 task(s) to complete</p>
                        <p className="text-sm">No tasks completed yet. Keep going!</p>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}