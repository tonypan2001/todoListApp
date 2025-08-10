import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import TaskCard from "../components/TaskCard";
import Container from "../components/Container";

export default function Home() {
    const [isDone, setIsDone] = useState(false);
    return (
        <>
            <Container className="relative flex-col items-start mt-4 gap-3">
                <div className="flex flex-col justify-between w-full gap-4">
                    <div className="flex items-end justify-between w-full">
                        <div className="flex flex-col justify-between items-start w-full">
                            <h1>Search your tasks</h1>
                            <Input className="mt-2" placeholder="Type something..." />
                        </div>
                        <div className="pl-2">
                            <Button icon={<FaSearch />} label="Search" />
                        </div>
                    </div>

                    {/* <div className="w-px h-14 bg-gray-300" /> */}

                    <div className="flex justify-start items-center w-full mt-2">
                        <div className="w-[60px] h-[60px] flex items-center justify-center border-2 border-[var(--primary-success-color)] rounded-4xl shadow-lg">
                            <h1 className="font-bold text-[var(--primary-success-color)]">100%</h1>
                        </div>
                        <div className="flex flex-col ms-3">
                            <p className="font-bold text-start text-sm md:text-xl">Your have 1 task(s) to complete</p>
                            <p className="text-sm text-start">No tasks completed yet. Keep going!</p>
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="flex items-start">
                    <div className="flex gap-2">
                        <Button label="Coding" />
                        <Button label="Workout" />
                        <Button label="Dinner" />
                    </div>
                </div>

                {/*Tasks*/}
                <div className="flex flex-col w-full min-h-120 py-4 gap-3">
                    {/* <h1 className="text-gray-400">You don't have any tasks yet</h1> */}
                    <TaskCard
                        title="Finish Landing Page"
                        description="Complete the header and responsive layout"
                        date="10/10/2025"
                        icon="🚀"
                        isDone={isDone}
                        onToggleDone={() => setIsDone(prev => !prev)}
                        onEdit={() => console.log("Edit task")}
                        onDelete={() => console.log("Delete task")}
                    />
                    <TaskCard
                        title="Finish Landing Page"
                        description="Complete the header and responsive layout"
                        date="10/10/2025"
                        icon="🚀"
                        isDone={isDone}
                        onToggleDone={() => setIsDone(prev => !prev)}
                        onEdit={() => console.log("Edit task")}
                        onDelete={() => console.log("Delete task")}
                    />
                    <TaskCard
                        title="Finish Landing Page"
                        description="Complete the header and responsive layout"
                        date="10/10/2025"
                        icon="🚀"
                        isDone={isDone}
                        onToggleDone={() => setIsDone(prev => !prev)}
                        onEdit={() => console.log("Edit task")}
                        onDelete={() => console.log("Delete task")}
                    />
                    <TaskCard
                        title="Finish Landing Page"
                        description="Complete the header and responsive layout"
                        date="10/10/2025"
                        icon="🚀"
                        isDone={isDone}
                        onToggleDone={() => setIsDone(prev => !prev)}
                        onEdit={() => console.log("Edit task")}
                        onDelete={() => console.log("Delete task")}
                    />
                    <TaskCard
                        title="Finish Landing Page"
                        description="Complete the header and responsive layout"
                        date="10/10/2025"
                        icon="🚀"
                        isDone={isDone}
                        onToggleDone={() => setIsDone(prev => !prev)}
                        onEdit={() => console.log("Edit task")}
                        onDelete={() => console.log("Delete task")}
                    />
                </div>
                {/* <div className="fixed right-6 bottom-6 shadow-xl rounded-full flex md:hidden">
                    <Button 
                        label="Create Task"
                        icon={<FaPlus />}
                        className="rounded-full !p-4" 
                    />
                </div> */}
            </Container>
        </>
    )
}