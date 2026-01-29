"use client";

import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  XCircle,
  Circle,
} from "lucide-react";
import * as React from "react";
import {
  ExecutionResultContainerPrimitive,
  ExecutionResultTitlePrimitive,
  ExecutionResultContentPrimitive,
  ExecutionResultItemPrimitive,
  ExecutionResultItemHeaderPrimitive,
  ExecutionResultItemIconPrimitive,
  ExecutionResultItemTitlePrimitive,
  ExecutionResultItemImagePrimitive,
  ExecutionResultItemToolNamePrimitive,
  ExecutionResultItemContentPrimitive,
  ExecutionResultSectionPrimitive,
  ExecutionResultArrowPrimitive,
} from "@/registry/wuhan/blocks/execution-result/execution-result-01";

type ExecutionResultStatus = "success" | "error" | "loading" | "idle";

interface ExecutionResultSection {
  title?: React.ReactNode;
  content?: React.ReactNode;
  copyText?: string;
  showCopyIcon?: boolean;
  onCopy?: () => void;
}

interface ExecutionResultItem {
  key?: React.Key;
  status?: ExecutionResultStatus;
  title?: React.ReactNode;
  toolName?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  defaultOpen?: boolean;
  sections?: ExecutionResultSection[];
}

interface ExecutionResultProps {
  title?: React.ReactNode;
  items?: ExecutionResultItem[];
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrowIcon?: React.ReactNode;
}

const statusIconMap: Record<ExecutionResultStatus, React.ReactNode> = {
  success: <CheckCircle2 className="size-4 text-[var(--text-success)]" />,
  error: <XCircle className="size-4 text-[var(--text-error)]" />,
  loading: <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />,
  idle: <Circle className="size-4 text-[var(--text-tertiary)]" />,
};

export function ExecutionResult({
  title,
  items = [],
  defaultOpen = false,
  open,
  onOpenChange,
  arrowIcon,
}: ExecutionResultProps) {
  const defaultArrow = <ChevronDown className="size-4" />;

  return (
    <ExecutionResultContainerPrimitive
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {title && (
        <ExecutionResultTitlePrimitive
          arrow={
            <ExecutionResultArrowPrimitive>
              {arrowIcon || defaultArrow}
            </ExecutionResultArrowPrimitive>
          }
        >
          {title}
        </ExecutionResultTitlePrimitive>
      )}
      {items.length > 0 && (
        <ExecutionResultContentPrimitive>
          {items.map((item, index) => {
            const resolvedStatus = item.status ?? "success";
            const sections = item.sections ?? [];
            return (
              <ExecutionResultItemPrimitive
                key={item.key ?? index}
                defaultOpen={item.defaultOpen}
              >
                <ExecutionResultItemHeaderPrimitive
                  arrow={
                    <ExecutionResultArrowPrimitive>
                      {arrowIcon || defaultArrow}
                    </ExecutionResultArrowPrimitive>
                  }
                >
                  <ExecutionResultItemIconPrimitive>
                    {statusIconMap[resolvedStatus]}
                  </ExecutionResultItemIconPrimitive>
                  {item.title && (
                    <ExecutionResultItemTitlePrimitive>
                      {item.title}
                    </ExecutionResultItemTitlePrimitive>
                  )}
                  {item.imageSrc && (
                    <ExecutionResultItemImagePrimitive
                      src={item.imageSrc}
                      alt={item.imageAlt}
                    />
                  )}
                  {item.toolName && (
                    <ExecutionResultItemToolNamePrimitive>
                      {item.toolName}
                    </ExecutionResultItemToolNamePrimitive>
                  )}
                </ExecutionResultItemHeaderPrimitive>
                {sections.length > 0 && (
                  <ExecutionResultItemContentPrimitive>
                    {sections.map((section, sectionIndex) => {
                      const handleCopy =
                        section.onCopy ??
                        (section.copyText
                          ? () =>
                              navigator.clipboard.writeText(section.copyText!)
                          : undefined);
                      return (
                        <ExecutionResultSectionPrimitive
                          key={`${index}-${sectionIndex}`}
                          title={section.title}
                          showCopyIcon={section.showCopyIcon}
                          onCopy={handleCopy}
                        >
                          {section.content}
                        </ExecutionResultSectionPrimitive>
                      );
                    })}
                  </ExecutionResultItemContentPrimitive>
                )}
              </ExecutionResultItemPrimitive>
            );
          })}
        </ExecutionResultContentPrimitive>
      )}
    </ExecutionResultContainerPrimitive>
  );
}

export type {
  ExecutionResultProps,
  ExecutionResultItem,
  ExecutionResultSection,
  ExecutionResultStatus,
};
