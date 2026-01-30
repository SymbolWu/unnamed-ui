"use client";

import * as React from "react";
import {
  QuickActionButton as QuickActionButtonPrimitive,
  QuickActionGroup as QuickActionGroupPrimitive,
  QuickActionIcon as QuickActionIconPrimitive,
} from "@/registry/wuhan/blocks/quick-action/quick-action-01";

export interface QuickActionItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface QuickActionPanelProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: QuickActionItem[];
  className?: string;
}

export const QuickActionGroup = QuickActionGroupPrimitive;
export const QuickActionButton = QuickActionButtonPrimitive;
export const QuickActionIcon = QuickActionIconPrimitive;

export function QuickActionPanel({
  title,
  description,
  items,
  className,
}: QuickActionPanelProps) {
  return (
    <div className={className}>
      {(title || description) && (
        <div className="text-center mb-6">
          {title && (
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}
      <QuickActionGroup>
        {items.map((item) => (
          <QuickActionButton key={item.id} onClick={item.onClick}>
            {item.icon && <QuickActionIcon>{item.icon}</QuickActionIcon>}
            <span>{item.label}</span>
          </QuickActionButton>
        ))}
      </QuickActionGroup>
    </div>
  );
}
