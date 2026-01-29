"use client";

import * as React from "react";
import { ComponentPanel } from "@/registry/wuhan/composed/component-panel/component-panel";

export default function ComponentPanelDefault() {
  const [allItems, setAllItems] = React.useState({
    组件1: true,
    组件2: false,
    组件3: true,
    组件4: false,
    组件5: true,
    组件6: false,
    组件7: true,
    组件8: false,
  });

  const [mcpItems, setMcpItems] = React.useState({
    MCP组件1: true,
    MCP组件2: false,
    MCP组件3: true,
    MCP组件4: false,
  });

  const [toolItems, setToolItems] = React.useState({
    工具1: true,
    工具2: false,
    工具3: true,
    工具4: false,
    工具5: true,
  });

  const [workflowItems, setWorkflowItems] = React.useState({
    工作流1: true,
    工作流2: false,
    工作流3: true,
    工作流4: false,
    工作流5: true,
    工作流6: false,
  });

  return (
    <div className="space-y-4 w-full h-full max-w-4xl">
      <ComponentPanel
        defaultTab="all"
        tabs={[
          {
            id: "all",
            label: "全部",
            items: Object.entries(allItems).map(([label, selected]) => ({
              id: label,
              label,
              selected,
              tooltip: label,
              onToggle: () =>
                setAllItems((prev) => ({
                  ...prev,
                  [label]: !prev[label as keyof typeof prev],
                })),
            })),
          },
          {
            id: "mcp",
            label: "MCP",
            items: Object.entries(mcpItems).map(([label, selected]) => ({
              id: label,
              label,
              selected,
              tooltip: label,
              onToggle: () =>
                setMcpItems((prev) => ({
                  ...prev,
                  [label]: !prev[label as keyof typeof prev],
                })),
            })),
          },
          {
            id: "tool",
            label: "工具",
            items: Object.entries(toolItems).map(([label, selected]) => ({
              id: label,
              label,
              selected,
              tooltip: label,
              onToggle: () =>
                setToolItems((prev) => ({
                  ...prev,
                  [label]: !prev[label as keyof typeof prev],
                })),
            })),
          },
          {
            id: "workflow",
            label: "工作流",
            items: Object.entries(workflowItems).map(([label, selected]) => ({
              id: label,
              label,
              selected,
              tooltip: label,
              onToggle: () =>
                setWorkflowItems((prev) => ({
                  ...prev,
                  [label]: !prev[label as keyof typeof prev],
                })),
            })),
          },
        ]}
      />
    </div>
  );
}
