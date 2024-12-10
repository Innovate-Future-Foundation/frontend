import { describe, it, expect, vi, Mock, beforeEach, afterEach } from "vitest";
import appRequest from "@/services/httpClient";
import axios from "axios";
const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn()
}));

vi.mock("axios", async importActual => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post
      }))
    }
  };

  return mockAxios;
});
const mockedAxios = vi.mocked(axios);

describe("appRequest tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should use the base URL", async () => {
    // Arrange
    (mockedAxios.create().get as Mock).mockResolvedValue({ status: 200, data: { isSuccess: true } });

    // Act
    const result = await appRequest.get("/test-endpoint");

    // Assert
    expect(mockedAxios.create().get).toHaveBeenCalledWith("/test-endpoint");
    expect(result.status).toBe(200);
    expect(result.data.isSuccess).toBe(true);
  });
});
