import clsx from "clsx";
import { useTaskContext } from "./TaskContext";
import { highlightText } from "../lib/textUtils";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

interface TaskCardProps {
  task: Task;
  searchText?: string;
}

export default function TaskCard({ task, searchText }: TaskCardProps) {
  const { completed, title } = task;
  const { updateTaskStatus, setSelectedTask, selectedTask } = useTaskContext();

  return (
    <button
      aria-label={title}
      onClick={() => {
        setSelectedTask(task);
      }}
      className={clsx(
        "w-full p-3  border-t border-gray-200 hover:bg-gray-50 transition flex items-center justify-between gap-3 cursor-pointer",
        selectedTask?.id === task.id && "bg-gray-100"
      )}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          className="h-4 w-4 accent-gray-600 border-gray-300"
          onChange={() => updateTaskStatus(task.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <span
          className={clsx(
            "font-medium text-sm",
            completed ? "line-through text-gray-400" : "text-gray-600"
          )}
        >
          {" "}
          {searchText ? highlightText(title, searchText) : title}
        </span>
      </div>
      <span className="text-gray-500 text-sm">&gt;</span>
    </button>
  );
}
