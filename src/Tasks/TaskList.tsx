import TaskCard from "./TaskCard";
import { useTaskContext } from "./TaskContext";
import ExmptyList from "./EmptyList";

export default function TaskList() {
  const { tasks, view } = useTaskContext();
  let filteredList = tasks;

  if (view === "Upcoming") {
    filteredList = tasks.filter((t) => !t.completed);
  }
  if (view === "Completed") {
    filteredList = tasks.filter((t) => t.completed);
  }
  if (filteredList.length === 0) {
    return <ExmptyList />;
  }
  return (
    <ul className=" justify-items-start">
      {filteredList.map((t) => (
        <li key={t.id} className="w-full">
          <TaskCard task={t} />
        </li>
      ))}
    </ul>
  );
}
