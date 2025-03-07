"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";

import { User } from "@/constants/data";
import { remove } from "@/hooks/useClientApi";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { checkActionPermission } from "@/lib/utils";
import { PermissionContext } from "@/components/context/action-context";

interface CellActionProps {
  data: User;
  AddEditPopup: React.FC;
  deleteUrl: string;
  label: string;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  AddEditPopup,
  deleteUrl,
  label,
}) => {
  let { action }: any = useContext(PermissionContext);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onConfirm = async () => {
    try {
      const response = await remove(`${deleteUrl}${data?.id}`, {});
      if (response.status === 200) {
        toast({
          title: "Success",
          variant: "default",
          description: `${label} deleted successfully`,
        });
        router.refresh();
      }
    } catch (error: any) {
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
      {checkActionPermission(action, "update") && (
        <AddEditPopup label="Edit" action="Update" item={data} />
      )}
      {checkActionPermission(action, "delete") && (
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4 text-red-600" />
        </Button>
      )}
    </>
  );
};
