import { ApiResponse } from "@/types";
import { ColumnFilter, ColumnFiltersState, ColumnSort, SortingState } from "@tanstack/react-table";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export const makeData = <T>(newItem: () => T, ...lens: number[]): T[] => {
  const makeDataLevel = (depth = 0): T[] => {
    const len = lens[depth]!;
    return range(len).map((): T => {
      return {
        ...newItem(),
        children: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
};

export const fetchDataCursorPagination = async <T>({
  data,
  cursor,
  cursorField,
  size,
  sorting,
  filtering
}: {
  data: T[];
  cursor: string | null;
  cursorField: keyof T;
  size: number;
  sorting: SortingState;
  filtering: ColumnFiltersState;
}): Promise<ApiResponse<T>> => {
  let dbData = [...data];

  // Apply column filters
  if (filtering.length) {
    filtering.forEach((filter: ColumnFilter) => {
      dbData = dbData.filter(row => {
        const value = row[filter.id as keyof T];

        if (typeof value === "object" && value !== null) {
          return JSON.stringify(row[filter.id as keyof T])
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());
        }
        return String(row[filter.id as keyof T])
          .toLowerCase()
          .includes(String(filter.value).toLowerCase());
      });
    });
  }

  // Apply sorting
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof T; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  if (cursor) {
    const cursorIndex = dbData.findIndex(row => String(row[cursorField]) === cursor);
    dbData = dbData.slice(cursorIndex + 1);
  }

  const startIndex = cursor ? data.findIndex(item => String(item[cursorField]) === cursor) + 1 : 0;
  const nextCursor = dbData.length > size ? String(dbData[size - 1]?.[cursorField] ?? undefined) : undefined;

  // Simulate backend API latency
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        isSuccess: true,
        message: ["is success"],
        data: dbData.slice(0, size),
        meta: {
          pageSize: size,
          totalItems: dbData.length,
          // For cursor based pagination
          nextCursor,
          hasNextPage: startIndex + size < dbData.length
        }
      });
    }, 200)
  );
};

export const fetchDataOffsetPagination = async <T>({
  data,
  offset,
  limit,
  sorting,
  filtering
}: {
  data: T[];
  offset: number;
  limit: number;
  sorting: SortingState;
  filtering: ColumnFiltersState;
}): Promise<ApiResponse<T>> => {
  let dbData = [...data];

  // Apply column filters
  if (filtering.length) {
    filtering.forEach((filter: ColumnFilter) => {
      dbData = dbData.filter(row => {
        const value = row[filter.id as keyof T];

        if (typeof value === "object" && value !== null) {
          return JSON.stringify(row[filter.id as keyof T])
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());
        }
        return String(row[filter.id as keyof T])
          .toLowerCase()
          .includes(String(filter.value).toLowerCase());
      });
    });
  }

  // Apply sorting
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof T; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  // Simulate backend API latency
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        isSuccess: true,
        message: ["is success"],
        data: dbData.slice(offset, offset + limit),
        meta: {
          pageSize: limit,
          totalItems: dbData.length,
          currentPage: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(dbData.length / limit)
        }
      });
    }, 200)
  );
};

export const fetchData = async <T>({
  data,
  sorting,
  filtering
}: {
  data: T[];
  sorting?: SortingState;
  filtering?: ColumnFiltersState;
}): Promise<ApiResponse<T>> => {
  let dbData = [...data];

  // Apply column filters
  if (filtering?.length) {
    filtering.forEach((filter: ColumnFilter) => {
      dbData = dbData.filter(row => {
        const value = row[filter.id as keyof T];

        if (typeof value === "object" && value !== null) {
          return JSON.stringify(row[filter.id as keyof T])
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());
        }
        return String(row[filter.id as keyof T])
          .toLowerCase()
          .includes(String(filter.value).toLowerCase());
      });
    });
  }

  // Apply sorting
  if (sorting?.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof T; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }
  // Simulate backend API latency
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        isSuccess: true,
        message: ["is success"],
        data: dbData
      });
    }, 200)
  );
};
