"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  TagContainerPrimitive,
  TagPrefixIconPrimitive,
  TagTextPrimitive,
  TagCloseButtonPrimitive,
  type TagVariant,
  type TagTheme,
} from "@/registry/wuhan/blocks/tag/tag-01";

/**
 * Tag 组件的属性
 */
export interface TagProps {
  /** 标签文本 */
  children?: React.ReactNode;
  /** 变体 */
  variant?: TagVariant;
  /** 主题 */
  theme?: TagTheme;
  /** 前缀图标 */
  prefixIcon?: React.ReactNode;
  /** 是否可关闭 */
  closeable?: boolean;
  /** 关闭图标 */
  closeIcon?: React.ReactNode;
  /** 关闭回调 */
  onClose?: () => void;
  /** 是否为添加模式 */
  addable?: boolean;
  /** 添加模式的默认文本 */
  addText?: string;
  /** 点击添加模式标签的回调 */
  onAdd?: () => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * Tag 组件
 * 支持多种变体、主题、可关闭和添加模式
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      variant = "default",
      theme = "brand",
      prefixIcon,
      closeable = false,
      closeIcon,
      onClose,
      addable = false,
      addText = "添加标签",
      onAdd,
      className,
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(true);

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisible(false);
      onClose?.();
    };

    const handleAdd = () => {
      onAdd?.();
    };

    if (!visible) {
      return null;
    }

    return (
      <TagContainerPrimitive
        ref={ref}
        variant={variant}
        theme={theme}
        addable={addable}
        className={className}
        onClick={addable ? handleAdd : undefined}
      >
        {/* 前缀图标 */}
        {(prefixIcon || addable) && (
          <TagPrefixIconPrimitive>
            {addable ? <Plus className="h-3.5 w-3.5" /> : prefixIcon}
          </TagPrefixIconPrimitive>
        )}

        {/* 文本 */}
        <TagTextPrimitive>{addable ? addText : children}</TagTextPrimitive>

        {/* 关闭按钮 */}
        {closeable && !addable && (
          <TagCloseButtonPrimitive
            closeIcon={closeIcon}
            onClick={handleClose}
          />
        )}
      </TagContainerPrimitive>
    );
  },
);

Tag.displayName = "Tag";
