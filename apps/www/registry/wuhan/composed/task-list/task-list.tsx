"use client";

import { useState } from "react";
import { Button } from "@/registry/wuhan/ui/button";

import {
  TaskListContainerPrimitive,
  TaskListHeaderPrimitive,
  TaskListTitlePrimitive,
  TaskListFooterPrimitive,
} from "@/registry/wuhan/blocks/task-list/task-list-01";

import TaskListComposedReadonlyList from "./ReadonlyList";
import TaskListComposedEditableList from "./EditableList";

import type { TaskListComposedProps } from "./types";

/** 组合式待办清单组件 */
export default function TaskListComposed(props: TaskListComposedProps) {
  const {
    dataSource,
    title = "待办清单",
    cancelEditButtonText = "取消",
    modifyButtonText = "修改方案",
    editable = false,
    status = "pending",
    onItemsChange,
    onConfirmExecute,
  } = props;
  const [isEditing, setIsEditing] = useState(false);

  const currentModifyButtonText = isEditing
    ? cancelEditButtonText
    : modifyButtonText;

  const onTriggerEdit = () => {
    setIsEditing(!isEditing);
  };

  const onCloseEdit = () => {
    setIsEditing(false);
  };

  const onStartExecute = () => {
    onConfirmExecute?.();
    onCloseEdit();
  };

  const renderContent = () => {
    if (!isEditing) {
      return <TaskListComposedReadonlyList dataSource={dataSource} />;
    }
    return (
      <TaskListComposedEditableList
        dataSource={dataSource}
        onItemsChange={onItemsChange}
      />
    );
  };

  const renderFooter = () => {
    if (!(status === "pending" && editable)) return null;
    return (
      <TaskListFooterPrimitive>
        <Button
          onClick={onTriggerEdit}
          variant="outline"
          className="font-normal"
        >
          {currentModifyButtonText}
        </Button>
        <Button onClick={onStartExecute} className="font-normal">
          确认并执行
        </Button>
      </TaskListFooterPrimitive>
    );
  };

  return (
    <TaskListContainerPrimitive>
      <TaskListHeaderPrimitive>
        <TaskListTitlePrimitive>{title}</TaskListTitlePrimitive>
      </TaskListHeaderPrimitive>
      {renderContent()}
      {renderFooter()}
    </TaskListContainerPrimitive>
  );
}

export type { TaskListComposedProps };
