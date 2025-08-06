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
            </div>
        </>
    )
}