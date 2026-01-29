import { type Registry } from "shadcn/schema";

export const composed: Registry["items"] = [
  {
    name: "message",
    type: "registry:block",
    title: "Message",
    description: "Composed AI and user message components",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "composed/message/message.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/message.tsx",
      },
    ],
  },
  {
    name: "sender",
    type: "registry:block",
    title: "Sender",
    description: "Composed sender with attachments and modes",
    registryDependencies: [
      "sender-01",
      "attachment-list-01",
      "quote-content-01",
    ],
    files: [
      {
        path: "composed/sender/sender.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/sender.tsx",
      },
    ],
  },
  {
    name: "task-list",
    type: "registry:block",
    title: "Task List",
    description: "Composed task list with editable mode",
    registryDependencies: ["task-list-01", "sidebar-01", "feedback-01"],
    files: [
      {
        path: "composed/task-list/task-list.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/task-list.tsx",
      },
      {
        path: "composed/task-list/ReadonlyList.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/task-list-readonly.tsx",
      },
      {
        path: "composed/task-list/EditableList.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/task-list-editable.tsx",
      },
      {
        path: "composed/task-list/types.ts",
        type: "registry:component",
        target: "components/wuhan/composed/task-list-types.ts",
      },
    ],
  },
  {
    name: "deep-thinking",
    type: "registry:block",
    title: "Deep Thinking",
    description: "Composed deep thinking collapsible block",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "composed/deep-thinking/deep-thinking.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/deep-thinking.tsx",
      },
    ],
  },
  {
    name: "execution-result",
    type: "registry:block",
    title: "Execution Result",
    description: "Composed execution result list with sections",
    registryDependencies: ["execution-result-01"],
    files: [
      {
        path: "composed/execution-result/execution-result.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/execution-result.tsx",
      },
    ],
  },
  {
    name: "component-panel",
    type: "registry:block",
    title: "Component Panel",
    description: "Composed panel with tabs and selectable items",
    registryDependencies: ["component-panel-01", "tooltip-01"],
    files: [
      {
        path: "composed/component-panel/component-panel.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/component-panel.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item",
    type: "registry:block",
    title: "Thinking Step Item",
    description: "Composed step item with status, timeline, tools, and files",
    registryDependencies: ["thinking-step-item-01"],
    files: [
      {
        path: "composed/thinking-step-item/thinking-step-item.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/thinking-step-item.tsx",
      },
    ],
  },
  {
    name: "thinking-process",
    type: "registry:block",
    title: "Thinking Process",
    description: "Composed thinking process with steps and content blocks",
    registryDependencies: ["thinking-process-01", "thinking-step-item"],
    files: [
      {
        path: "composed/thinking-process/thinking-process.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/thinking-process.tsx",
      },
    ],
  },
];
