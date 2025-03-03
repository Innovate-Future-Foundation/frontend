import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrganisationRegisterPage from "./index";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// Mock onBackToLogin function
const mockOnBackToLogin = vi.fn();

describe("OrganisationRegisterPage Component", () => {
  it("renders the component correctly", () => {
    render(
      <MemoryRouter>
        <OrganisationRegisterPage onBackToLogin={mockOnBackToLogin} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Let's start with your organisation's basic information/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter organisation name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter business email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue/i })).toBeInTheDocument();
  });

  it("validates required fields in step 1", async () => {
    render(
      <MemoryRouter>
        <OrganisationRegisterPage onBackToLogin={mockOnBackToLogin} />
      </MemoryRouter>
    );

    const continueButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(continueButton);

    expect(await screen.findByText(/Organisation name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it("navigates through steps and completes the form submission", async () => {
    render(
      <MemoryRouter>
        <OrganisationRegisterPage onBackToLogin={mockOnBackToLogin} />
      </MemoryRouter>
    );

    // **Step 1: Organisation Details**
    await userEvent.type(screen.getByPlaceholderText("Enter organisation name"), "My Organisation");
    await userEvent.type(screen.getByPlaceholderText("Enter business email"), "test@example.com");
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // **Step 2: Address Details**
    await waitFor(() => expect(screen.getByText(/Where is your organisation located?/i)).toBeInTheDocument());
    // await userEvent.type(screen.getByPlaceholderText("Enter street address"), "123 Main St");
    // await userEvent.type(screen.getByPlaceholderText("Enter suburb"), "Melbourne");
    // await userEvent.type(screen.getByPlaceholderText("Enter state"), "VIC");

    const streetInput = await screen.findByPlaceholderText("Enter street address");
    await userEvent.type(streetInput, "123 Main St");

    const suburbInput = await screen.findByPlaceholderText("Enter suburb");
    await userEvent.type(suburbInput, "Melbourne");

    const stateInput = await screen.findByPlaceholderText("Enter state");
    await userEvent.type(stateInput, "VIC");

    await userEvent.type(screen.getByPlaceholderText("Enter postcode"), "3000");
    await userEvent.type(screen.getByPlaceholderText("Enter country"), "Australia");
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // **Step 3: Online Presence**
    await waitFor(() => expect(screen.getByText(/Share your online presence with us/i)).toBeInTheDocument());
    const websiteInput = await screen.findByPlaceholderText("Enter website URL");
    await userEvent.type(websiteInput, "https://example.com");

    const logoInput = await screen.findByPlaceholderText("Enter logo URL");
    await userEvent.type(logoInput, "https://example.com/logo.png");
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // **Step 4: Admin Details**
    await waitFor(() => expect(screen.getByText(/Set up your admin account/i)).toBeInTheDocument());
    const adminNameInput = await screen.findByPlaceholderText("Enter admin name");
    await userEvent.type(adminNameInput, "Admin User");

    const adminEmailInput = await screen.findByPlaceholderText("Enter admin email");
    await userEvent.type(adminEmailInput, "admin@example.com");

    const passwordInput = await screen.findByPlaceholderText("Enter your password");
    await userEvent.type(passwordInput, "StrongP@ssword1!");
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // **Final Success Page**
    await waitFor(() => expect(screen.getByText(/Registration Complete!/i)).toBeInTheDocument());
  });

  it("calls onBackToLogin when back button is clicked", async () => {
    render(
      <MemoryRouter>
        <OrganisationRegisterPage onBackToLogin={mockOnBackToLogin} />
      </MemoryRouter>
    );

    const backButton = screen.getByText(/Back to Login/i);
    fireEvent.click(backButton);

    expect(mockOnBackToLogin).toHaveBeenCalledTimes(1);
  });
});
