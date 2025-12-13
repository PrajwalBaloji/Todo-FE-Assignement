import type { TaskContextType } from "../../Tasks/TaskContext/useTaskContext";

export const defaultTaskContext: TaskContextType = {
  view: "Today",
  search: "",
  tasks: [],
  setTasks: jest.fn(),
  titleRef: { current: null },
  selectedTask: null,
  setSelectedTask: jest.fn(),
  setView: jest.fn(),
  setSearch: jest.fn(),
};
