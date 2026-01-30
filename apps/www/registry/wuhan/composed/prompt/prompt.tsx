"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import {
  PromptButton as PromptButtonHorizontal,
  PromptGroup as PromptGroupHorizontal,
} from "@/registry/wuhan/blocks/prompt/prompt-01";
import {
  PromptButton as PromptButtonVertical,
  PromptGroup as PromptGroupVertical,
} from "@/registry/wuhan/blocks/prompt/prompt-02";

export type PromptVariant = "horizontal" | "vertical";

export interface PromptGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PromptVariant;
}

export interface PromptButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  variant?: PromptVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export interface PromptItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface PromptPanelProps {
  variant?: PromptVariant;
  items: PromptItem[];
  className?: string;
}

export const PromptGroup = React.forwardRef<HTMLDivElement, PromptGroupProps>(
  ({ variant = "horizontal", ...props }, ref) => {
    if (variant === "vertical") {
      return <PromptGroupVertical ref={ref} {...props} />;
    }
    return <PromptGroupHorizontal ref={ref} {...props} />;
  },
);
PromptGroup.displayName = "PromptGroup";

export const PromptButton = React.forwardRef<
  HTMLButtonElement,
  PromptButtonProps
>(({ variant = "horizontal", icon, children, ...props }, ref) => {
  if (variant === "vertical") {
    return (
      <PromptButtonVertical
        ref={ref}
        icon={icon ?? <Sparkles className="size-4" />}
        {...props}
      >
        {children}
      </PromptButtonVertical>
    );
  }
  return (
    <PromptButtonHorizontal ref={ref} icon={icon} {...props}>
      {children}
    </PromptButtonHorizontal>
  );
});
PromptButton.displayName = "PromptButton";

export function PromptPanel({
  variant = "horizontal",
  items,
  className,
}: PromptPanelProps) {
  return (
    <PromptGroup variant={variant} className={className}>
      {items.map((item) => (
        <PromptButton
          key={item.id}
          variant={variant}
          icon={item.icon}
          onClick={item.onClick}
        >
          {item.label}
        </PromptButton>
      ))}
    </PromptGroup>
  );
}
