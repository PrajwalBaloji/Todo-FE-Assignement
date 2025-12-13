import type { Task } from "../../Tasks/TaskCard";

export const testData: Task[] = [
  {
    id: "1",
    title: "Team meeting",
    description: "Team meeting description",
    completed: false,
    createdAt: 1,
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Buy groceries description",
    completed: false,
    createdAt: 2,
  },
  {
    id: "3",
    title: "Upcoming task",
    completed: false,
    createdAt: 3,
    description: "",
  },
  {
    id: "4",
    title: "Completed task",
    completed: true,
    createdAt: 4,
    description: "",
  },
];
