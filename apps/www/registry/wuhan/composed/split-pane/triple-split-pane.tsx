"use client";

import * as React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import {
  SplitPaneItem,
  SplitHandle,
} from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export interface TripleSplitPaneProps {
  /**
   * 左侧面板
   */
  leftChildren?: React.ReactNode;
  /**
   * 左侧面板的标题
   */
  leftTitle?: React.ReactNode;
  /**
   * 左侧面板的默认宽度（百分比）
   */
  leftDefaultSize?: number;
  /**
   * 左侧面板的最小宽度（像素）
   */
  leftMinSize?: number;
  /**
   * 左侧面板折叠后的宽度（像素）
   */
  leftCollapsedSize?: number;
  /**
   * 左侧面板的折叠图标
   */
  leftCollapsibleIcon?: React.ReactNode;

  /**
   * 中间面板
   */
  centerChildren?: React.ReactNode;
  /**
   * 中间面板的标题
   */
  centerTitle?: React.ReactNode;
  /**
   * 中间面板的默认宽度（百分比）
   */
  centerDefaultSize?: number;
  /**
   * 中间面板的最小宽度（像素）
   */
  centerMinSize?: number;

  /**
   * 右侧面板
   */
  rightChildren?: React.ReactNode;
  /**
   * 右侧面板的标题
   */
  rightTitle?: React.ReactNode;
  /**
   * 右侧面板的默认宽度（百分比）
   */
  rightDefaultSize?: number;
  /**
   * 右侧面板的最小宽度（像素）
   */
  rightMinSize?: number;
  /**
   * 右侧面板折叠后的宽度（像素）
   */
  rightCollapsedSize?: number;
  /**
   * 右侧面板的折叠图标
   */
  rightCollapsibleIcon?: React.ReactNode;

  /**
   * 容器的类名
   */
  className?: string;
}

export const TripleSplitPane: React.FC<TripleSplitPaneProps> = ({
  leftChildren,
  leftTitle,
  leftDefaultSize = 20,
  leftMinSize = 15,
  leftCollapsedSize = 0,
  leftCollapsibleIcon,
  centerChildren,
  centerTitle,
  centerDefaultSize = 50,
  centerMinSize = 30,
  rightChildren,
  rightTitle,
  rightDefaultSize = 30,
  rightMinSize = 15,
  rightCollapsedSize = 0,
  rightCollapsibleIcon,
  className,
}) => {
  const [isLeftCollapsed, setIsLeftCollapsed] = React.useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = React.useState(false);

  const leftPanelRef = ResizablePrimitive.usePanelRef();
  const rightPanelRef = ResizablePrimitive.usePanelRef();

  const toggleLeftPanel = React.useCallback(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;

    if (isLeftCollapsed) {
      panel.resize(leftDefaultSize);
      setIsLeftCollapsed(false);
    } else {
      panel.collapse();
      setIsLeftCollapsed(true);
    }
  }, [isLeftCollapsed, leftDefaultSize, leftPanelRef]);

  const toggleRightPanel = React.useCallback(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;

    if (isRightCollapsed) {
      panel.resize(rightDefaultSize);
      setIsRightCollapsed(false);
    } else {
      panel.collapse();
      setIsRightCollapsed(true);
    }
  }, [isRightCollapsed, rightDefaultSize, rightPanelRef]);

  return (
    <ResizablePrimitive.Group orientation="horizontal" className={className}>
      {/* 左侧面板 */}
      <SplitPaneItem
        ref={leftPanelRef}
        id="left-panel"
        defaultSize={leftDefaultSize}
        minSize={leftMinSize}
        collapsible={leftCollapsedSize === 0}
        panelTitle={leftTitle}
        collapsibleIcon={
          leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />
        }
        onCollapsibleClick={toggleLeftPanel}
      >
        {leftChildren}
      </SplitPaneItem>

      {/* <SplitHandle withHandle /> */}

      {/* 中间面板 */}
      <SplitPaneItem
        id="center-panel"
        defaultSize={centerDefaultSize}
        minSize={centerMinSize}
        panelTitle={centerTitle}
        showCollapsibleIcon={false}
      >
        {centerChildren}
      </SplitPaneItem>

      {/* <SplitHandle withHandle /> */}

      {/* 右侧面板 */}
      <SplitPaneItem
        ref={rightPanelRef}
        id="right-panel"
        defaultSize={rightDefaultSize}
        minSize={rightMinSize}
        collapsible={rightCollapsedSize === 0}
        panelTitle={rightTitle}
        collapsibleIcon={
          rightCollapsibleIcon || <PanelRight className="h-4 w-4" />
        }
        onCollapsibleClick={toggleRightPanel}
      >
        {rightChildren}
      </SplitPaneItem>
    </ResizablePrimitive.Group>
  );
};

TripleSplitPane.displayName = "TripleSplitPane";
