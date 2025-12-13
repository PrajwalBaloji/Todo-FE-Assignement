import { screen } from "@testing-library/react";
import { renderDetailsSectionWithContext } from "./testUtils/testrenderers";
import { defaultTaskContext } from "./testUtils/defaultTaskContext";
import userEvent from "@testing-library/user-event";

describe("Add task", () => {
  test("when no input, Clear button is not visible", () => {
    renderDetailsSectionWithContext(defaultTaskContext);

    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument();
  });

  test("when no input, Add Task button is disabled", () => {
    renderDetailsSectionWithContext(defaultTaskContext);

    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
  });

  test("Add Task button enables when user enters title", async () => {
    renderDetailsSectionWithContext(defaultTaskContext);

    await userEvent.type(
      screen.getByPlaceholderText(/enter task title/i),
      "My task"
    );

    expect(screen.getByRole("button", { name: /add task/i })).toBeEnabled();
  });
});
