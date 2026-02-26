"use client";

import { MessageList } from "@/registry/wuhan/composed/message/message-list";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type {
  MessageItem,
  AIMessageItem,
} from "@/registry/wuhan/composed/message/message-list";

export default function MessageListRetryable() {
  const [messages, setMessages] = useState<(MessageItem | AIMessageItem)[]>([
    { id: "1", role: "user" as const, content: "请帮我查询数据" },
    {
      id: "2",
      role: "ai" as const,
      content: "",
      status: "failed" as const,
      errorContent: undefined,
    },
  ]);

  const handleRetry = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: "generating" as const,
              content: "",
              errorContent: undefined,
            }
          : msg,
      ),
    );

    // 模拟重新请求
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                status: "idle" as const,
                content: "数据查询成功！这是查询结果...",
              }
            : msg,
        ),
      );
    }, 1500);
  };

  // 设置错误内容
  const secondMessage = messages[1];
  if (
    secondMessage &&
    "status" in secondMessage &&
    secondMessage.status === "failed" &&
    !secondMessage.errorContent
  ) {
    setMessages((prev) =>
      prev.map((msg, index) =>
        index === 1
          ? {
              ...msg,
              errorContent: (
                <div className="flex flex-col gap-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-red-600">请求失败，请稍后重试</p>
                  <button
                    onClick={() => handleRetry(msg.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors w-fit"
                  >
                    <RefreshCw className="w-4 h-4" />
                    重试
                  </button>
                </div>
              ),
            }
          : msg,
      ),
    );
  }

  return (
    <div className="h-[300px] border rounded-lg overflow-hidden">
      <MessageList messages={messages} />
    </div>
  );
}
