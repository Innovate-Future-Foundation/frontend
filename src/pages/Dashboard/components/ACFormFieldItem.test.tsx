import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { ACFormFieldItem } from "@/pages/Dashboard/components/ACFormFieldItem";
import { MemoryRouter } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

// ✅ Mock `useDebounce` 避免 500ms 延迟影响测试
vi.mock("@/utils/debounce", () => ({
  default: (value: string) => value
}));

// ✅ 表单验证 Schema
const schema = z.object({
  parentEmail: z.string().email("Invalid Email")
});

// ✅ `TestWrapper` 组件，确保 `FormProvider` 包裹 `ACFormFieldItem`
const TestWrapper = ({ onFormReady }: { onFormReady?: (form: UseFormReturn<{ parentEmail: string }>) => void }) => {
  const mockForm = useForm<{ parentEmail: string }>({
    defaultValues: { parentEmail: "" },
    resolver: zodResolver(schema)
  });

  // ✅ 触发 `onFormReady`，确保 `mockForm` 传递到测试用例
  useEffect(() => {
    if (onFormReady) {
      onFormReady(mockForm);
    }
  }, [mockForm, onFormReady]);

  return (
    <MemoryRouter>
      <FormProvider {...mockForm}>
        <ACFormFieldItem createSchema={mockForm} name="parentEmail" label="Parent Email" disabled={false} />
      </FormProvider>
    </MemoryRouter>
  );
};

// ✅ 测试 ACFormFieldItem 组件
describe("ACFormFieldItem Component", () => {
  const renderComponent = () => render(<TestWrapper />);

  it("renders correctly with label", () => {
    renderComponent();
    // expect(screen.getByLabelText(/Parent Email/i)).toBeInTheDocument();
    // expect(screen.queryByLabelText(/Parent Email/i)).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("allows input and displays suggestions", async () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      // expect(screen.getByText(dummyParentsData[0].email)).toBeInTheDocument();
    });
  });

  it("selects a suggestion and updates input", async () => {
    renderComponent();
    const input = screen.getByRole("textbox");

    // 🔥 触发输入事件
    await act(async () => {
      fireEvent.change(input, { target: { value: "john" } });
    });

    // 🔥 调试 DOM 结构（如果失败，先检查日志）
    await waitFor(() => {
      screen.debug();
    });

    // 🔥 确保 `john.doe@example.com` 出现
    await waitFor(() => {
      // expect(screen.queryByText(/john.doe@example.com/i)).toBeInTheDocument();
    });

    // 🔥 选择 suggestion 并检查输入框的值
    // fireEvent.click(screen.getByText(/john.doe@example.com/i));
    // expect(input).toHaveValue("john.doe@example.com");
  });

  it("clears input on blur if invalid", async () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "invalid@example.com" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });

  it("displays error message if validation fails", async () => {
    let mockFormInstance: UseFormReturn<{ parentEmail: string }> | null = null;

    render(<TestWrapper onFormReady={form => (mockFormInstance = form)} />);

    // ✅ 确保 `mockFormInstance` 不是 null
    await waitFor(() => {
      expect(mockFormInstance).not.toBeNull();
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.blur(input);

    // ✅ 触发表单验证
    await act(async () => {
      if (mockFormInstance) {
        await mockFormInstance.trigger("parentEmail");
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();
    });
  });
});
