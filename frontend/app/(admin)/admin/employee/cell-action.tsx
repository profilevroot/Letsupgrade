"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Employee } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { get } from "@/hooks/useClientApi";
import { tr } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";


interface CellActionProps {
  data: Employee;
  actions: string[];
  apiUrl: string;
  appUrl: string;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  actions,
  appUrl,
  apiUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log(data, actions);

  const onConfirm = async () => {
    try {
      const response = await get(`${apiUrl.slice(0, -1)}/${data.id}`);
     if (response.status) {
      toast({
        title: "Success",
        variant: "default",
        description: `Deleted successfully`,
      });
      router.refresh();
    }
    }catch (error: any) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.includes("edit") && actions.includes("delete") && (
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          )}
          {!actions.includes("edit") && !actions.includes("delete") && (
            <DropdownMenuLabel>No permission</DropdownMenuLabel>
          )}
          {actions.includes("edit") && (
            <DropdownMenuItem
              onClick={() => router.push(`/admin/employee/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          )}
          {actions.includes("delete") && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
