"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/registry/wuhan/ui/button";
import {
  SidebarPrimitive,
  SidebarContentPrimitive,
  SidebarDividerPrimitive,
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarNewButtonPrimitive,
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistorySearchPrimitive,
  SidebarHistorySearchContainer,
  SidebarHistorySearchIcon,
  SidebarHistorySearchInput,
  SidebarHistoryListPrimitive,
  SidebarHistoryEmpty,
  SidebarFooterPrimitive,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";
import {
  BlockTooltip,
  BlockTooltipContent,
  BlockTooltipTrigger,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";
import { cn } from "@/lib/utils";

/**
 * 侧边栏头部配置
 * @public
 */
export interface SidebarHeaderConfig {
  /** 标题内容 */
  title: React.ReactNode;
  /** 标题左侧图标 */
  icon?: React.ReactNode;
  /** 右侧操作区域内容，传 null 可隐藏 */
  action?: React.ReactNode;
}

/**
 * 新建按钮配置
 * @public
 */
export interface SidebarNewButtonConfig {
  /** 按钮文本标签 */
  label: React.ReactNode;
  /** 按钮图标 */
  icon?: React.ReactNode;
  /** 点击回调函数 */
  onClick?: () => void;
}

/**
 * 搜索框配置
 * @public
 */
export interface SidebarSearchConfig {
  /** 搜索输入值 */
  value: string;
  /** 输入值变化回调函数 */
  onChange: (value: string) => void;
  /** 占位符文本 */
  placeholder?: string;
  /** 搜索图标 */
  icon?: React.ReactNode;
}

/**
 * 对话历史项数据
 * @public
 */
export interface SidebarConversation {
  /** 对话唯一标识 */
  id: string;
  /** 对话标题 */
  title: React.ReactNode;
  /** 鼠标悬停时显示的右侧操作区域 */
  hoverTrailing?: React.ReactNode;
  /** 点击回调函数 */
  onClick?: () => void;
}

/**
 * 侧边栏组件属性
 * @public
 */
export interface SidebarProps {
  /** 头部配置，传 null 可隐藏头部 */
  header?: SidebarHeaderConfig | null;
  /** 新建按钮配置，传 null 可隐藏新建按钮 */
  newButton?: SidebarNewButtonConfig | null;
  /** 搜索框配置，传 null 可隐藏搜索框 */
  search?: SidebarSearchConfig | null;
  /** 历史区域标题 */
  historyTitle?: React.ReactNode;
  /** 对话历史列表数据（必填） */
  conversations: SidebarConversation[];
  /** 当前选中的对话 ID */
  selectedId?: string | null;
  /** 空状态提示文本 */
  emptyText?: React.ReactNode;
  /**
   * 底部内容
   * - 可以是 ReactNode
   * - 可以是函数，接收 collapsed 状态
   * - 传 null 隐藏底部
   */
  footer?:
    | React.ReactNode
    | null
    | ((state: { collapsed: boolean }) => React.ReactNode);
  /** 受控的折叠状态 */
  collapsed?: boolean;
  /** 非受控时的初始折叠状态 */
  defaultCollapsed?: boolean;
  /** 折叠状态变化回调函数 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 是否显示/启用折叠功能 */
  collapsible?: boolean;
  /** 外层容器自定义类名 */
  className?: string;
  /** 内容区域自定义类名 */
  contentClassName?: string;
}

/**
 * 侧边栏组合组件
 *
 * 开箱即用的侧边栏组件，包含头部、新建按钮、搜索框、历史对话列表和底部区域。
 * 支持展开/收起功能，适用于对话列表、消息历史等场景。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <SidebarComposed
 *   conversations={[
 *     { id: "1", title: "对话 1" },
 *     { id: "2", title: "对话 2" },
 *   ]}
 * />
 *
 * // 完整配置
 * <SidebarComposed
 *   header={{
 *     title: "我的对话",
 *     icon: <MessageSquare className="size-4" />,
 *   }}
 *   newButton={{
 *     label: "新建对话",
 *     onClick: handleNew,
 *   }}
 *   search={{
 *     value: searchValue,
 *     onChange: setSearchValue,
 *   }}
 *   conversations={conversations}
 *   selectedId={currentId}
 *   footer={<UserProfile />}
 * />
 *
 * // 受控折叠
 * <SidebarComposed
 *   collapsed={isCollapsed}
 *   onCollapsedChange={setIsCollapsed}
 *   conversations={conversations}
 * />
 * ```
 *
 * @public
 */
export const SidebarComposed = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      header,
      newButton,
      search,
      historyTitle = "历史对话",
      conversations,
      selectedId,
      emptyText = "暂无对话历史",
      footer,
      collapsed,
      defaultCollapsed,
      onCollapsedChange,
      collapsible = true,
      className,
      contentClassName,
    },
    ref,
  ) => {
    const [internalSearchValue, setInternalSearchValue] = React.useState("");
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(
      defaultCollapsed ?? false,
    );

    const isCollapsed = collapsed ?? uncontrolledCollapsed;

    const setCollapsed = React.useCallback(
      (next: boolean) => {
        if (collapsed == null) {
          setUncontrolledCollapsed(next);
        }
        onCollapsedChange?.(next);
      },
      [collapsed, onCollapsedChange],
    );

    const toggleCollapsed = React.useCallback(() => {
      setCollapsed(!isCollapsed);
    }, [isCollapsed, setCollapsed]);

    const defaultHeaderAction = collapsible ? (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={toggleCollapsed}
        aria-label="收起侧边栏"
        className="text-[var(--text-secondary)] hover:bg-[var(--bg-neutral-light)]"
      >
        <ChevronLeft className="size-4" />
      </Button>
    ) : null;

    const resolvedHeader =
      header === null
        ? null
        : {
            title: header?.title ?? "对话",
            icon: header?.icon ?? <Sparkles className="size-4" />,
            action:
              header?.action === null
                ? null
                : (header?.action ?? defaultHeaderAction),
          };

    const resolvedNewButton =
      newButton === null
        ? null
        : {
            label: newButton?.label ?? "新对话",
            icon: newButton?.icon ?? <Plus className="size-4" />,
            onClick: newButton?.onClick,
          };

    const resolvedSearch =
      search === null
        ? null
        : {
            value: search?.value ?? internalSearchValue,
            onChange: search?.onChange ?? setInternalSearchValue,
            placeholder: search?.placeholder ?? "搜索",
            icon: search?.icon ?? <Search className="size-4" />,
          };

    const iconButtonClassName =
      "text-[var(--text-secondary)] hover:bg-[var(--bg-neutral-light)]";

    const resolvedClassName = cn(
      "w-[240px] min-h-[360px]",
      "rounded-lg border border-[var(--border-neutral)] overflow-hidden bg-[var(--bg-page-secondary)]",
      "transition-[width,padding] duration-200",
      isCollapsed && "w-[56px]",
      className,
    );

    const resolvedContentClassName = cn(
      "p-[var(--padding-com-lg)]",
      isCollapsed && "p-2",
      contentClassName,
    );

    const resolvedFooterClassName = cn(
      "px-[var(--padding-com-lg)] pb-[var(--padding-com-lg)]",
      isCollapsed && "p-2",
    );

    const showDetails = !isCollapsed;
    const resolvedFooter =
      typeof footer === "function"
        ? footer({ collapsed: isCollapsed })
        : footer;

    return (
      <SidebarPrimitive
        ref={ref}
        className={resolvedClassName}
        data-collapsed={isCollapsed ? "true" : undefined}
      >
        <SidebarContentPrimitive className={resolvedContentClassName}>
          {resolvedHeader && (
            <SidebarHeaderPrimitive
              className={cn(
                isCollapsed && "flex-col gap-[var(--gap-sm)] items-center",
              )}
            >
              {isCollapsed ? (
                <>
                  {collapsible && (
                    <BlockTooltip>
                      <BlockTooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={toggleCollapsed}
                          aria-label="展开侧边栏"
                          className={iconButtonClassName}
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                      </BlockTooltipTrigger>
                      <BlockTooltipContent side="right">
                        展开侧边栏
                      </BlockTooltipContent>
                    </BlockTooltip>
                  )}
                  {resolvedNewButton && (
                    <BlockTooltip>
                      <BlockTooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={resolvedNewButton.onClick}
                          aria-label={
                            typeof resolvedNewButton.label === "string"
                              ? resolvedNewButton.label
                              : "新对话"
                          }
                          className={iconButtonClassName}
                        >
                          {resolvedNewButton.icon}
                        </Button>
                      </BlockTooltipTrigger>
                      <BlockTooltipContent side="right">
                        {typeof resolvedNewButton.label === "string"
                          ? resolvedNewButton.label
                          : "新对话"}
                      </BlockTooltipContent>
                    </BlockTooltip>
                  )}
                </>
              ) : (
                <>
                  <SidebarHeaderLeading>
                    {resolvedHeader.icon && (
                      <SidebarHeaderIcon aria-hidden="true">
                        {resolvedHeader.icon}
                      </SidebarHeaderIcon>
                    )}
                    <SidebarHeaderTitle>
                      {resolvedHeader.title}
                    </SidebarHeaderTitle>
                  </SidebarHeaderLeading>
                  {resolvedHeader.action && (
                    <SidebarHeaderAction>
                      {resolvedHeader.action}
                    </SidebarHeaderAction>
                  )}
                </>
              )}
            </SidebarHeaderPrimitive>
          )}

          {showDetails && resolvedNewButton && (
            <div className="mt-[var(--gap-lg)]">
              <SidebarNewButtonPrimitive onClick={resolvedNewButton.onClick}>
                {resolvedNewButton.icon}
                {resolvedNewButton.label}
              </SidebarNewButtonPrimitive>
            </div>
          )}

          {showDetails && (resolvedHeader || resolvedNewButton) && (
            <SidebarDividerPrimitive />
          )}

          {showDetails && (
            <SidebarHistoryPrimitive>
              <SidebarHistoryTitle>{historyTitle}</SidebarHistoryTitle>

              {resolvedSearch && (
                <SidebarHistorySearchPrimitive>
                  <SidebarHistorySearchContainer>
                    {resolvedSearch.icon && (
                      <SidebarHistorySearchIcon>
                        {resolvedSearch.icon}
                      </SidebarHistorySearchIcon>
                    )}
                    <SidebarHistorySearchInput
                      placeholder={resolvedSearch.placeholder ?? "搜索"}
                      value={resolvedSearch.value}
                      onChange={(event) =>
                        resolvedSearch.onChange(event.target.value)
                      }
                      aria-label={resolvedSearch.placeholder ?? "搜索"}
                    />
                  </SidebarHistorySearchContainer>
                </SidebarHistorySearchPrimitive>
              )}

              <SidebarHistoryListPrimitive aria-label="历史对话列表">
                {conversations.length === 0 ? (
                  <SidebarHistoryEmpty>{emptyText}</SidebarHistoryEmpty>
                ) : (
                  conversations.map((conv) => {
                    const isSelected = conv.id === selectedId;
                    return (
                      <HistoryItemPrimitive
                        key={conv.id}
                        className="w-full"
                        data-selected={isSelected ? "true" : undefined}
                        onClick={conv.onClick}
                      >
                        <HistoryItemTitlePrimitive>
                          {conv.title}
                        </HistoryItemTitlePrimitive>
                        {conv.hoverTrailing && (
                          <HistoryItemHoverTrailingPrimitive>
                            {conv.hoverTrailing}
                          </HistoryItemHoverTrailingPrimitive>
                        )}
                      </HistoryItemPrimitive>
                    );
                  })
                )}
              </SidebarHistoryListPrimitive>
            </SidebarHistoryPrimitive>
          )}
        </SidebarContentPrimitive>

        {resolvedFooter && (
          <SidebarFooterPrimitive className={resolvedFooterClassName}>
            {resolvedFooter}
          </SidebarFooterPrimitive>
        )}
      </SidebarPrimitive>
    );
  },
);
SidebarComposed.displayName = "SidebarComposed";

/**
 * @public
 */
export const SidebarSearchInput = SidebarHistorySearchInput;
