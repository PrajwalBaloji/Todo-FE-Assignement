import React, { useEffect, useRef, useState } from "react";
import type { Task } from "../TaskCard";
import { TaskContext } from "./useTaskContext";

interface TaskProviderProps {
  children: React.ReactNode;
}

export default function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, titleRef, selectedTask, setSelectedTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
