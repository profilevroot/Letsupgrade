"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import AddRoleDialog from "./addRole";

type propsTypes = {
  item?: any;
  action: string;
  label: string;
};

export default function PopupDialog({ item, action, label }: propsTypes) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={action === "Update" ? "ghost" : "default"}>
          {action === "Update" ? (
            <Edit className="mr-2 h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{label} role</DialogTitle>
        </DialogHeader>
        <AddRoleDialog item={item} action={action} label={label} />
      </DialogContent>
    </Dialog>
  );
}
