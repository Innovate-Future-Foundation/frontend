import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RemoveInviteeModal } from "./index";
import { MemoryRouter } from "react-router-dom";

const mockOnClose = vi.fn();
const mockOnConfirm = vi.fn();

const mockMember = {
  name: "John Doe",
  email: "johndoe@example.com",
  avatarLink: "https://example.com/avatar.jpg"
};

describe("RemoveInviteeModal Component", () => {
  it("renders correctly when open", () => {
    render(
      <MemoryRouter>
        <RemoveInviteeModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} member={mockMember} />
      </MemoryRouter>
    );

    expect(screen.getByText("Remove account")).toBeInTheDocument();
    expect(screen.getByText("The account and its associated API access tokens will be permanently removed.")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <RemoveInviteeModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} member={mockMember} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onConfirm when Remove button is clicked", () => {
    render(
      <MemoryRouter>
        <RemoveInviteeModal isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} member={mockMember} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it("does not render when isOpen is false", () => {
    render(
      <MemoryRouter>
        <RemoveInviteeModal isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} member={mockMember} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Remove account")).not.toBeInTheDocument();
  });
});
