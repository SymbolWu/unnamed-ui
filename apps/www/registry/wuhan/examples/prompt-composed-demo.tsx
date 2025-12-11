"use client";

/**
 * 示例：基于原语组件构建便捷的组合组件
 * 
 * 这个示例展示了如何：
 * 1. 基于原语组件构建业务特定的组合组件
 * 2. 保持完全的可定制性
 * 3. 提供合理的默认值，但不强制使用
 */

import { useState } from "react";
import {
  PromptTextarea,
  PromptButton,
  PromptContainer,
  PromptRegion,
  PromptInputRegion,
  PromptActionBar,
} from "@/registry/wuhan/blocks/prompt-01";
import { Send, Paperclip, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== 业务特定的类型定义 ====================
// 用户可以根据自己的业务需求定义类型

interface Attachment {
  id: string;
  name: string;
  thumbnail?: string;
  size?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Mode {
  id: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// ==================== 业务特定的组合组件 ====================
// 这些组件基于原语构建，提供业务特定的便捷封装
// 但用户仍然可以完全自定义或直接使用原语

interface AttachmentListProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
}

function AttachmentList({ attachments, onRemove }: AttachmentListProps) {
  if (attachments.length === 0) return null;

  return (
    <PromptRegion bordered verticalPadding="sm">
      {attachments.map((attachment) => {
        const Icon = attachment.icon || Paperclip;
        return (
          <PromptButton
            key={attachment.id}
            variant="outline"
            size="sm"
            className="gap-2 h-10 px-2 py-1.5"
            onClick={() => onRemove?.(attachment.id)}
          >
            {attachment.thumbnail ? (
              <img
                src={attachment.thumbnail}
                alt={attachment.name}
                className="size-6 rounded object-cover shrink-0"
              />
            ) : (
              <Icon className="size-4 shrink-0" />
            )}
            <div className="flex flex-col items-start min-w-0 flex-1 justify-center">
              <span className="text-sm font-medium truncate w-full leading-tight">
                {attachment.name}
              </span>
              {attachment.size && (
                <span className="text-xs text-muted-foreground leading-tight">
                  {attachment.size}
                </span>
              )}
            </div>
          </PromptButton>
        );
      })}
    </PromptRegion>
  );
}

interface ModeSelectorProps {
  modes: Mode[];
  selectedModes: string[];
  onToggle: (modeId: string) => void;
}

function ModeSelector({ modes, selectedModes, onToggle }: ModeSelectorProps) {
  if (modes.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = selectedModes.includes(mode.id);
        return (
          <PromptButton
            key={mode.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            aria-pressed={isActive}
            className={cn(
              "gap-1.5 transition-all duration-200",
              isActive && "shadow-sm ring-1 ring-primary/20"
            )}
            onClick={() => onToggle(mode.id)}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-4 transition-opacity duration-200",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              />
            )}
            <span
              className={cn(
                "transition-all duration-200",
                isActive ? "font-medium" : "font-normal"
              )}
            >
              {mode.label}
            </span>
          </PromptButton>
        );
      })}
    </div>
  );
}

// ==================== 高级组合组件 ====================
// 基于原语和业务组件构建的完整 Prompt 组件
// 用户可以完全自定义或直接使用原语

interface ComposedPromptProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;

  // 可选的功能模块
  attachments?: Attachment[];
  onAttachmentRemove?: (id: string) => void;
  modes?: Mode[];
  selectedModes?: string[];
  onModeToggle?: (modeId: string) => void;

  // 按钮
  onAttach?: () => void;
  onSend?: () => void;
  sendDisabled?: boolean;

  // 样式
  className?: string;
  maxWidth?: string;
}

export function ComposedPrompt({
  value,
  onChange,
  placeholder = "Type your message...",
  attachments = [],
  onAttachmentRemove,
  modes = [],
  selectedModes = [],
  onModeToggle,
  onAttach,
  onSend,
  sendDisabled,
  className,
  maxWidth = "max-w-2xl",
}: ComposedPromptProps) {
  return (
    <PromptContainer className={cn(maxWidth, className)}>
      {/* 附件列表 */}
      {attachments.length > 0 && (
        <AttachmentList
          attachments={attachments}
          onRemove={onAttachmentRemove}
        />
      )}

      {/* 输入区域 */}
      <PromptInputRegion>
        <PromptTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </PromptInputRegion>

      {/* 操作栏 */}
      <PromptActionBar
        className={cn(
          "flex items-center",
          modes.length > 0 ? "justify-between" : "justify-end"
        )}
      >
        {modes.length > 0 && (
          <ModeSelector
            modes={modes}
            selectedModes={selectedModes}
            onToggle={onModeToggle || (() => {})}
          />
        )}
        <div className="flex items-center gap-2">
          {onAttach && (
            <PromptButton
              variant="ghost"
              size="icon"
              onClick={onAttach}
              aria-label="Attach file"
            >
              <Paperclip className="size-4" />
            </PromptButton>
          )}
          {onSend && (
            <PromptButton
              variant="default"
              size="icon"
              disabled={sendDisabled}
              onClick={onSend}
              aria-label="Send"
            >
              <Send className="size-4" />
            </PromptButton>
          )}
        </div>
      </PromptActionBar>
    </PromptContainer>
  );
}

// ==================== 使用示例 ====================

export default function PromptComposedDemo() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: "1", name: "screenshot.png", size: "2.3 MB" },
    { id: "2", name: "document.pdf", size: "1.5 MB" },
  ]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  const modes: Mode[] = [
    { id: "web-search", label: "联网搜索", icon: Brain },
    { id: "deep-think", label: "深度思考", icon: Brain },
  ];

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="w-full max-w-2xl text-sm text-muted-foreground mb-2">
        示例：使用组合组件构建的 Prompt（基于原语组件）
      </div>

      <ComposedPrompt
        value={value}
        onChange={setValue}
        placeholder="输入你的提示..."
        attachments={attachments}
        onAttachmentRemove={(id) =>
          setAttachments((prev) => prev.filter((a) => a.id !== id))
        }
        modes={modes}
        selectedModes={selectedModes}
        onModeToggle={(modeId) =>
          setSelectedModes((prev) =>
            prev.includes(modeId)
              ? prev.filter((id) => id !== modeId)
              : [...prev, modeId]
          )
        }
        onAttach={() => console.log("打开附件选择器")}
        onSend={() => console.log("发送消息:", value)}
        sendDisabled={!value.trim()}
      />
    </div>
  );
}
