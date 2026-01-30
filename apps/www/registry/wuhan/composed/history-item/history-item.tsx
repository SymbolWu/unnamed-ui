"use client";

import * as React from "react";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemTrailingPrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";

export interface HistoryItemProps {
  title: React.ReactNode;
  trailing?: React.ReactNode;
  hoverTrailing?: React.ReactNode;
  selected?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function HistoryItem({
  title,
  trailing,
  hoverTrailing,
  selected,
  active,
  onClick,
  className,
}: HistoryItemProps) {
  return (
    <HistoryItemPrimitive
      className={className}
      data-selected={selected ? "true" : undefined}
      data-active={active ? "true" : undefined}
      onClick={onClick}
    >
      <HistoryItemTitlePrimitive>{title}</HistoryItemTitlePrimitive>
      {trailing && (
        <HistoryItemTrailingPrimitive>{trailing}</HistoryItemTrailingPrimitive>
      )}
      {hoverTrailing && (
        <HistoryItemHoverTrailingPrimitive>
          {hoverTrailing}
        </HistoryItemHoverTrailingPrimitive>
      )}
    </HistoryItemPrimitive>
  );
}
