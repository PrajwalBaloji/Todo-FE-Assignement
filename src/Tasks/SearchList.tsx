import { useTaskContext } from "./TaskContext";
import TaskCard from "./TaskCard";

export default function SearchList() {
  const { search, tasks } = useTaskContext();

  const filteredList = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className=" justify-items-start">
      {filteredList.map((t) => (
        <li key={t.id} className="w-full">
          <TaskCard task={t} searchText={search} />
        </li>
      ))}
    </ul>
  );
}
