import { describe, it, expect } from "vitest";
import MockAdapter from "axios-mock-adapter";

import appRequest from "@/services/httpClient";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

describe("Axios Response Interceptor", () => {
  const mock = new MockAdapter(appRequest);

  it("should handle Network Error and throw NETWORK_ERROR message", async () => {
    mock.onGet("/test").networkError();
    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.NETWORK_ERROR);
  });

  it("should handle timeout error and throw TIMEOUT message", async () => {
    mock.onGet("/test").timeout();
    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.TIME_OUT);
  });

  it("should handle 401 error and throw UNAUTHORIZED message", async () => {
    mock.onGet("/test").reply(401);

    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.UNAUTHORIZED);
  });

  it("should handle 403 error and throw FORBIDDEN message", async () => {
    mock.onGet("/test").reply(403);

    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.FORBIDDEN);
  });

  it("should handle 409 error and throw CONFLICT message", async () => {
    mock.onGet("/test").reply(409);

    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.CONFLICT);
  });

  it("should handle unknown error and throw UNKNOWN message", async () => {
    mock.onGet("/test").reply(500);

    await expect(appRequest.get("/test")).rejects.toThrow(ERROR_MESSAGES.UNKNOWN);
  });
});
