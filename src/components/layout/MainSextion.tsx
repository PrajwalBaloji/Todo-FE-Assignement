import { Activity } from "react";
import TaskList from "../../Tasks/TaskList";
import { useTaskContext } from "../../Tasks/TaskContext";
import SearchList from "../../Tasks/SearchList";
import AddNewTaskCard from "../../Tasks/AddNewTask";

export default function MainSection() {
  const { view, search } = useTaskContext();
  const isSearch = search.length > 2;
  return (
    <main className="p-4 overflow-y-auto flex justify-center">
      <div className="w-full max-w-2xl ">
        <h1 className="text-left text-4xl font-semibold mb-12">
          {isSearch ? "Search" : view}
        </h1>
        <AddNewTaskCard />
        <Activity mode={isSearch ? "hidden" : "visible"}>
          <TaskList />
        </Activity>

        {isSearch && <SearchList />}
      </div>
    </main>
  );
}
