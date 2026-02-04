"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

//#region 报告卡片容器原语
const ReportCardPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-lg)]",
        "px-[var(--padding-com-lg)] py-[var(--padding-com-lg)]",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--bg-container-primary)]",
        "border border-[var(--border-secondary)]",
        className,
      )}
      {...props}
    />
  );
});
ReportCardPrimitive.displayName = "ReportCardPrimitive";
//#endregion

export { ReportCardPrimitive };
