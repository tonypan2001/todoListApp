import Button from "./Button";
import Header from "./Header";

export default function Navbar() {
    return(
        <>
            <nav className="flex justify-between items=center px-6 py-4 text-white shadow-md">
                <div>
                    <Header />
                </div>
                <div>
                    <Button label="Sign In" type="button" />
                </div>
            </nav>
        </>
    )
}