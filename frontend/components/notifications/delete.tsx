import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { remove } from "@/hooks/useBackendApi";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function DeleteAlertDialog({ icon, country, refreshData }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleClickDelete = async () => {
    try {
      const response = await remove("/delete_country", { country: country });
      if (response.status === 200) {
        toast({
          title: "Delete!",
          variant: "default",
          description: "Country deleted successfully",
        });
        router.refresh();
        refreshData();
      }
    } catch (error: any) {
      toast({
        title: "Country not deleted!!!",
        variant: "destructive",
        description: error.message,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{icon}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClickDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
