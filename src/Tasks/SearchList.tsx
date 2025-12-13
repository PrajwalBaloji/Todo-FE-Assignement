import { useTaskContext } from "./TaskContext";
import TaskCard from "./TaskCard";
import ExmptyList from "./EmptyList";

export default function SearchList() {
  const { search, tasks } = useTaskContext();

  const filteredList = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredList.length === 0) {
    return <ExmptyList message="No search results found" />;
  }

  return (
    <ul data-testid="search-list" className=" justify-items-start">
      {filteredList.map((t) => (
        <li key={t.id} className="w-full">
          <TaskCard task={t} searchText={search} />
        </li>
      ))}
    </ul>
  );
}
