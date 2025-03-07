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
import { CardContent } from "../ui/card";
import React from "react";
import { post } from "@/hooks/useBackendApi";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
type propsTypes = {
  icon: React.ReactNode;
  item?: any;
};

const formSchema = z.object({
  country_name: z.string().min(2),
});
export default function AddCountryDialog({
  icon,
  item,
  refreshData,
}: propsTypes) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const value = {
        country: (values?.country_name).toLowerCase(),
        auto_trading: "false",
        updated_by: "Kanagaraj R",
        endpoint: `http://127.0.0.1:5000/${encodeURI(values?.country_name)}`,
      };
      const response = await post("/add_country", value);
      if (response.status) {
        router.refresh();
        refreshData();
        toast({
          title: "Add Country",
          variant: "default",
          description: `Country ${values?.country_name} added successfully`,
        });
        //router.push(`/dashboard`);
      }
    } catch (error: any) {
    } finally {
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Country</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormInput
                control={form.control}
                name="country_name"
                label="Country Name"
                value={item?.country}
              />
            </CardContent>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Save</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
