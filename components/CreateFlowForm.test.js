import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateFlowForm from "./CreateFlowForm";

describe("CreateFlowForm", () => {
  it("should display three input fields and two buttons", () => {
    render(<CreateFlowForm />);
    expect(screen.getAllByRole("input")).toHaveLength(3);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should call the closeForm function when clicking on the cancel button", async () => {
    const cancelFunction = jest.fn();

    render(<CreateFlowForm closeForm={cancelFunction} />);
    expect(screen.getAllByRole("button", { name: /cancel/i })).toHaveLength(1);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);
    expect(cancelFunction).toHaveBeenCalledTimes(1);
  });

  it("adds a new text to text input", async () => {
    render(<CreateFlowForm />);
    const input = screen.getByLabelText("name");
    await userEvent.type(input, "My new Flow");
    expect(input).toHaveValue("My new Flow");
  });
});
