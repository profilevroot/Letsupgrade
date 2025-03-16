"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import { Edit, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { get, post, put } from "@/hooks/useClientApi";

type propsTypes = {
  item?: any;
  action: string;
  label: string;
};

const userType = [
  { label: "Admin", value: "ADMIN" },
  { label: "Student", value: "STUDENT" },
];

const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().email({ message: "Enter a valid email address" }),
  role_id: z.coerce
    .number({
      invalid_type_error: "User type must be a number.",
    })
    .int()
    .positive("Select a valid user type."),
  user_type: z.string().nonempty("Select an user type."),
});


export default function AddDialog({ item, action, label }: propsTypes) {
  const router = useRouter();
  const { toast } = useToast();

  const [roles, setRoles] = React.useState<{ label: string; value: string }[]>(
    []
  );
  const getRole = async () => {
    const response = await get(`/roles-all`, {});
    const roleFormatted = response?.data?.data?.map((value) => ({
      label: value?.name,
      value: value?.id,
    }));
    setRoles([...roleFormatted]);
  };
  React.useEffect(() => {
    getRole();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: item?.username || "",
      email: item?.email || "",
      user_type: item?.user_type || "",
      role_id: item?.role_id || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const value = {
        username: (values?.username).toLowerCase(),
        email: values?.email,
        role_id: values?.role_id,
        user_type: values?.user_type,
      };
      if (action === "Update") {
        const response = await put(`/user/${item.id}`, value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.name} updated successfully`,
          });
          router.refresh();
          document.getElementById("closeDialog")?.click();
        }
      } else {
        const response = await post("/user", value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.username} added successfully`,
          });
          router.refresh();
          document.getElementById("closeDialog")?.click();
        }
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    }
  }
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{label} user</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid   ">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  control={form.control}
                  name="username"
                  label="Usermame"
                />
                <FormInput control={form.control} name="email" label="E-mail" />
                <FormSelect
                  name="role_id"
                  control={form.control}
                  label="Select role"
                  options={roles}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormSelect
                  name="user_type"
                  control={form.control}
                  label="Select user type"
                  options={userType}
                />
              </div>
            </CardContent>
            <DialogFooter>
              <Button type="submit">{action}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
