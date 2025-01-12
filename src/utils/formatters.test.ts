import { describe, expect, it } from "vitest";
import { abbreviateName, ellipticalString } from "./formatters";

describe("abbreviateName function", async () => {
  it("should return correct abbreviation for full names", () => {
    expect(abbreviateName("John Doe")).toBe("JD");
    expect(abbreviateName("Alice Bob Carol")).toBe("AB");
  });

  it("should handle single names", () => {
    expect(abbreviateName("John")).toBe("J");
  });

  it("should handle empty or whitespace-only strings", () => {
    expect(abbreviateName("")).toBe("");
    expect(abbreviateName("   ")).toBe("");
  });

  it("should handle names with multiple spaces", () => {
    expect(abbreviateName("   John   Doe   ")).toBe("JD");
  });
});

describe("ellipticalString", () => {
  it("should truncate and add ellipsis when the sentence exceeds the digit limit", () => {
    expect(ellipticalString("Hello World!", 5)).toBe("Hello...");
  });

  it("should return the full sentence if its length is less than or equal to the digit limit", () => {
    expect(ellipticalString("Short", 10)).toBe("Short");
    expect(ellipticalString("Exact", 5)).toBe("Exact");
  });

  it("should return an empty string if the sentence is empty or the digit limit is zero or less", () => {
    expect(ellipticalString("", 5)).toBe("");
    expect(ellipticalString("Non-empty", 0)).toBe("");
    expect(ellipticalString("Non-empty", -5)).toBe("");
  });

  it("should handle leading and trailing spaces correctly", () => {
    expect(ellipticalString("  Hello World!  ", 7)).toBe("Hello...");
  });
});
