import { render } from "@testing-library/react";
import {
  TaskContext,
  type TaskContextType,
} from "../../Tasks/TaskContext/useTaskContext";
import MainSection from "../../components/layout/MainSextion";
import DetailsSection from "../../components/layout/DetailsSection";

export function renderMainSectionWithContext(value: TaskContextType) {
  return render(
    <TaskContext.Provider value={value}>
      <MainSection />
    </TaskContext.Provider>
  );
}

export function renderDetailsSectionWithContext(value: TaskContextType) {
  return render(
    <TaskContext.Provider value={value}>
      <DetailsSection />
    </TaskContext.Provider>
  );
}
