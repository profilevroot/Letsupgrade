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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import React from "react";
import { post, put } from "@/hooks/useClientApi";
import { useRouter } from "next/navigation";
import { Edit, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type propsTypes = {
  item?: any;
  action: string;
  label: string;
};

const formSchema = z.object({
  name: z.string().min(2),
  path: z.string().min(2),
});
export default function AddDialog({ item, action, label }: propsTypes) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name,
      path: item?.path,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const value = {
        name: (values?.name).toLowerCase(),
        path: (values?.path).toLowerCase(),
      };
      if (action === "Update") {
        const response = await put(`/route/${item.id}`, value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.name} updated successfully`,
          });
          router.refresh();
        }
      } else {
        const response = await post("/route", value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.name} added successfully`,
          });
          router.refresh();
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label} Route</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormInput
                control={form.control}
                name="name"
                label="Route Name"
              />
              <FormInput
                control={form.control}
                name="path"
                label="Route Path"
              />
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
