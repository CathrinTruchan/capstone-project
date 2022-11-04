import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FlowCard from "./FlowCard";

describe("FlowCard", () => {
  it("renders three buttons, one of them with the text `to the flow`", () => {
    render(<FlowCard />);

    expect(screen.getAllByText("To the flow")).toHaveLength(1);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("renders the name and duration of the flow", () => {
    render(<FlowCard name={"Power Yoga Flow"} hours={1} minutes={30} />);
    expect(screen.getByText("Power Yoga Flow")).toBeVisible();
    expect(screen.getByText("1h 30min")).toBeVisible();
  });

  it("calls the delete function when clicking on the delete-button", async () => {
    const deleteFunction = jest.fn();
    render(
      <FlowCard
        name={"Power Yoga Flow"}
        hours={1}
        minutes={30}
        deleteFlow={deleteFunction}
      />
    );
    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(1);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(deleteFunction).toHaveBeenCalledTimes(1);
  });

  it("calls the edit function when clicking on the edit-button", async () => {
    const editFunction = jest.fn();
    render(
      <FlowCard
        name={"Power Yoga Flow"}
        hours={1}
        minutes={30}
        setEditFormId={editFunction}
      />
    );
    expect(screen.getAllByRole("button", { name: /edit/i })).toHaveLength(1);
    const editButton = screen.getByRole("button", { name: /edit/i });
    await userEvent.click(editButton);
    await userEvent.click(editButton);

    expect(editFunction).toHaveBeenCalledTimes(2);
  });
});
