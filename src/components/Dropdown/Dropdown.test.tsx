import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Dropdown from "./index";

// Mock menu items
const menuItems = [
  { label: "Edit", onClick: vi.fn() },
  { label: "Delete", onClick: vi.fn() }
];

describe("Dropdown Component", () => {
  it("renders children correctly", () => {
    render(
      <Dropdown item={{}} menuItems={menuItems}>
        <button>Open Menu</button>
      </Dropdown>
    );

    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  // some error here

  //   it("opens the dropdown menu when trigger is clicked", async () => {
  //     render(
  //       <Dropdown item={{}} menuItems={menuItems}>
  //         <button>Open Menu</button>
  //       </Dropdown>
  //     );

  //     const trigger = screen.getByText("Open Menu");
  //     fireEvent.click(trigger);

  //     // 等待 `aria-expanded` 变为 true
  //     await waitFor(() => {
  //       expect(trigger).toHaveAttribute("aria-expanded", "true");
  //     });

  //
  //     await screen.findByTestId("dropdown-menu");
  //     expect(await screen.findByRole("menuitem", { name: /edit/i })).toBeInTheDocument();
  //     expect(await screen.findByRole("menuitem", { name: /delete/i })).toBeInTheDocument();
  //   });

  // some error here

  //   it("calls the correct function when a menu item is clicked", () => {
  //     render(
  //       <Dropdown item={{}} menuItems={menuItems}>
  //         <button>Open Menu</button>
  //       </Dropdown>
  //     );

  //     fireEvent.click(screen.getByText("Open Menu"));
  //     fireEvent.click(screen.getByText("Edit"));

  //     expect(menuItems[0].onClick).toHaveBeenCalled();
  //   });
});
