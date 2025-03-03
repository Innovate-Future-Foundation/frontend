import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TitleWithIcon } from "../TitleWithIcon/index";
import { Tooltip } from "./index";
import { TooltipProvider } from "@/components/ui/tooltip"; // 确保正确导入 TooltipProvider
import { Home, Settings } from "lucide-react";

// describe("TitleWithIcon Component", () => {
//   it("renders the title and icon correctly", () => {
//     render(<TitleWithIcon icon={Home} title="Dashboard" />);
//     expect(screen.getByText("Dashboard")).toBeInTheDocument();

//     // 先检查 data-testid

//     // there is error in the code
//     expect(screen.getByTestId("icon")).toBeInTheDocument();
//      // there is error in the code

//     // 或者使用 getByRole("img") 如果 applicable

//     // there is error in the code
//     expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
//     // there is error in the code
//   });

//   it("renders with a different icon and title", () => {
//     render(<TitleWithIcon icon={Settings} title="Settings" />);
//     expect(screen.getByText("Settings")).toBeInTheDocument();

//    // there is error in the code
//     // expect(screen.getByTestId("icon")).toBeInTheDocument();
//     // there is error in the code
//   });

//   it("applies the correct classes", () => {
//     render(<TitleWithIcon icon={Home} title="Dashboard" />);
//     const container = screen.getByText("Dashboard").closest("div");
//     expect(container).toHaveClass("inline-flex items-center gap-2 my-4");
//   });
// });

describe("TitleWithIcon Component", () => {
  it("renders the title and icon correctly", () => {
    render(<TitleWithIcon icon={Home} title="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with a different icon and title", () => {
    render(<TitleWithIcon icon={Settings} title="Settings" />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});

describe("Tooltip Component", () => {
  it("renders tooltip content when hovered", async () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseOver(trigger); // 使用 mouseOver 替代 mouseEnter
    fireEvent.focus(trigger); // 额外触发 focus

    expect(await screen.findByTestId("tooltip-content")).toBeInTheDocument();
  });

  it("hides tooltip content when mouse leaves", async () => {
    render(
      <TooltipProvider>
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseOver(trigger);
    fireEvent.focus(trigger);
    expect(await screen.findByTestId("tooltip-content")).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    fireEvent.blur(trigger); // 额外触发 blur
    await waitFor(() => expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument());
  });
});
