import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Breadcrumb from "./index";
import { useMatches } from "react-router-dom";

// Mock useMatches from react-router-dom
vi.mock("react-router-dom", () => ({
  useMatches: vi.fn()
}));

describe("Breadcrumb Component", () => {
  it("renders without crashing", () => {
    (useMatches as vi.Mock).mockReturnValue([]);
    render(<Breadcrumb />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders breadcrumbs based on matches", () => {
    (useMatches as vi.Mock).mockReturnValue([
      { handle: { breadcrumb: "Home" }, pathname: "/" },
      { handle: { breadcrumb: "Dashboard" }, pathname: "/dashboard" }
    ]);

    render(<Breadcrumb />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders correct links for breadcrumbs", () => {
    (useMatches as vi.Mock).mockReturnValue([
      { handle: { breadcrumb: "Home" }, pathname: "/" },
      { handle: { breadcrumb: "Profile" }, pathname: "/profile" }
    ]);

    render(<Breadcrumb />);

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Profile").closest("a")).toHaveAttribute("href", "/profile");
  });

  it("accepts custom class names", () => {
    (useMatches as vi.Mock).mockReturnValue([{ handle: { breadcrumb: "Settings" }, pathname: "/settings" }]);

    render(<Breadcrumb className="custom-class" />);

    //   const { container } = render(<Breadcrumb className="custom-class" />);
    //   expect(container.firstChild).toHaveClass("custom-class");

    const breadcrumbList = screen.getByRole("list");
    expect(breadcrumbList).toHaveClass("custom-class");
  });
});
