import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./useStore";

describe("useStore", () => {
  // Reset store state before each test
  beforeEach(() => {
    useStore.setState({
      data: null,
      isLoading: false,
      error: null
    });
  });

  it("should have correct initial state", () => {
    const state = useStore.getState();
    expect(state.data).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should update data correctly", () => {
    const testData = {
      title: "Test Title",
      body: "Test Body"
    };

    useStore.getState().setData(testData);

    const state = useStore.getState();
    expect(state.data).toEqual(testData);
  });

  it("should update loading state", () => {
    useStore.getState().setLoading(true);
    expect(useStore.getState().isLoading).toBe(true);

    useStore.getState().setLoading(false);
    expect(useStore.getState().isLoading).toBe(false);
  });

  it("should handle error state", () => {
    const testError = new Error("Test error");

    useStore.getState().setError(testError);

    const state = useStore.getState();
    expect(state.error).toBe(testError);
  });

  it("should handle complete data flow", () => {
    const store = useStore.getState();
    const testData = { title: "Test", body: "Content" };

    // Simulate loading process
    store.setLoading(true);
    expect(useStore.getState().isLoading).toBe(true);
    expect(useStore.getState().data).toBeNull();

    // Simulate data load completion
    store.setData(testData);
    store.setLoading(false);

    const finalState = useStore.getState();
    expect(finalState.isLoading).toBe(false);
    expect(finalState.data).toEqual(testData);
    expect(finalState.error).toBeNull();
  });
});
