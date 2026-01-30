"use client";

import * as React from "react";
import {
  SuggestionButton as SuggestionButtonPrimitive,
  SuggestionGroup as SuggestionGroupPrimitive,
} from "@/registry/wuhan/blocks/suggestion/suggestion-01";

export interface SuggestionItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface SuggestionPanelProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: SuggestionItem[];
  className?: string;
}

export const SuggestionGroup = SuggestionGroupPrimitive;
export const SuggestionButton = SuggestionButtonPrimitive;

export function SuggestionPanel({
  title,
  description,
  items,
  className,
}: SuggestionPanelProps) {
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
      <SuggestionGroup>
        {items.map((item) => (
          <SuggestionButton
            key={item.id}
            icon={item.icon}
            onClick={item.onClick}
          >
            {item.label}
          </SuggestionButton>
        ))}
      </SuggestionGroup>
    </div>
  );
}
