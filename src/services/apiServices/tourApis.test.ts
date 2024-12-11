import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import axios from "axios";
import { tourType } from "@/types";
import { tourApis } from "@/services/apiServices";
import { API_ENDPOINTS } from "@/constants/apiConfig";

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
    (mockedAxios.create().post as Mock).mockResolvedValue(mockResponse);

    // Act
    const result = await tourApis.createTour(mockTourData);

    // Assert
    expect(mockedAxios.create().post).toHaveBeenCalledWith(API_ENDPOINTS.TOUR, mockTourData);
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
    (mockedAxios.create().get as Mock).mockResolvedValue(mockResponse);

    // Act
    const result = await tourApis.getTourById(mockId);

    // Assert
    expect(mockedAxios.create().get).toHaveBeenCalledWith(`${API_ENDPOINTS.TOUR}/${mockId}`);
    expect(result).toEqual(mockResponse);
  });
});
