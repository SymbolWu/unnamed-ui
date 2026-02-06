import * as React from "react";
import { SplitPaneContainerPrimitive } from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export interface SplitPaneProps {
  children?: React.ReactNode;
  className?: string;
}

export function SplitPane({ children, className }: SplitPaneProps) {
  return (
    <SplitPaneContainerPrimitive className={className}>
      {children || "SplitPane"}
    </SplitPaneContainerPrimitive>
  );
}
