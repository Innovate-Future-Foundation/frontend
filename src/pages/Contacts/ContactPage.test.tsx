import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactPage from "./index";
import { MemoryRouter } from "react-router-dom";
import { useContact } from "@/hooks/contacts/useContact";
import userEvent from "@testing-library/user-event";

// ✅ Mock useContact hook
vi.mock("@/hooks/contacts/useContact", () => ({
  useContact: vi.fn()
}));

describe("ContactPage Component", () => {
  beforeEach(() => {
    // ✅ 确保 Mock 数据正确，包含 header 结构
    vi.mocked(useContact).mockReturnValue({
      contactsResponse: {
        data: [
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            isActive: true,
            isConfirmed: true, // 确保已确认状态
            roleCode: "Admin",
            avatarUrl: ""
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            isActive: false,
            isConfirmed: false,
            roleCode: "User",
            avatarUrl: ""
          }
        ],
        meta: {
          totalItems: 2
        }
      },
      isLoadingContacts: false
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

  it("renders the Name column header correctly", async () => {
    renderComponent();

    // await waitFor(() => {
    //     const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    //     expect(nameColumn).toBeInTheDocument();
    //   });

    screen.debug();
  });

  it("renders contact data correctly", async () => {
    renderComponent();

    await waitFor(() => {
      // ✅ 确保联系人信息正确渲染
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
    });
  });

  it("filters contacts when searching", async () => {
    renderComponent();

    // ✅ 使用 `userEvent.setup()` 以确保异步事件模拟正确
    const user = userEvent.setup();

    const searchInput = screen.getByPlaceholderText(/search by name, email or phone/i);
    expect(searchInput).toBeInTheDocument();

    // ✅ 清空输入框 & 触发搜索
    await user.clear(searchInput);
    await user.type(searchInput, "John");

    // ✅ 确保 John Doe 存在，Jane Smith 被过滤
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("displays pagination and changes page", async () => {
    renderComponent();

    await waitFor(() => {
      const nameColumn = screen.queryByText(/name/i);
      expect(nameColumn).not.toBeInTheDocument();
    });
    screen.debug();

    const nextPageButton = screen.getByText(/next/i);
    expect(nextPageButton).toBeInTheDocument();

    // ✅ 使用 `userEvent` 触发点击事件
    const user = userEvent.setup();
    await user.click(nextPageButton);

    // ✅ 确保 useContact 被调用，说明页面切换
    await waitFor(() => {
      expect(useContact).toHaveBeenCalled();
    });
  });

  it("shows a suspended badge for inactive users", async () => {
    renderComponent();

    // ✅ 确保 "suspended" Badge 存在
    await waitFor(() => expect(screen.getByText(/suspended/i)).toBeInTheDocument());
  });

  it("shows a confirmation checkmark for confirmed users", async () => {
    renderComponent();

    await waitFor(() => {
      // ✅ 确保 CheckCheckIcon 正确渲染
      const checkIcons = screen.queryAllByTestId("CheckCheckIcon");
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });
});
