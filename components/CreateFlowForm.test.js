import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateFlowForm from "./CreateFlowForm";

describe("CreateFlowForm", () => {
  it("should display three input fields", () => {
    render(<CreateFlowForm />);
    expect(screen.getAllByRole("input")).toHaveLength(3);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  /*  it("the handelSubmit function should be called by clicking on the save button", async () => {
    const handleSubmit = jest.fn();

    render(<CreateFlowForm addFlow={handleSubmit} />);
    expect(screen.getAllByRole("button", { name: /save/i })).toHaveLength(1);
    const saveButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButton);
    expect(handleSubmit).toHaveBeenCalled();
  }); */

  it("the closeForm function should be called by clicking on the cancel button", async () => {
    const cancelFunction = jest.fn();

    render(<CreateFlowForm closeForm={cancelFunction} />);
    expect(screen.getAllByRole("button", { name: /cancel/i })).toHaveLength(1);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);
    expect(cancelFunction).toHaveBeenCalledTimes(1);
  });

  it("adds a new text to textinput", async () => {
    render(<CreateFlowForm />);
    const input = screen.getAllByRole("input");
    await userEvent.type(input[0], "My new Flow");
    expect(input[0]).toHaveValue("My new Flow");
  });
});
