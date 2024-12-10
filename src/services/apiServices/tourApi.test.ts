import { tourType } from "@/types";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { tourApis } from "./tourApi";
import { API_ENDPOINTS } from "@/constants/apiConfig";

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

  it("should call request with correct parameters when creating a tour", async () => {
    // Arrange
    const mockTourData: tourType = {
      tourName: "Adventure Tour",
      tourGuide: "John Doe",
      tourDuration: "5 days"
    };

    const mockResponse = { status: 200, data: { isSuccess: true } };
    mockedAxios.mockResolvedValue(mockResponse);

    // Act
    const result = await tourApis.createTour(mockTourData);

    // Assert
    expect(mockedAxios).toHaveBeenCalledWith({
      url: API_ENDPOINTS.TOUR,
      method: "POST",
      data: mockTourData
    });
    expect(result).toEqual(mockResponse);
  });

  it("should call request with correct parameters when getting a tour by ID", async () => {
    // Arrange
    const mockId = "123";
    const mockResponse = {
      tourName: "Adventure Tour",
      tourGuide: "John Doe",
      tourDuration: "5 days"
    };

    mockedAxios.mockResolvedValueOnce(mockResponse);

    // Act
    const result = await tourApis.getTourById(mockId);

    // Assert
    expect(mockedAxios).toHaveBeenCalledWith({
      url: `${API_ENDPOINTS.TOUR}/${mockId}`
    });
    expect(result).toEqual(mockResponse);
  });
});
