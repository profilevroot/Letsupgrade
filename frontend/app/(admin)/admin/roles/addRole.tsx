"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { get, post, put } from "@/hooks/useClientApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FormCheckbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

type propsTypes = {
  item?: any;
  action: string;
  label: string;
};

const formSchema = z.object({
  name: z.string().min(2),
  permissions: z.array(z.string()),
});
export default function AddRoleDialog({ item, action, label }: propsTypes) {
  const router = useRouter();
  const { toast } = useToast();
  const [permissions, setPermissions] = useState({
    actions: [],
    routes: [],
    permission: [],
  });

  const getRoutes = async () => {
    const routes = await get(`/routes-all`, {});
    const actions = await get(`/actions-all`, {});
    let rolepermissions = {};
    if (item?.id) {
      const { data } = await get(`/role-permission/${item.id}`, {});
      console.log("permission", data);
      data?.data?.forEach((value) => {
        if (typeof rolepermissions[value.route_id] === "undefined") {
          rolepermissions[value.route_id] = [];
        }
        rolepermissions[value.route_id].push(
          value.action_id
        );
      });
    }
    setPermissions({
      actions: actions?.data?.data,
      routes: routes?.data?.data,
      permission: rolepermissions,
    });
  };

  const handleCheckboxChange = (routeId, actionId) => {
    const { permission } = permissions;
    if (typeof permission[routeId] === "undefined") {
      permission[routeId] = [];
    }
    const checkValid = permission[routeId]?.indexOf(actionId);
    if (checkValid >= 0) {
      permission[routeId]?.splice(checkValid, 1);
    } else {
      permission[routeId]?.push(actionId);
    }
    setPermissions({ ...permissions, permission: permission });
  };

  useEffect(() => {
    getRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      permissions: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { permission } = permissions;
      const value = {
        name: (values?.name).toLowerCase(),
        permissions: permission,
        id: item?.id,
      };
      if (action === "Update") {
        const response = await put(`/role/${item.id}`, value);
        if (response.status) {
          toast({
            title: "Role!",
            variant: "default",
            description: `${values?.name} updated successfully`,
          });
          document.getElementById('closeDialog')?.click();
          router.refresh();
        }
      } else {
        console.log("value", value);
         const response = await post("/role", value);
        if (response.status) {
          toast({
            title: "Role!",
            variant: "default",
            description: `${values?.name} added successfully`,
          });
          document.getElementById('closeDialog')?.click();
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Role Name"
            />
            <ScrollArea className="h-[300px] w-[450px] rounded-md border pl-2 pt-2">
              {permissions?.routes?.map((route) => {
                const actionIds = permissions?.permission[route.id];
                return (
                  <div key={route?.name} className=" mb-3">
                    <div className=" font-bold capitalize">
                      {route?.name}
                    </div>
                    <div className="flex col flex-wrap">
                      {permissions?.actions?.map((action) => {
                        const checked = actionIds?.includes(action?.id);
                        return (
                          <div key={action?.name} className="w-[110px] ">
                            <FormCheckbox
                              control={form.control}
                              name="permissions"
                              value={action.id}
                              checked={checked}
                              onCheckedChange={() => {
                                handleCheckboxChange(route.id, action.id);
                              }}
                              id={`${route.id}-${action.id}-checkbox`}
                              label={action?.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </CardContent>
          <DialogFooter>
              <Button type="submit">{action}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
