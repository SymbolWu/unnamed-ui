"use client";

import {
  UserMessage,
  AIMessage,
} from "@/registry/wuhan/composed/message/message";
import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";
import { FileText } from "lucide-react";

export default function MessageWithAttachment() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* AI 消息：带附件的消息 */}
      <div className="flex justify-start w-full">
        <div className="w-fit max-w-full flex flex-col gap-2">
          <AIMessage>这是 AI 消息</AIMessage>
        </div>
      </div>

      {/* 用户消息：带附件的消息 */}
      <div className="flex justify-end w-full">
        <div className="w-fit max-w-full flex flex-col gap-2">
          <AttachmentListComposed
            items={[
              {
                id: "file-1",
                name: "文件名称.pdf",
                fileType: "PDF",
                fileSize: "14kb",
                icon: <FileText className="size-4" />,
              },
            ]}
          />
          <UserMessage>这是用户消息，上方有附件</UserMessage>
        </div>
      </div>
    </div>
  );
}
