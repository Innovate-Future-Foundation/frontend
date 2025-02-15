import { ReactNode } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";

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

const Dropdown = <T,>({ item, menuItems, children }: TableActionsDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((menuItem, index) => (
          <DropdownMenuItem key={index} onClick={() => menuItem.onClick(item)} className={clsx(`text-sm text-primary-foreground30 ${menuItem.className}`)}>
            {menuItem.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
