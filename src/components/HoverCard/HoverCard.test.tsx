import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HoverCard from "@/components/HoverCard";

describe("HoverCard Component", () => {
  it("renders children properly", () => {
    render(
      <HoverCard content={<p>Hovered Content</p>}>
        <button>Hover me</button>
      </HoverCard>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("displays content when hovered", async () => {
    render(
      <HoverCard content={<p>Hovered Content</p>}>
        <button>Hover me</button>
      </HoverCard>
    );

    expect(screen.queryByText("Hovered Content")).not.toBeInTheDocument();

    await userEvent.hover(screen.getByText("Hover me"));

    // expect(screen.getByText("Hovered Content")).toBeInTheDocument();
    await expect(screen.findByText("Hovered Content")).resolves.toBeInTheDocument();

    await userEvent.unhover(screen.getByText("Hover me"));

    // expect(screen.queryByText("Hovered Content")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Hovered Content")).not.toBeInTheDocument();
    });
  });
});
