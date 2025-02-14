import { describe, expect, it } from "vitest";
import { abbreviateName, convertToQueryParams } from "./formatters";
import { formatDateToDDMMYYYY } from "./formatters";

describe("abbreviateName function", () => {
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

describe("formatDateToDDMMYYYY", () => {
  it("should format ISO date to dd/mm/yyyy", () => {
    const isoDate = "2023-12-10T12:34:56Z";
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("2023-12-10");
  });

  it("should handle single-digit day and month correctly", () => {
    const isoDate = "2023-01-05T08:00:00Z"; // 5th January 2023
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("2023-01-05");
  });

  it("should handle leap years correctly", () => {
    const isoDate = "2020-02-29T00:00:00Z"; // 29th February 2020
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("2020-02-29");
  });

  it("should handle invalid ISO dates gracefully", () => {
    const isoDate = "invalid-date";
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("NaN-NaN-NaN");
  });

  it("should handle empty string as input", () => {
    const isoDate = "";
    const result = formatDateToDDMMYYYY(isoDate);
    expect(result).toBe("NaN-NaN-NaN");
  });
});

describe("convertToQueryParams", () => {
  it("should handle array values correctly", () => {
    const obj = { tags: ["sports", "news", "music"] };
    const params = convertToQueryParams(obj);
    expect(params.toString()).toBe("tags=sports&tags=news&tags=music");
  });

  it("should handle nested objects correctly", () => {
    const obj = { user: { name: "Alice", age: 25 } };
    const params = convertToQueryParams(obj);
    expect(params.toString()).toBe("user.name=Alice&user.age=25");
  });

  it("should ignore undefined and null values", () => {
    const obj = { name: "John", age: undefined, city: null };
    const params = convertToQueryParams(obj);
    expect(params.toString()).toBe("name=John");
  });

  it("should return an empty string when given an empty object", () => {
    const params = convertToQueryParams({});
    expect(params.toString()).toBe("");
  });
});
