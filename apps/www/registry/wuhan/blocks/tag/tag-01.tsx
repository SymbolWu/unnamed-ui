"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

/**
 * Tag 变体类型
 */
export type TagVariant =
  | "default"
  | "solid"
  | "outline"
  | "filled"
  | "filled-outline";

/**
 * Tag 主题类型
 */
export type TagTheme = "brand" | "success" | "warning" | "error" | "neutral";

/**
 * Tag 容器原语的属性
 */
interface TagContainerPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 变体 */
  variant?: TagVariant;
  /** 主题 */
  theme?: TagTheme;
  /** 是否为添加模式 */
  addable?: boolean;
}

/**
 * Tag 容器原语
 * 提供基础的标签样式和主题变体
 */
const TagContainerPrimitive = React.forwardRef<
  HTMLSpanElement,
  TagContainerPrimitiveProps
>(
  (
    {
      className,
      variant = "default",
      theme = "brand",
      addable = false,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // 基础样式
          "inline-flex items-center gap-1",
          "h-[28px]",
          "rounded-[var(--radius-md)]",
          "px-2 py-1",
          "text-[13px]",
          "leading-[20px]",
          "font-normal",
          "transition-all duration-200",
          "box-border",

          // 添加模式样式
          addable && [
            "border border-dashed",
            "border-[var(--border-neutral)]",
            "text-[var(--text-secondary)]",
            "bg-transparent",
            "cursor-pointer",
            "hover:border-[var(--text-brand)]",
            "hover:text-[var(--text-brand)]",
          ],

          // 默认变体 + 主题（非添加模式）
          !addable &&
            variant === "default" && [
              theme === "brand" && "text-[var(--text-brand)]",
              theme === "success" && "text-[var(--text-success)]",
              theme === "warning" && "text-[var(--text-warning)]",
              theme === "error" && "text-[var(--text-error)]",
              theme === "neutral" && "text-[var(--text-secondary)]",
            ],

          // Solid 变体 + 主题
          !addable &&
            variant === "solid" && [
              "text-white",
              theme === "brand" && "bg-[var(--bg-brand)]",
              theme === "success" && "bg-[var(--bg-success)]",
              theme === "warning" && "bg-[var(--bg-warning)]",
              theme === "error" && "bg-[var(--bg-error)]",
              theme === "neutral" && "bg-[var(--bg-neutral)]",
            ],

          // Outline 变体 + 主题
          !addable &&
            variant === "outline" && [
              "border",
              theme === "brand" && [
                "border-[var(--border-brand)]",
                "text-[var(--text-brand)]",
              ],
              theme === "success" && [
                "border-[var(--border-success)]",
                "text-[var(--text-success)]",
              ],
              theme === "warning" && [
                "border-[var(--border-warning)]",
                "text-[var(--text-warning)]",
              ],
              theme === "error" && [
                "border-[var(--border-error)]",
                "text-[var(--text-error)]",
              ],
              theme === "neutral" && [
                "border-[var(--border-neutral)]",
                "text-[var(--text-secondary)]",
              ],
            ],

          // Filled 变体 + 主题
          !addable &&
            variant === "filled" && [
              "border",
              theme === "brand" && [
                "bg-[var(--bg-brand-light)]",
                "border-[var(--bg-brand-light)]",
                "text-[var(--text-brand)]",
              ],
              theme === "success" && [
                "bg-[var(--bg-success-light)]",
                "border-[var(--bg-success-light)]",
                "text-[var(--text-success)]",
              ],
              theme === "warning" && [
                "bg-[var(--bg-warning-light)]",
                "border-[var(--bg-warning-light)]",
                "text-[var(--text-warning)]",
              ],
              theme === "error" && [
                "bg-[var(--bg-error-light)]",
                "border-[var(--bg-error-light)]",
                "text-[var(--text-error)]",
              ],
              theme === "neutral" && [
                "bg-[var(--bg-neutral-light)]",
                "border-[var(--bg-neutral-light)]",
                "text-[var(--text-secondary)]",
              ],
            ],

          // Filled-outline 变体 + 主题
          !addable &&
            variant === "filled-outline" && [
              "border",
              theme === "brand" && [
                "bg-[var(--bg-brand-light)]",
                "border-[var(--border-brand-light)]",
                "text-[var(--text-brand)]",
              ],
              theme === "success" && [
                "bg-[var(--bg-success-light)]",
                "border-[var(--border-success-light)]",
                "text-[var(--text-success)]",
              ],
              theme === "warning" && [
                "bg-[var(--bg-warning-light)]",
                "border-[var(--border-warning-light)]",
                "text-[var(--text-warning)]",
              ],
              theme === "error" && [
                "bg-[var(--bg-error-light)]",
                "border-[var(--border-error-light)]",
                "text-[var(--text-error)]",
              ],
              theme === "neutral" && [
                "bg-[var(--bg-neutral-light)]",
                "border-[var(--border-neutral-light)]",
                "text-[var(--text-secondary)]",
              ],
            ],

          className,
        )}
        {...props}
      />
    );
  },
);
TagContainerPrimitive.displayName = "TagContainerPrimitive";

/**
 * Tag 前缀图标原语
 */
const TagPrefixIconPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
TagPrefixIconPrimitive.displayName = "TagPrefixIconPrimitive";

/**
 * Tag 文本原语
 */
const TagTextPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return <span ref={ref} className={cn("truncate", className)} {...props} />;
});
TagTextPrimitive.displayName = "TagTextPrimitive";

/**
 * Tag 关闭按钮原语的属性
 */
interface TagCloseButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
}

/**
 * Tag 关闭按钮原语
 */
const TagCloseButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  TagCloseButtonPrimitiveProps
>(({ className, closeIcon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "shrink-0",
        "h-3.5 w-3.5",
        "rounded-sm",
        "opacity-70",
        "hover:opacity-100",
        "transition-opacity",
        "focus:outline-none",
        className,
      )}
      {...props}
    >
      {closeIcon || <X className="h-3 w-3" />}
    </button>
  );
});
TagCloseButtonPrimitive.displayName = "TagCloseButtonPrimitive";

export {
  TagContainerPrimitive,
  TagPrefixIconPrimitive,
  TagTextPrimitive,
  TagCloseButtonPrimitive,
};

export type { TagContainerPrimitiveProps, TagCloseButtonPrimitiveProps };
