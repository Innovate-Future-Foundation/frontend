import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileDialog from "./ProfileDialog";
import { Button } from "../ui/button";

describe("ProfileDialog Component", () => {
  it("opens and closes when clicking trigger button", async () => {
    render(
      <ProfileDialog>
        <Button>My Profile</Button>
      </ProfileDialog>
    );

    // 1️⃣ 点击打开对话框
    const openButton = screen.getByText("My Profile");
    fireEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close|×|close dialog/i });
    fireEvent.click(closeButton);

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
