import Button from "./Button";
import Header from "./Header";
import { FaCirclePlus } from "react-icons/fa6";

export default function Navbar() {
    return(
        <>
            <nav className="flex justify-between items=center p-4 text-white shadow-md">
                <div>
                    <Header />
                </div>
                <div>
                    <Button icon={<FaCirclePlus />} label="Create" type="button" />
                </div>
            </nav>
        </>
    )
}