import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LevelFilter from "./LevelFilter";

describe("LevelFilter", () => {
  it("renders four radio buttons", () => {
    render(<LevelFilter />);

    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("when clicking on the radio button beginner, it should be checked", async () => {
    const setFilterQuery = jest.fn();
    render(<LevelFilter setFilterQuery={setFilterQuery} />);
    const radioButtonBeginner = screen.getByRole("radio", {
      name: /beginner/i,
    });
    const radioButtonAll = screen.getByRole("radio", { name: /all/i });
    await userEvent.click(radioButtonBeginner);
    expect(radioButtonBeginner).toBeChecked();
    expect(radioButtonAll).not.toBeChecked();
  });
});
