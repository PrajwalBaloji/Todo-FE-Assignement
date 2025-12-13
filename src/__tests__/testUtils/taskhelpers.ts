import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type User = ReturnType<typeof userEvent.setup>;

export async function addTask(user: User, title: string) {
  await user.click(screen.getByRole("button", { name: /add new task/i }));
  await user.type(screen.getByPlaceholderText(/enter task title/i), title);
  await user.click(screen.getByRole("button", { name: /add task/i }));
}

export async function selectTask(user: User, title: string) {
  await user.click(
    screen.getByRole("button", { name: new RegExp(title, "i") })
  );
}
