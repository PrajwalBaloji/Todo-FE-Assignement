import AddTaskCard from "../../AddTask";
import type { Task } from "../../Task";
import TaskCard from "../../Task";

interface MainSectionProps {
  tasks: Task[];
}

const data = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    completed: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    completed: false,
    createdAt: new Date(),
  },
];

export default function MainSection({ tasks = [] }: MainSectionProps) {
  tasks = data;
  return (
    <main className="p-4 overflow-y-auto flex justify-center">
      <div className="w-full max-w-2xl ">
        <h1 className="text-left text-4xl font-semibold mb-12">Today</h1>
        <AddTaskCard onClick={() => {}} />
        <ul className=" justify-items-start">
          {tasks.map((t) => (
            <li key={t.id} className="w-full">
              <TaskCard task={t} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
