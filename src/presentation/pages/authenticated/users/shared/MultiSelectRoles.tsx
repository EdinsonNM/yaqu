import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@presentation/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@presentation/components/ui/command";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import { Badge } from "@presentation/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

type MultiSelectRolesProps = {
  options: { label: string; value: string }[];
  selected: string[];
  setSelected: (selected: string[]) => void;
};

export function MultiSelectRoles({
  options,
  selected,
  setSelected,
}: MultiSelectRolesProps) {
  const toggleValue = (value: string) => {
    const data = selected.includes(value)
      ? selected.filter((v: string) => v !== value)
      : [...selected, value];
    setSelected(data);
  };

  return (
    <Command className="w-full">
      <CommandGroup className="w-full">
        {options.map((option) => (
          <CommandItem
            key={option.value}
            onSelect={() => {
              toggleValue(option.value);
            }}
            className="cursor-pointer w-full"
          >
            <div
              className={cn(
                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                selected.includes(option.value)
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50"
              )}
            >
              {selected.includes(option.value) && <Check className="h-4 w-4" />}
            </div>
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}
