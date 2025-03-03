import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DataTable from "./index";
import { ColumnDef, SortingState, PaginationState, ColumnFiltersState } from "@tanstack/react-table";

// Mock dependencies
vi.mock("react-spinners", () => ({ ClipLoader: () => <div>Loading...</div> }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ role: "admin" }) }));
vi.mock("@/constants/mapper", () => ({
  getFiltersItems: { status: ["Active", "Inactive"] },
  getfilterTitle: { status: "Status" }
}));

// Sample data and columns
const columns: ColumnDef<{ id: number; name: string }>[] = [
  { accessorKey: "id", header: "ID", cell: ({ getValue }) => getValue() },
  { accessorKey: "name", header: "Name", cell: ({ getValue }) => getValue() }
];

const data = [
  { id: 1, name: "John Doe", children: [] },
  { id: 2, name: "Jane Doe", children: [] }
];

const defaultProps = {
  columns,
  data,
  searchPlaceholder: "Search...",
  isLoading: false,
  totalItems: 2,
  limit: 10,
  columnFilters: [] as ColumnFiltersState,
  setColumnFilters: vi.fn(),
  globalFilter: "",
  setGlobalFilter: vi.fn(),
  sorting: [] as SortingState,
  setSorting: vi.fn(),
  pagination: { pageIndex: 0, pageSize: 10 } as PaginationState,
  setPagination: vi.fn()
};

describe("DataTable Component", () => {
  it("renders table headers", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders table data", () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("displays loading state when isLoading is true", () => {
    render(<DataTable {...defaultProps} isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calls setGlobalFilter when search input changes", async () => {
    render(<DataTable {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Test" } });

    // 如果 setGlobalFilter 被 debounce() 处理，你需要 等待一定时间：
    await waitFor(() => {
      expect(defaultProps.setGlobalFilter).toHaveBeenCalledWith("Test");
    });
  });

  it("calls setPagination when next page is clicked", () => {
    render(<DataTable {...defaultProps} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(defaultProps.setPagination).toHaveBeenCalled();
  });
});
