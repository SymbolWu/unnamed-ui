import * as React from "react";
import { ProgressContainerPrimitive } from "@/registry/wuhan/blocks/progress/progress-01";

export interface ProgressProps {
  children?: React.ReactNode;
  className?: string;
}

export function Progress({ children, className }: ProgressProps) {
  return (
    <ProgressContainerPrimitive className={className}>
      {children || "Progress"}
    </ProgressContainerPrimitive>
  );
}
