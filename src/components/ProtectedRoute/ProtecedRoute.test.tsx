import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

// Mock useAuth hook
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn()
}));

describe("ProtectedRoute Component", () => {
  it("renders children when user has an allowed role", () => {
    (useAuth as jest.Mock).mockReturnValue({ role: "admin" });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={["admin", "editor"]}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /dashboard when user does not have an allowed role", () => {
    (useAuth as jest.Mock).mockReturnValue({ role: "user" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <div>Protected</div>
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<div>Redirected to Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Redirected to Dashboard")).toBeInTheDocument();
  });

  it("redirects when allowedRoles is empty", () => {
    (useAuth as jest.Mock).mockReturnValue({ role: "admin" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute allowedRoles={[]}>
                <div>Protected</div>
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<div>Redirected to Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Redirected to Dashboard")).toBeInTheDocument();
  });
});
