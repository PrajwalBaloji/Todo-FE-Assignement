import TaskDetails from "../../Tasks/TaskDetails/TaskDetails";

function DetailsSection() {
  return (
    <section className="h-full flex flex-col p-6 bg-gray-100 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Task</h2>
      <TaskDetails />
    </section>
  );
}

export default DetailsSection;
