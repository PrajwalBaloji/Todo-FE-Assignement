import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { renderMainSectionWithContext } from "./testUtils/testrenderers";
import { renderDetailsSectionWithContext } from "./testUtils/testrenderers";
import { defaultTaskContext } from "./testUtils/defaultTaskContext";
import { testData } from "./testUtils/test-data";

describe("Intial page view", () => {
  describe("Sidebar content", () => {
    test("sidebar shows menu, search, and task views", () => {
      render(<App />);

      const sidebar = screen.getByRole("navigation", {
        name: /task views/i,
      });
      const withinSidebar = within(sidebar);
      expect(withinSidebar.getByText(/menu/i)).toBeInTheDocument();
      expect(
        withinSidebar.getByPlaceholderText(/search title/i)
      ).toBeInTheDocument();
      expect(withinSidebar.getByText(/today/i)).toBeInTheDocument();
      expect(withinSidebar.getByText(/upcoming/i)).toBeInTheDocument();
      expect(withinSidebar.getByText(/completed/i)).toBeInTheDocument();
    });
  });

  describe("Main section content", () => {
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
        tasks: testData,
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
        tasks: testData,
      });

      expect(screen.getByText(/team meeting/i)).toBeInTheDocument();
      expect(screen.getByText(/upcoming task/i)).toBeInTheDocument();
      expect(screen.getByText(/completed task/i)).toBeInTheDocument();
    });

    test("Upcoming view shows only upcoming tasks", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        view: "Upcoming",
        tasks: testData,
      });

      expect(screen.getByText(/upcoming task/i)).toBeInTheDocument();
      expect(screen.queryByText(/completed task/i)).not.toBeInTheDocument();
    });

    test("Completed view shows only completed tasks", () => {
      renderMainSectionWithContext({
        ...defaultTaskContext,
        view: "Completed",
        tasks: testData,
      });

      expect(screen.getByText(/completed task/i)).toBeInTheDocument();
      expect(screen.queryByText(/upcoming task/i)).not.toBeInTheDocument();
    });
  });
});
