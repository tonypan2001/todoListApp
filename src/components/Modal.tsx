import Header from "./Header";

export default function Modal() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <Header>Create Todo</Header>
            </div>
        </div>
    )
}