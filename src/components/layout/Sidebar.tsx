import { useTaskContext } from "../../Tasks/TaskContext";
import { VIEWS, type View } from "../../Tasks/TaskContext/useTaskContext";

export default function Sidebar() {
  const { search, setSearch } = useTaskContext();

  return (
    <aside className="h-full flex flex-col text-sm text-gray-500 bg-gray-100 rounded-2xl">
      <h2 className="px-4 py-3 font-semibold text-gray-900 text-lg">Menu</h2>
      <div className="px-4 mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Title..."
          className="
            w-full px-3 py-2 text-sm border border-gray-300 
            rounded-md bg-white focus:outline-none
          "
        />
      </div>
      <nav aria-label="Task views">
        <h3 className="px-4 py-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Tasks
        </h3>
        <ul className="flex-1 px-3 space-y-1">
          {Object.values(VIEWS).map((view) => (
            <SidebarItem key={view} label={view} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SidebarItem({ label }: { label: View }) {
  const { setView } = useTaskContext();
  return (
    <li>
      <button
        onClick={() => setView(label)}
        className="
          w-full text-left px-3 py-2 rounded-md 
          hover:bg-gray-100 transition text-gray-700 cursor-pointer
        "
      >
        {label}
      </button>
    </li>
  );
}
