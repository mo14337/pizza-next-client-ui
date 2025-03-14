"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tenant } from "@/lib/types";
import { useRouter } from "next/navigation";

const TenantSelect = ({ tenants }: { tenants: Tenant[] }) => {
  const router = useRouter();
  const hanldeSelectChange = (id: string) => {
    router.push(`/?tenant=${id}`);
  };
  return (
    <>
      <Select onValueChange={hanldeSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Restaurant" />
        </SelectTrigger>
        <SelectContent>
          {tenants.map((tenant: Tenant, index: number) => {
            return (
              <SelectItem key={tenant.id || index} value={String(tenant.id)}>
                {tenant.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default TenantSelect;
