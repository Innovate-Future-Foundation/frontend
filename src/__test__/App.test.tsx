import { describe, it } from "vitest";
import { render } from "@testing-library/react";
// To Test
import App from "../App";
import { MemoryRouter } from "react-router-dom";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    //act
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
  });
});
