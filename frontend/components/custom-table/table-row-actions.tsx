"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { remove } from "@/hooks/useClientApi";
import { toast } from "@/components/ui/use-toast";


interface TableRowActionsProps {
  data: any;
  actions: string[];
  apiUrl: string;
  appUrl: string;
  AddEditPopup: any;
  extraData: any;
}

export const TableRowActions: React.FC<TableRowActionsProps> = ({
  data,
  actions,
  appUrl,
  apiUrl,
  AddEditPopup,
  extraData
 }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

//  console.log(data, actions);

  const onConfirm = async () => {
    try {
      const response = await remove(`${apiUrl.slice(0, -1)}/${data.id}`);
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
          {actions.includes("edit") && (
            <AddEditPopup label="Edit" action="Update" item={data}/>
          )}
          {actions.includes("delete") && (
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4 text-red-600" />
            </Button>
          )}
        </> 
   );
};
