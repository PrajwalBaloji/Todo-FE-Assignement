import { render, screen, within } from "@testing-library/react";
import App from "../App";
import {
  TaskContext,
  type TaskContextType,
} from "../Tasks/TaskContext/useTaskContext";
import MainSection from "../components/layout/MainSextion";
import DetailsSection from "../components/layout/DetailsSection";

function renderMainSectionWithContext(value: TaskContextType) {
  return render(
    <TaskContext.Provider value={value}>
      <MainSection />
    </TaskContext.Provider>
  );
}

function renderDetailsSectionWithContext(value: TaskContextType) {
  return render(
    <TaskContext.Provider value={value}>
      <DetailsSection />
    </TaskContext.Provider>
  );
}

const defaultTaskContext: TaskContextType = {
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

describe("Intial page view", () => {
  describe("sidebar content", () => {
    test("sidebar shows menu, search, and task views", () => {
      render(<App />);

      const sidebar = screen.getByRole("navigation", {
        name: /task views/i,
      });
      const s = within(sidebar);
      expect(s.getByText(/menu/i)).toBeInTheDocument();
      expect(s.getByPlaceholderText(/search title/i)).toBeInTheDocument();
      expect(s.getByText(/today/i)).toBeInTheDocument();
      expect(s.getByText(/upcoming/i)).toBeInTheDocument();
      expect(s.getByText(/completed/i)).toBeInTheDocument();
    });
  });

  describe("main section content", () => {
    test("main section Display Initial heaeder and empty list", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        view: "Today",
      });

      expect(
        screen.getByRole("heading", { name: /today/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/add new task/i)).toBeInTheDocument();
      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });

    test("Displaying tasklist correctly when data available", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        tasks: [
          {
            id: "1",
            title: "Test task",
            completed: false,
            createdAt: Date.now(),
            description: "Test description",
          },
        ],
      });

      expect(screen.getByText(/test task/i)).toBeInTheDocument();
    });
  });

  describe("Details section content", () => {
    test("Details section Display Initial header and empty form", () => {
      renderDetailsSectionWithContext(defaultTaskContext);

      expect(
        screen.getByRole("heading", { name: /task/i })
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/enter task title/i)
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/enter task description/i)
      ).toBeInTheDocument();
    });
  });
});

describe("User interaction", () => {
  test("clicks add task focusses task title input", () => {
    render(<App />);

    const addTaskButton = screen.getByText(/add new task/i);
    addTaskButton.click();

    const titleInput = screen.getByPlaceholderText(/enter task title/i);
    expect(titleInput).toHaveFocus();
  });

  test("No search results found while searching", () => {
    renderMainSectionWithContext({
      ...defaultTaskContext,
      search: "meet",
    });

    expect(screen.getByText(/no search results found/i)).toBeInTheDocument();
  });

  test("Search by title filters task list", () => {
    renderMainSectionWithContext({
      ...defaultTaskContext,
      search: "meet",
      tasks: [
        {
          id: "1",
          title: "Team meeting",
          completed: false,
          createdAt: Date.now(),
          description: "Team meeting description",
        },
        {
          id: "2",
          title: "Buy groceries",
          completed: false,
          createdAt: Date.now(),
          description: "Buy groceries description",
        },
      ],
    });
    expect(
      screen.getByRole("button", { name: /team meeting/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /buy groceries/i })
    ).not.toBeInTheDocument();
  });
});
