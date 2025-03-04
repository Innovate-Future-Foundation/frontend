import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    //act
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homeNavElement = screen
      .getAllByText(/Unlock international learning experiences through AI-driven education, global study tours, and mentorship./i)
      .find(element => element.tagName === "P");
    //assert
    expect(homeNavElement).toBeInTheDocument();
  });
});
