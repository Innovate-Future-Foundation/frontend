import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ForgotPasswordForm from "./index";
import userEvent from "@testing-library/user-event";

// Mock onBackToLogin function
const mockOnBackToLogin = vi.fn();

describe("ForgotPasswordForm Component", () => {
  it("renders the component correctly", () => {
    render(<ForgotPasswordForm onBackToLogin={mockOnBackToLogin} />);

    expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/No worries, we'll send you reset instructions./i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument(); // 改成查找 placeholder
    expect(screen.getByRole("button", { name: /Reset password/i })).toBeInTheDocument();
  });

  it("validates email input", async () => {
    render(<ForgotPasswordForm onBackToLogin={mockOnBackToLogin} />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: /Reset password/i });

    // 输入无效 email
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);

    expect(await screen.findByText(/Invalid email format./i)).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    // 输入有效 email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@example.com");
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.queryByText(/Invalid email format./i)).not.toBeInTheDocument();
    });
  });

  it("submits the form successfully and shows success message", async () => {
    render(<ForgotPasswordForm onBackToLogin={mockOnBackToLogin} />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: /Reset password/i });

    await userEvent.type(emailInput, "test@example.com");
    fireEvent.click(submitButton);

    // 按钮应在请求处理中被禁用
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // 模拟 API 调用结束后的 UI 变化
    await waitFor(() => {
      expect(screen.getByText(/Reset Instructions Sent!/i)).toBeInTheDocument();
      expect(screen.getByText(/We've sent password reset instructions to your email./i)).toBeInTheDocument();
    });
  });

  it("calls onBackToLogin when back button is clicked", async () => {
    render(<ForgotPasswordForm onBackToLogin={mockOnBackToLogin} />);

    const backButton = screen.getByText(/Back to login/i);
    fireEvent.click(backButton);

    expect(mockOnBackToLogin).toHaveBeenCalledTimes(1);
  });
});
