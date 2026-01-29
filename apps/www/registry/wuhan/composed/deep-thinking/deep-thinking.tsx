"use client";

import { ChevronDown, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import * as React from "react";
import {
  DeepThinkingContainerPrimitive,
  DeepThinkingHeaderPrimitive,
  DeepThinkingIconPrimitive,
  DeepThinkingTitlePrimitive,
  DeepThinkingContentPrimitive,
  DeepThinkingArrowPrimitive,
  ThinkingDotsPrimitive,
} from "@/registry/wuhan/blocks/deep-thinking/deep-thinking-01";

type DeepThinkingStatus = "thinking" | "completed" | "failed";

interface DeepThinkingLabels {
  thinkingTitle?: React.ReactNode;
  completedTitle?: React.ReactNode;
  failedTitle?: React.ReactNode;
}

interface DeepThinkingProps {
  status?: DeepThinkingStatus;
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  arrowIcon?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  labels?: DeepThinkingLabels;
}

const defaultLabels: Required<DeepThinkingLabels> = {
  thinkingTitle: "深度思考中",
  completedTitle: "已完成思考",
  failedTitle: "思考失败",
};

const statusIconMap: Record<DeepThinkingStatus, React.ReactNode> = {
  thinking: <ThinkingDotsPrimitive />,
  completed: <CheckCircle2 className="size-4 text-[var(--text-success)]" />,
  failed: <AlertCircle className="size-4 text-[var(--text-error)]" />,
};

export function DeepThinking({
  status = "thinking",
  title,
  content,
  icon,
  arrowIcon,
  defaultOpen = false,
  open,
  onOpenChange,
  labels,
}: DeepThinkingProps) {
  const resolvedLabels = { ...defaultLabels, ...labels };
  const resolvedTitle =
    title ??
    (status === "thinking"
      ? resolvedLabels.thinkingTitle
      : status === "completed"
        ? resolvedLabels.completedTitle
        : resolvedLabels.failedTitle);
  const resolvedIcon = icon ?? statusIconMap[status] ?? (
    <Sparkles className="size-4 text-[var(--text-brand)]" />
  );

  return (
    <DeepThinkingContainerPrimitive
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DeepThinkingHeaderPrimitive
        arrow={
          <DeepThinkingArrowPrimitive>
            {arrowIcon || <ChevronDown className="size-4" />}
          </DeepThinkingArrowPrimitive>
        }
      >
        <DeepThinkingIconPrimitive>
          {resolvedIcon}
          <DeepThinkingTitlePrimitive
            className={
              status === "thinking" ? "text-[var(--text-secondary)]" : undefined
            }
          >
            {resolvedTitle}
          </DeepThinkingTitlePrimitive>
        </DeepThinkingIconPrimitive>
      </DeepThinkingHeaderPrimitive>
      {content && (
        <DeepThinkingContentPrimitive>{content}</DeepThinkingContentPrimitive>
      )}
    </DeepThinkingContainerPrimitive>
  );
}

export type { DeepThinkingProps, DeepThinkingStatus, DeepThinkingLabels };
