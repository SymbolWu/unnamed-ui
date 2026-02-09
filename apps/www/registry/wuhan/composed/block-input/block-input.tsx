import * as React from "react";
import { BlockInputContainerPrimitive } from "@/registry/wuhan/blocks/block-input/block-input-01";

export interface BlockInputProps {
  children?: React.ReactNode;
  className?: string;
}

export function BlockInput({ children, className }: BlockInputProps) {
  return (
    <BlockInputContainerPrimitive className={className}>
      {children || "BlockInput"}
    </BlockInputContainerPrimitive>
  );
}
