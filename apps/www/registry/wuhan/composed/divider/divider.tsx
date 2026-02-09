import * as React from "react";
import { DividerContainerPrimitive } from "@/registry/wuhan/blocks/divider/divider-01";

export interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Divider({ children, className }: DividerProps) {
  return (
    <DividerContainerPrimitive className={className}>
      {children || "Divider"}
    </DividerContainerPrimitive>
  );
}
