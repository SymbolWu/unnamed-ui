"use client";

import * as React from "react";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================
// 完全通用的类型，不强制任何业务概念
// 用户可以根据自己的需求定义数据结构

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 文本域样式原语
 * 只提供样式，不包含任何逻辑
 */
export const TextareaPrimitive = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea>
>((props, ref) => {
  return (
    <Textarea
      ref={ref}
      {...props}
      className={cn(
        "resize-none border-none p-0 shadow-none focus-visible:ring-0",
        props.className
      )}
    />
  );
});
TextareaPrimitive.displayName = "TextareaPrimitive";

/**
 * 按钮样式原语
 * 完全通用的按钮组件，不预设任何样式或行为
 */
export const ButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  return <Button ref={ref} {...props} />;
});
ButtonPrimitive.displayName = "ButtonPrimitive";

/**
 * 容器样式原语
 * 提供基础的容器样式，用户完全控制内容
 */
export interface ContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full flex-col rounded-md border p-3 transition-colors has-[:focus-visible]:border-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerPrimitive.displayName = "ContainerPrimitive";

/**
 * 区域容器样式原语
 * 提供基础的区域布局样式，用户完全控制内容
 */
export interface RegionPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 是否显示底部边框
   */
  bordered?: boolean;
  /**
   * 垂直内边距
   */
  verticalPadding?: "none" | "sm" | "md" | "lg";
}

export function RegionPrimitive({
  children,
  className,
  bordered = false,
  verticalPadding = "md",
  ...props
}: RegionPrimitiveProps) {
  const paddingClasses = {
    none: "",
    sm: "py-1",
    md: "py-2",
    lg: "py-3",
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        bordered && "border-b",
        paddingClasses[verticalPadding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * 输入区域样式原语
 * 提供文本域区域的布局样式
 */
export interface InputRegionPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 文本域后的操作按钮区域
   */
  actions?: React.ReactNode;
}

export function InputRegionPrimitive({
  children,
  actions,
  className,
  ...props
}: InputRegionPrimitiveProps) {
  return (
    <div className={cn("flex items-end gap-2", className)} {...props}>
      <div className="flex-1 relative">{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/**
 * 操作栏样式原语
 * 提供底部操作栏的基础样式，用户完全控制内容结构
 */
export interface ActionBarPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ActionBarPrimitive({
  children,
  className,
  ...props
}: ActionBarPrimitiveProps) {
  return (
    <div className={cn("pt-2", className)} {...props}>
      {children}
    </div>
  );
}

// ==================== 导出所有原语 ====================
// 使用 Prompt 前缀避免与 UI 组件库中的组件重名

export {
  TextareaPrimitive as PromptTextarea,
  ButtonPrimitive as PromptButton,
  ContainerPrimitive as PromptContainer,
  RegionPrimitive as PromptRegion,
  InputRegionPrimitive as PromptInputRegion,
  ActionBarPrimitive as PromptActionBar,
};
