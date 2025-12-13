import { render, screen, within } from "@testing-library/react";
import App from "../App";
import {
  TaskContext,
  type TaskContextType,
} from "../Tasks/TaskContext/useTaskContext";
import MainSection from "../components/layout/MainSextion";
import DetailsSection from "../components/layout/DetailsSection";
import userEvent from "@testing-library/user-event";

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
  test("clicking Add Task focuses title input", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /add new task/i }));
    expect(screen.getByPlaceholderText(/enter task title/i)).toHaveFocus();
  });

  test("Tasklist displayed after adding a task", () => {
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

  describe("User search", () => {
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

  describe("user can change views from sidebar", () => {
    test("use can change views", async () => {
      render(<App />);
      const user = userEvent.setup();

      expect(
        screen.getByRole("heading", { name: /today/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: /upcoming/i }));
      expect(
        screen.getByRole("heading", { name: /upcoming/i })
      ).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /completed/i }));
      expect(
        screen.getByRole("heading", { name: /completed/i })
      ).toBeInTheDocument();
    });
  });

  describe("Views are reflected correctly in the list", () => {
    test("Today View are reflected correctly in the list", () => {
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

    test("Upcoming view shows only upcoming tasks", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        view: "Upcoming",
        tasks: [
          {
            id: "1",
            title: "Upcoming task",
            completed: false,
            createdAt: Date.now(),
            description: "",
          },
          {
            id: "2",
            title: "Completed task",
            completed: true,
            createdAt: Date.now(),
            description: "",
          },
        ],
      });

      expect(screen.getByText(/upcoming task/i)).toBeInTheDocument();
      expect(screen.queryByText(/completed task/i)).not.toBeInTheDocument();
    });

    test("Completed view shows only completed tasks", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        view: "Completed",
        tasks: [
          {
            id: "1",
            title: "Done task",
            completed: true,
            createdAt: Date.now(),
            description: "",
          },
          {
            id: "2",
            title: "Active task",
            completed: false,
            createdAt: Date.now(),
            description: "",
          },
        ],
      });

      expect(screen.getByText(/done task/i)).toBeInTheDocument();
      expect(screen.queryByText(/active task/i)).not.toBeInTheDocument();
    });
  });
});
