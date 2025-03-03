import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormFieldItem } from "./index";
import { useForm, FormProvider } from "react-hook-form";

const TestForm = ({ type = "text" }) => {
  const methods = useForm({ defaultValues: { testField: "" } });

  return (
    <FormProvider {...methods}>
      <FormFieldItem fieldControl={methods.control} name="testField" label="Test Label" type={type} />
    </FormProvider>
  );
};

describe("FormFieldItem Component", () => {
  it("renders label correctly", () => {
    render(<TestForm />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders input field and allows typing", () => {
    render(<TestForm />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
  });

  it("toggles password visibility when clicking the eye icon", async () => {
    render(<TestForm type="password" />);

    // 改用 `document.querySelector('input')` 选择输入框
    //     确保 input 和 button 组件都正确渲染，避免 null 相关错误。
    // 避免测试运行太快，而组件还未加载完毕导致的失败
    const input = await waitFor(() => document.querySelector("input"));
    expect(input).not.toBeNull(); // 确保 input 存在
    expect(input).toHaveAttribute("type", "password");

    // 通过 `getByRole("button")` 查找密码切换按钮
    const toggleButton = await waitFor(() => screen.getByRole("button"));

    // 点击按钮切换到 text
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    // 再次点击切换回 password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });
});
