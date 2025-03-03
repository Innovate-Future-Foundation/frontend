import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("Footer Component", () => {
  it("renders Footer text correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
