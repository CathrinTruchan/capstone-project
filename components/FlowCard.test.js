import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FlowCard from "./FlowCard";

describe("FlowCard", () => {
  it("renders two buttons, one of them with the text `to the flow`", () => {
    render(<FlowCard />);

    expect(screen.getAllByText("To the flow")).toHaveLength(1);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("does not render the buttons edit and delete", () => {
    render(<FlowCard />);
    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /edit/i })
    ).not.toBeInTheDocument();
  });

  it("renders delete and edit button after opening the edit menu", async () => {
    render(<FlowCard />);
    userEvent.click(screen.getByRole("button", { name: /openMenu/i }));
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /edit/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /delete/i })
      ).toBeInTheDocument();
    });
  });

  it("renders the name and duration of the flow", () => {
    render(<FlowCard name={"Power Yoga Flow"} hours={1} minutes={30} />);
    expect(screen.getByText("Power Yoga Flow")).toBeVisible();
    expect(screen.getByText("1h")).toBeVisible();
    expect(screen.getByText("30min")).toBeVisible();
  });
});
