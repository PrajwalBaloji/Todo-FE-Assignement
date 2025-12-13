import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { addTask, selectTask } from "./testUtils/taskhelpers";

describe("App functional features", () => {
  test("user can add a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "My task");

    expect(
      screen.getByRole("button", { name: /my task/i })
    ).toBeInTheDocument();
  });

  test("user can edit an existing task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Initial task");
    await selectTask(user, "Initial task");
    const titleInput = screen.getByPlaceholderText(/enter task title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated task");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      screen.getByRole("button", { name: /updated task/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /initial task/i })
    ).not.toBeInTheDocument();
  });

  test("user can delete a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Task to delete");
    await selectTask(user, "Task to delete");

    const detailsSection = screen
      .getByRole("heading", { name: /task/i })
      .closest("section")!;
    await user.click(
      within(detailsSection).getByRole("button", { name: /delete/i })
    );

    expect(
      screen.queryByRole("button", { name: /task to delete/i })
    ).not.toBeInTheDocument();
  });

  test("user can mark task as done and undone", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Mark as done");

    const taskButton = screen.getByRole("button", { name: /mark as done/i });
    const checkbox = within(taskButton).getByRole("checkbox");
    const titleText = within(taskButton).getByText(/mark as done/i);

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(titleText).toHaveClass("line-through");

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(titleText).not.toHaveClass("line-through");
  });
});
