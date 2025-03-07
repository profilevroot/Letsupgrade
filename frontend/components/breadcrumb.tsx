import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items,actions=[],AddDialog }: BreadCrumbPropsType) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground ">
      <Link
        href={"/admin"}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Admin
      </Link>
      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
      {actions.includes("add") && (
        <div className="flex items-center justify-end flex-1">
          <AddDialog action="Save" label="Add" />
        </div>
      )}
    </div>
  );
}
