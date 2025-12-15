import { useTaskContext } from "./TaskContext";

export default function AddNewTaskCard() {
  const { focusAddNewTask } = useTaskContext();
  return (
    <button
      onClick={focusAddNewTask}
      className="
        w-full p-4 bg-gray-100  border-t border-gray-200
        hover:bg-gray-50 transition flex items-center gap-3 cursor-pointer
      "
    >
      <div
        className="
        h-7 w-7 flex items-center justify-center 
        rounded-md bg-gray-100 text-gray-600
      "
      >
        +
      </div>

      <span className="text-gray-700 font-medium">Add new task</span>
    </button>
  );
}
