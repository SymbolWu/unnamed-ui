import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />;
});
SelectContainerPrimitive.displayName = "SelectContainerPrimitive";

//#region 触发器原语
const SelectTriggerPrimitive = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      "h-[var(--size-com-md)] w-[200px] rounded-[var(--radius-md)]",
      "border border-[var(--border-neutral)] bg-[var(--bg-container)]",
      "flex w-full items-center justify-between",
      "px-[var(--padding-com-md)] py-[5px]",
      "font-size-2",
      "hover:border-[var(--border-brand)]",
      "transition-all",
      "duration-300",
      "focus:outline-none",
      "focus-visible:border-[var(--border-brand)]",
      "focus-visible:ring-2",
      "focus-visible:ring-[var(--ring)]",
      "data-[state=open]:border-[var(--border-brand)]",
      "data-[state=open]:ring-2",
      "data-[state=open]:ring-[var(--ring)]",
      "disabled:cursor-not-allowed",
      "disabled:border-[var(--border-neutral)]",
      "disabled:bg-[var(--bg-container-disable)]",
      "placeholder:text-[var(--text-placeholder)]",
      "data-[placeholder]:text-[var(--text-placeholder)]",
      className,
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
));
SelectTriggerPrimitive.displayName = SelectPrimitive.Trigger.displayName;
//#endregion

// #region 选项原语
const SelectItemPrimitive = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItemPrimitive.displayName = SelectPrimitive.Item.displayName;
// #endregion

export {
  SelectContainerPrimitive,
  SelectTriggerPrimitive,
  SelectItemPrimitive,
};
