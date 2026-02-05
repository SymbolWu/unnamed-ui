import * as React from "react";
import { BlockSelectContainerPrimitive } from "@/registry/wuhan/blocks/block-select/block-select-01";

export interface BlockSelectProps {
  children?: React.ReactNode;
  className?: string;
}

export function BlockSelect({ children, className }: BlockSelectProps) {
  return (
    <BlockSelectContainerPrimitive className={className}>
      {children || "BlockSelect"}
    </BlockSelectContainerPrimitive>
  );
}
