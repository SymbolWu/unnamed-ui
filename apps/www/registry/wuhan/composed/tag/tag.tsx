import * as React from "react";
import { TagContainerPrimitive } from "@/registry/wuhan/blocks/tag/tag-01";

export interface TagProps {
  children?: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <TagContainerPrimitive className={className}>
      {children || "Tag"}
    </TagContainerPrimitive>
  );
}
