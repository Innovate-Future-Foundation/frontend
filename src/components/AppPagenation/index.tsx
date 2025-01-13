import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Updater } from "@tanstack/react-table";

interface AppPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setPageIndex: (updater: Updater<number>) => void;
  handlePrev: () => void;
  getCanPreviousPage: () => boolean;
  handleNext: () => void;
  getCanNextPage: () => boolean;
}

const AppPagenation: React.FC<AppPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  setPageIndex,
  handlePrev,
  getCanPreviousPage,
  handleNext,
  getCanNextPage
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={e => {
                e.preventDefault();
                setPageIndex(i - 1);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((i === currentPage - 2 && i > 1) || (i === currentPage + 2 && i < totalPages)) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return pages;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            aria-disabled={!getCanPreviousPage()}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            aria-disabled={!getCanNextPage()}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={!getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default AppPagenation;
