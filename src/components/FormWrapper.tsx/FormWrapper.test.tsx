import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormWrapper from "./index";
import { vi } from "vitest";

describe("FormWrapper Component", () => {
  const onSaveMock = vi.fn();

  it("renders the form title correctly", () => {
    render(<FormWrapper formTitle="Test Form Title">{<div>Child Content</div>}</FormWrapper>);
    expect(screen.getByText("Test Form Title")).toBeInTheDocument();
  });

  it("renders children inside the form", () => {
    render(<FormWrapper formTitle="Test Form Title">{<div data-testid="child-content">Child Content</div>}</FormWrapper>);
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("disables the save button when disabled is true", () => {
    render(<FormWrapper formTitle="Test Form Title" onSave={onSaveMock} disabled={true} />);
    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toBeDisabled();
  });

  it("calls onSave when save button is clicked", () => {
    render(<FormWrapper formTitle="Test Form Title" onSave={onSaveMock} disabled={false} />);
    const button = screen.getByRole("button", { name: /save/i });
    fireEvent.click(button);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it("displays loading state when isPending is true", async () => {
    render(<FormWrapper formTitle="Test Form Title" onSave={onSaveMock} isPending={true} disabled={false} />);
    await waitFor(() => expect(screen.queryByText(/saving/i)).toBeInTheDocument());
  });

  it("shows success message when isSuccess is true", async () => {
    render(<FormWrapper formTitle="Test Form Title" onSave={onSaveMock} isSuccess={true} disabled={false} />);
    await waitFor(() => expect(screen.getByText("Saved")).toBeInTheDocument());
  });

  it("shows error message when isError is true", async () => {
    render(<FormWrapper formTitle="Test Form Title" onSave={onSaveMock} isError={true} disabled={false} />);
    await waitFor(() => expect(screen.getByText("Not Saved")).toBeInTheDocument());
  });
});
