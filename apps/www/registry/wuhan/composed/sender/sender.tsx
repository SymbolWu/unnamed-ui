"use client";

import * as React from "react";
import {
  SenderTextarea,
  SenderContainer,
  SenderInputRegion,
  SenderActionBar,
  SenderAttachmentButton,
  SenderSendButton,
  SenderModeButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import {
  AttachmentCard,
  AttachmentCardContent,
  AttachmentCardDeleteButton,
  AttachmentCardLeading,
  AttachmentCardMeta,
  AttachmentCardTitle,
  AttachmentList,
} from "@/registry/wuhan/blocks/attachment-list/attachment-list-01";
import { Paperclip, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface AttachmentListWrapperProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
}

function AttachmentListWrapper({
  attachments,
  onRemove,
}: AttachmentListWrapperProps) {
  if (attachments.length === 0) return null;

  return (
    <AttachmentList>
      {attachments.map((attachment) => {
        const Icon = attachment.icon || Paperclip;
        const isImage = !!attachment.thumbnail;
        const fileType = attachment.name?.split(".").pop()?.toUpperCase() || "";
        const meta =
          fileType && attachment.size
            ? `${fileType}·${attachment.size}`
            : attachment.size || fileType;

        return (
          <AttachmentCard
            key={attachment.id}
            variant="outline"
            size="sm"
            className={cn(
              "h-14",
              "flex items-center",
              isImage
                ? "w-14 p-0"
                : "max-w-[200px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
            )}
            onClick={() => {}}
          >
            <AttachmentCardLeading
              className={cn(
                isImage
                  ? "w-full h-full rounded-[var(--radius-xl)]"
                  : "rounded-[var(--radius-lg)] bg-[var(--bg-container)] w-10 h-10",
              )}
            >
              {attachment.thumbnail ? (
                <img
                  src={attachment.thumbnail}
                  alt={attachment.name}
                  className={
                    isImage
                      ? "w-full h-full object-cover"
                      : "size-10 object-cover"
                  }
                />
              ) : (
                <Icon className="size-4" />
              )}
            </AttachmentCardLeading>

            {!isImage && (
              <AttachmentCardContent>
                <AttachmentCardTitle title={attachment.name}>
                  {attachment.name}
                </AttachmentCardTitle>
                {meta && <AttachmentCardMeta>{meta}</AttachmentCardMeta>}
              </AttachmentCardContent>
            )}

            <AttachmentCardDeleteButton
              aria-label="Delete attachment"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(attachment.id);
              }}
            >
              <X className="w-3 h-3 text-[var(--text-tertiary)]" />
            </AttachmentCardDeleteButton>
          </AttachmentCard>
        );
      })}
    </AttachmentList>
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
          <SenderModeButton
            key={mode.id}
            selected={isActive}
            type="button"
            onClick={() => onToggle(mode.id)}
          >
            {Icon && <Icon className="size-4" />}
            {mode.label}
          </SenderModeButton>
        );
      })}
    </div>
  );
}

interface ComposedSenderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  quoteContent?: React.ReactNode;

  attachments?: Attachment[];
  onAttachmentRemove?: (id: string) => void;
  modes?: Mode[];
  selectedModes?: string[];
  onModeToggle?: (modeId: string) => void;

  onAttach?: () => void;
  onSend?: () => void;
  sendDisabled?: boolean;
  generating?: boolean;

  className?: string;
  maxWidth?: string;
}

export function ComposedSender({
  value,
  onChange,
  placeholder = "Type your message...",
  quoteContent,
  attachments = [],
  onAttachmentRemove,
  modes = [],
  selectedModes = [],
  onModeToggle,
  onAttach,
  onSend,
  sendDisabled,
  generating = false,
  className,
  maxWidth = "max-w-2xl",
}: ComposedSenderProps) {
  const canSend = !!value.trim() && !sendDisabled && !generating;

  return (
    <SenderContainer
      className={cn(maxWidth, className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        onSend?.();
      }}
    >
      {quoteContent}

      {attachments.length > 0 && (
        <AttachmentListWrapper
          attachments={attachments}
          onRemove={onAttachmentRemove}
        />
      )}

      <SenderInputRegion>
        <SenderTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </SenderInputRegion>

      <SenderActionBar
        className={cn(
          "flex items-center",
          modes.length > 0 || onAttach ? "justify-between" : "justify-end",
        )}
      >
        <div className="flex items-center gap-2">
          {onAttach && (
            <SenderAttachmentButton
              type="button"
              onClick={onAttach}
              aria-label="Attach file"
            >
              <Paperclip className="size-4" />
            </SenderAttachmentButton>
          )}
          {modes.length > 0 && (
            <ModeSelector
              modes={modes}
              selectedModes={selectedModes}
              onToggle={onModeToggle || (() => {})}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {onSend && (
            <SenderSendButton
              type="submit"
              disabled={sendDisabled}
              generating={generating}
              generatingContent={
                <Loader2 className="size-4 text-white animate-spin" />
              }
            />
          )}
        </div>
      </SenderActionBar>
    </SenderContainer>
  );
}

export type { Attachment, Mode, ComposedSenderProps };
