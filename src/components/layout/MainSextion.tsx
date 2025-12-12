import AddTaskCard from "../../Tasks/AddTask";
import TaskList from "../../Tasks/TaskList";

export default function MainSection() {
  return (
    <main className="p-4 overflow-y-auto flex justify-center">
      <div className="w-full max-w-2xl ">
        <h1 className="text-left text-4xl font-semibold mb-12">Today</h1>
        <AddTaskCard />
        <TaskList />
      </div>
    </main>
  );
}
