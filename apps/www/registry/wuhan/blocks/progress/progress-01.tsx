import * as React from "react";
import { cn } from "@/lib/utils";

export const ProgressContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />;
});
ProgressContainerPrimitive.displayName = "ProgressContainerPrimitive";
