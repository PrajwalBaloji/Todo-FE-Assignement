import { useTaskContext } from "../../Tasks/TaskContext";
import type { View } from "../../Tasks/TaskContext/useTaskContext";

export default function Sidebar() {
  const { search, setSearch } = useTaskContext();

  return (
    <nav
      aria-label="Task sections"
      className="h-full flex flex-col text-sm text-gray-500 bg-gray-100 rounded-2xl"
    >
      <div className="px-4 py-3 font-semibold text-gray-900 text-lg">Menu</div>
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
      <ul className="flex-1 px-2 space-y-1">
        <div className="px-3 py-1 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Tasks
        </div>
        <SidebarItem label="Today" />
        <SidebarItem label="Upcoming" />
        <SidebarItem label="Completed" />
      </ul>
      {/* <div className="mt-auto px-4 py-3 space-y-1 text-gray-600">
        <button className="block w-fit hover:text-gray-900 cursor-pointer">
          Settings
        </button>
        <button className="block w-fit hover:text-gray-900 cursor-pointer">
          Sign out
        </button>
      </div> */}
    </nav>
  );
}

function SidebarItem({ label }: { label: string }) {
  const { setView } = useTaskContext();
  return (
    <li>
      <button
        onClick={() => setView(label as View)}
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
