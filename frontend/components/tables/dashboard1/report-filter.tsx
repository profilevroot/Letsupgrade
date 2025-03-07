import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column, Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/date-picker";
import { DownloadIcon } from "lucide-react";

interface ReportFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  table?: Table<TData>;
  options: {
    label: string;
    value: string;
  }[];
}

export function ReportFilter<TData, TValue>({
  column,
  title,
  options,
  downloadPermissoin,
  table,
}: ReportFilterProps<TData, TValue>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DatePicker label="From date" />
        <DatePicker label="To date" />
        <Select>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Netherland">Netherland</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Belgium">Belgium</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Denmark">Denmark</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select by Label" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Netherland">Netherland</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Belgium">Belgium</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Denmark">Denmark</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" className="h-8">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              More filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[160px] p-0" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    return (
                      <CommandItem key={option.value} onSelect={() => {}}>
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            true
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        {downloadPermissoin && (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[130px] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {["Excel", "CSV"].map((option) => {
                      return (
                        <CommandItem key={option} onSelect={() => {}}>
                          <span>{option}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
