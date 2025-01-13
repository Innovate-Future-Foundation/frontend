import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface DropdownMenuItemType<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
}

interface TableActionsDropdownProps<T> {
  item: T;
  menuItems: DropdownMenuItemType<T>[];
  children: ReactNode;
}

const AppDropdown = <T,>({ item, menuItems, children }: TableActionsDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((menuItem, index) => (
          <DropdownMenuItem key={index} onClick={() => menuItem.onClick(item)} className={menuItem.className}>
            {menuItem.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
