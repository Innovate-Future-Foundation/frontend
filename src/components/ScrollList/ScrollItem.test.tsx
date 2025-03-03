import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ScrollList } from "./index";
import ScrollItem from "./ScrollItem";
import { MemoryRouter } from "react-router-dom";

const mockData = [
  { name: "Ray Clarke", email: "ray.c@acme.com", avatarLink: "https://github.com/rayclarke.png" },
  { name: "Emma Watson", email: "emma.w@acme.com", avatarLink: "https://github.com/emmawatson.png" },
  { name: "John Smith", email: "john.s@acme.com", avatarLink: "https://github.com/johnsmith.png" }
];

describe("ScrollList Component", () => {
  it("renders the component with the correct title", () => {
    render(
      <MemoryRouter>
        <ScrollList title="Member" />
      </MemoryRouter>
    );

    expect(screen.getByText("Member list")).toBeInTheDocument();
  });

  it("displays all list items correctly", () => {
    render(
      <MemoryRouter>
        <ScrollList title="Member" />
      </MemoryRouter>
    );

    mockData.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
    });
  });

  it("filters items based on search input", () => {
    render(
      <MemoryRouter>
        <ScrollList title="Member" />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search by name or email");
    fireEvent.change(searchInput, { target: { value: "Emma" } });

    expect(screen.getByText("Emma Watson")).toBeInTheDocument();
    expect(screen.queryByText("Ray Clarke")).not.toBeInTheDocument();
  });

  it("triggers add member button click", () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(
      <MemoryRouter>
        <ScrollList title="Member" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("add Member"));
    expect(consoleSpy).toHaveBeenCalledWith("Add member clicked");
  });
});

describe("ScrollItem Component", () => {
  it("renders member details correctly", () => {
    render(
      <MemoryRouter>
        <ScrollItem name="John Doe" email="john.doe@example.com" avatarLink="https://example.com/avatar.jpg" />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("opens and closes RemoveInviteeModal when delete button is clicked", () => {
    render(
      <MemoryRouter>
        <ScrollItem name="John Doe" email="john.doe@example.com" avatarLink="https://example.com/avatar.jpg" />
      </MemoryRouter>
    );

    // const deleteButton = screen.getByRole("button", { name: /delete/i });
    const deleteButton = screen.getByRole("button"); //
    fireEvent.click(deleteButton); //

    fireEvent.click(deleteButton);
    expect(screen.getByText("Remove account")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Remove account")).not.toBeInTheDocument();
  });
});
