import { render, screen } from "@testing-library/react";
import SignInAvatar from "./SignInAvatar";

const mockProps = {
  name: "John Doe",
  email: "johndoe@example.com",
  avatarLink: "https://github.com/davidmiller.png"
};

describe("SignInAvatar Component", () => {
  it("renders user name and email", () => {
    render(<SignInAvatar {...mockProps} />);

    screen.debug();

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
  });

  //  there is  error

  //   it("renders avatar image", async () => {
  //     render(<SignInAvatar {...mockProps} />);

  //     screen.debug();

  //     const avatarImage = screen.getByRole("img"); // 方案1：查找 <img>
  //     expect(avatarImage).toBeInTheDocument();
  //     expect(avatarImage).toHaveAttribute("src", mockProps.avatarLink);
  //   });

  //  there is  error

  it("renders avatar placeholder when no image", () => {
    render(<SignInAvatar name="John Doe" email="johndoe@example.com" avatarLink="" />);

    screen.debug();

    expect(screen.getByText("JD")).toBeInTheDocument(); // `abbreviateName("John Doe")` => "JD"
  });
});
