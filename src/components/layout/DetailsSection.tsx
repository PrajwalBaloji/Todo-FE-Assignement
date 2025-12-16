import { useRef } from "react";
import TaskDetails from "../../Tasks/TaskDetails/TaskDetails";

function DetailsSection() {
  const detailsSectionRef = useRef<HTMLElement>(null);
  return (
    <aside
      ref={detailsSectionRef}
      className="h-full flex flex-col p-6 bg-gray-100 rounded-2xl"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Task</h2>
      <TaskDetails detailsSectionRef={detailsSectionRef} />
    </aside>
  );
}

export default DetailsSection;
