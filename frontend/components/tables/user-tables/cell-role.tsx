"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get, put } from "@/hooks/useBackendApi";
import { useToast } from "@/components/ui/use-toast";

export function SelectRole({ data }) {
  //const router = useRouter();
  const { toast } = useToast();
  const [roles, setRoles] = React.useState([]);
  const getRole = async () => {
    const roles = await get(`/roles`, {});
    setRoles(roles?.data);
  };
  React.useEffect(() => {
    getRole();
  }, []);
  const handleChange = async (role_id: any) => {
    try {
      const response = await put(`/userrole`, {
        role_id,
        username: data.username,
      });
      if (response.status) {
        toast({
          title: "Role!",
          variant: "default",
          description: `User role updated  successfully`,
        });
        // router.reload();
      }
    } catch (err) {}
  };
  return (
    <Select defaultValue={data?.role} onValueChange={(e) => handleChange(e)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {roles?.map((role) => (
            <SelectItem
              disabled
              className=" capitalize"
              key={role.id}
              value={role.id}
            >
              {role.role_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
