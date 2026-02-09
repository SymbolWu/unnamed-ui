"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 输入框容器原语
 * 提供输入框的基础容器样式和边框状态
 */
interface BlockInputContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否为危险状态（错误） */
  danger?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为全圆角 */
  fullRounded?: boolean;
  /** 是否为聚焦状态 */
  isFocused?: boolean;
}

const BlockInputContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  BlockInputContainerPrimitiveProps
>(({ className, danger, disabled, fullRounded, isFocused, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center gap-2",
        "px-3 py-2",
        "border",
        "transition-colors duration-200",
        // 圆角
        fullRounded ? "rounded-full" : "rounded-[var(--radius-lg)]",
        // 背景色
        "bg-[var(--background-primary)]",
        // 边框颜色 - 默认状态
        !danger &&
          !disabled &&
          !isFocused &&
          "border-[var(--border-secondary)]",
        // 边框颜色 - hover 状态
        !danger &&
          !disabled &&
          !isFocused &&
          "hover:border-[var(--border-brand)]",
        // 边框颜色 - focus 状态
        !danger && !disabled && isFocused && "border-[var(--border-brand)]",
        // 边框颜色 - danger 状态
        danger && !disabled && "border-[var(--border-error)]",
        danger && !disabled && "hover:border-[var(--border-error)]",
        danger && !disabled && "focus-within:border-[var(--border-error)]",
        // 边框颜色 - disabled 状态
        disabled && "border-[var(--border-secondary)]",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});
BlockInputContainerPrimitive.displayName = "BlockInputContainerPrimitive";

/**
 * 输入框前缀原语
 */
const BlockInputPrefixPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "text-[var(--text-secondary)]",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
BlockInputPrefixPrimitive.displayName = "BlockInputPrefixPrimitive";

/**
 * 输入框后缀原语
 */
const BlockInputSuffixPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "text-[var(--text-secondary)]",
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
});
BlockInputSuffixPrimitive.displayName = "BlockInputSuffixPrimitive";

/**
 * 单行输入框原语
 */
interface BlockInputPrimitiveProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BlockInputPrimitive = React.forwardRef<
  HTMLInputElement,
  BlockInputPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex-1 w-full",
        "bg-transparent",
        "outline-none",
        "text-[var(--text-primary)]",
        "placeholder:text-[var(--text-placeholder)]",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});
BlockInputPrimitive.displayName = "BlockInputPrimitive";

/**
 * 多行输入框原语
 */
interface BlockTextareaPrimitiveProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BlockTextareaPrimitive = React.forwardRef<
  HTMLTextAreaElement,
  BlockTextareaPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex-1 w-full",
        "bg-transparent",
        "outline-none",
        "text-[var(--text-primary)]",
        "placeholder:text-[var(--text-placeholder)]",
        "disabled:cursor-not-allowed",
        "resize-none",
        "min-h-[80px]",
        className,
      )}
      {...props}
    />
  );
});
BlockTextareaPrimitive.displayName = "BlockTextareaPrimitive";

export {
  BlockInputContainerPrimitive,
  BlockInputPrefixPrimitive,
  BlockInputSuffixPrimitive,
  BlockInputPrimitive,
  BlockTextareaPrimitive,
};

export type {
  BlockInputContainerPrimitiveProps,
  BlockInputPrimitiveProps,
  BlockTextareaPrimitiveProps,
};
