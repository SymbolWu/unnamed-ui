"use client";

import * as React from "react";
import { CornerDownLeft, X } from "lucide-react";
import {
  QuoteContent,
  QuoteContentLeading,
  QuoteContentContent,
  QuoteContentText,
  QuoteContentCloseButton,
} from "@/registry/wuhan/blocks/quote-content/quote-content-01";

export interface QuoteContentProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  className?: string;
}

export function QuoteContentComposed({
  content,
  icon,
  onClose,
  closeIcon,
  className,
}: QuoteContentProps) {
  const resolvedIcon = icon ?? <CornerDownLeft className="w-4 h-4" />;
  const resolvedCloseIcon = closeIcon ?? <X className="w-4 h-4" />;
  const isText = typeof content === "string" || typeof content === "number";

  return (
    <QuoteContent className={className}>
      <QuoteContentLeading>{resolvedIcon}</QuoteContentLeading>
      <QuoteContentContent>
        {isText ? <QuoteContentText>{content}</QuoteContentText> : content}
      </QuoteContentContent>
      {onClose && (
        <QuoteContentCloseButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          {resolvedCloseIcon}
        </QuoteContentCloseButton>
      )}
    </QuoteContent>
  );
}
