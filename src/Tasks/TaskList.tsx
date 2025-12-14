import TaskCard from "./TaskCard";
import { useTaskContext } from "./TaskContext";
import ExmptyList from "./EmptyList";
import { useMemo } from "react";

export default function TaskList() {
  const { tasks, view } = useTaskContext();

  const filteredList = useMemo(() => {
    // console.log("memoisation called");

    let list = tasks;

    if (view === "Upcoming") {
      list = tasks.filter((t) => !t.completed);
    }
    if (view === "Completed") {
      list = tasks.filter((t) => t.completed);
    }

    return list;
  }, [tasks, view]);

  if (filteredList.length === 0) {
    return <ExmptyList />;
  }
  return (
    <ul data-testid="task-list" className=" justify-items-start">
      {filteredList.map((t) => (
        <li key={t.id} className="w-full">
          <TaskCard task={t} />
        </li>
      ))}
    </ul>
  );
}
