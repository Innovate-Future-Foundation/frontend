import axios from "axios";
import { vi } from "vitest";

const mocks = {
  get: vi.fn(),
  post: vi.fn()
};

vi.mock("axios", async importActual => {
  const actual = await importActual<typeof import("axios")>();
  return {
    ...actual,
    create: vi.fn(() => ({
      get: mocks.get,
      post: mocks.post,
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() }
      }
    }))
  };
});

export const mockedAxios = vi.mocked(axios);
export { mocks }; // Exports the individual mocks for fine-grained testing
