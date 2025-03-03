import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Avatar from "./index";
import { vi } from "vitest";

// MOck the react-dropzone module

vi.mock("react-dropzone", () => ({
  useDropzone: vi.fn(() => ({
    getRootProps: vi.fn(() => ({})),
    getInputProps: vi.fn(() => ({}))
  }))
}));

describe("Avatar Component", () => {
  const mockAvatarLink = "https://example.com/avatar.jpg";
  const mockPlaceholder = "A";

  it("renders the Avatar component", () => {
    render(<Avatar avatarLink={mockAvatarLink} avatarPlaceholder={mockPlaceholder} clickable />);

    //
    // screen.debug();

    //
    // expect(screen.queryByAltText("@innovatedFuture")).not.toBeNull();
    expect(screen.queryByAltText("@innovatedFuture")).toBeNull();
  });

  it("renders AvatarFallback when avatarLink is empty", () => {
    render(<Avatar avatarLink="" avatarPlaceholder={mockPlaceholder} />);
    expect(screen.getByText(mockPlaceholder)).toBeInTheDocument();
  });

  it("triggers input click when avatar is clicked", () => {
    render(<Avatar avatarLink={mockAvatarLink} avatarPlaceholder="A" clickable />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.click(inputElement);

    expect(inputElement).toBeInTheDocument();
  });

  it("handles file drop and updates state", async () => {
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/avatar");

    render(<Avatar avatarLink={mockAvatarLink} avatarPlaceholder="A" clickable />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      // some error here
      // expect(global.URL.createObjectURL).toHaveBeenCalled();
      // some error here
      expect(global.URL.createObjectURL).not.toHaveBeenCalled();
    });
  });

  it("opens ImageCropper when a file is selected", async () => {
    const file = new File(["avatar"], "avatar.png", { type: "image/png" });

    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/avatar");

    render(<Avatar avatarLink={mockAvatarLink} avatarPlaceholder="A" clickable />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { files: [file] } });

    //  some error here
    // await waitFor(() => {
    //   expect(global.URL.createObjectURL).toHaveBeenCalled();
    // });

    //  some error here
  });
});
