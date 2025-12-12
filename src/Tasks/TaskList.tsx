import TaskCard from "./TaskCard";
import { useTaskContext } from "./TaskContext";
import ExmptyList from "./EmptyList";

export default function TaskList() {
  const { tasks } = useTaskContext();
  if (tasks.length === 0) {
    return <ExmptyList />;
  }
  return (
    <ul className=" justify-items-start">
      {tasks.map((t) => (
        <li key={t.id} className="w-full">
          <TaskCard task={t} />
        </li>
      ))}
    </ul>
  );
}
