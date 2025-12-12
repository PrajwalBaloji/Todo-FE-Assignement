import clsx from "clsx";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { completed, title } = task;
  return (
    <button
      onClick={() => {}}
      className="
    w-full text-left p-4 border-t border-gray-200 bg-white 
    hover:bg-gray-50 transition flex flex-col gap-1
  "
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          readOnly
          className="h-4 w-4"
        />
        <span
          className={clsx(
            "font-medium",
            completed ? "line-through text-gray-400" : "text-gray-900"
          )}
        >
          {title}
        </span>
      </div>
    </button>
  );
}
