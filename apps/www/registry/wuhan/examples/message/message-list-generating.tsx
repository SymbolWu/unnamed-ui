"use client";

import { MessageList } from "@/registry/wuhan/composed/message/message-list";
import { useState } from "react";
import { LoadingDots } from "@/registry/wuhan/blocks/message/message-01";
import type {
  MessageItem,
  AIMessageItem,
} from "@/registry/wuhan/composed/message/message-list";

export default function MessageListGenerating() {
  const [messages, setMessages] = useState<(MessageItem | AIMessageItem)[]>([
    { id: "1", role: "user" as const, content: "请帮我分析这段代码" },
    {
      id: "2",
      role: "ai" as const,
      content: "",
      status: "generating" as const,
      generatingContent: (
        <div className="flex items-center gap-2 text-muted-foreground">
          <LoadingDots />
          <span>正在分析...</span>
        </div>
      ),
    },
  ]);

  // 模拟生成完成
  setTimeout(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === "2"
          ? {
              ...msg,
              status: "idle" as const,
              content:
                "分析完成！这段代码实现了一个计数器组件，使用了 React Hooks 来管理状态。",
            }
          : msg,
      ),
    );
  }, 3000);

  return (
    <div className="h-[300px] border rounded-lg overflow-hidden">
      <MessageList messages={messages} />
    </div>
  );
}
