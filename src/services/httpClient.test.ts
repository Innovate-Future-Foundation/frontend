import { describe, it, expect, vi, Mock, beforeEach, afterEach } from "vitest";
import axios from "axios";
import appRequest from "@/services/httpClient";

vi.mock("axios", () => {
  const mockAxios = vi.fn();

  Object.assign(mockAxios, {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
    create: vi.fn().mockReturnThis(),
    interceptors: {
      request: {
        use: vi.fn(),
        eject: vi.fn()
      },
      response: {
        use: vi.fn(),
        eject: vi.fn()
      }
    }
  });

  return {
    default: mockAxios
  };
});

const mockedAxios = vi.mocked(axios);

describe("appRequest tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should use the base URL and GET method by default", async () => {
    // Arrange
    (mockedAxios as Mock).mockResolvedValue({ status: 200, data: { isSuccess: true } });

    // Act
    const result = await appRequest({ url: "/test-endpoint" });

    // Assert
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test-endpoint"
      })
    );
    expect(result.status).toBe(200);
    expect(result.data.isSuccess).toBe(true);
  });
});
