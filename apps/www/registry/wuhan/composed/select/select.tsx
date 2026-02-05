import * as React from "react";
import { SelectContainerPrimitive } from "@/registry/wuhan/blocks/select/select-01";

export interface SelectProps {
  children?: React.ReactNode;
  className?: string;
}

export function Select({ children, className }: SelectProps) {
  return (
    <SelectContainerPrimitive className={className}>
      {children || "Select"}
    </SelectContainerPrimitive>
  );
}
