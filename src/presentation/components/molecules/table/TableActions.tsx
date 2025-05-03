import { DropdownMenuItem } from "@/presentation/components/ui/dropdown-menu";

import { Button } from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type TableActionsObject<T> = {
  [key: string]: {
    label: string;
    icon: React.ReactNode;
    onClick: (item: T) => void;
  };
};

export type ActionsProps<T> = {
  item: T;
  actions: TableActionsObject<T>;
};

export const TableActions = <T,>({ item, actions }: ActionsProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {Object.entries(actions).map(([key, action]) => (
          <DropdownMenuItem key={key} onClick={() => action.onClick(item)}>
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
