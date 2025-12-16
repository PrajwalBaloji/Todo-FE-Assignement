import React, { useContext } from "react";
import type { Task } from "../TaskCard";

export const VIEWS = {
  TODAY: "Today",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
} as const;

export type View = (typeof VIEWS)[keyof typeof VIEWS];

export interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  titleRef: React.RefObject<HTMLInputElement | null>;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  view: View;
  setView: (view: View) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const TaskContext = React.createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  titleRef: React.createRef<HTMLInputElement>(),
  selectedTask: null,
  setSelectedTask: () => {},
  view: VIEWS.TODAY,
  setView: () => {},
  search: "",
  setSearch: () => {},
});

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  const {
    tasks,
    setTasks,
    titleRef,
    selectedTask,
    setSelectedTask,
    view,
    setView,
    search,
    setSearch,
  } = context;

  const focusAddNewTask = () => {
    if (selectedTask) {
      setSelectedTask(null);
    }
    titleRef.current?.focus();
  };

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const updateTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const updateTaskStatus = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setSelectedTask(null);
  };

  const editTask = (task: Task | null) => {
    setSelectedTask(task);
    if (task) {
      titleRef.current?.focus();
    }
  };

  return {
    tasks,
    addTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
    titleRef,
    focusAddNewTask,
    selectedTask,
    editTask,
    view,
    setView,
    search,
    setSearch,
  };
}
