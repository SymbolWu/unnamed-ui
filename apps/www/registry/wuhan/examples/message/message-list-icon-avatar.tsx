"use client";

import { MessageList } from "@/registry/wuhan/composed/message/message-list";
import { User, Bot } from "lucide-react";

export default function MessageListIconAvatar() {
  const messages = [
    {
      id: "1",
      role: "user" as const,
      content: "你好！",
      avatar: {
        icon: <User className="w-5 h-5" />,
        name: "访客",
        time: "12:00",
      },
    },
    {
      id: "2",
      role: "ai" as const,
      content: "你好！有什么可以帮助你的？",
      status: "idle" as const,
      avatar: {
        icon: <Bot className="w-5 h-5" />,
        name: "AI 助手",
        time: "12:01",
      },
    },
    {
      id: "3",
      role: "user" as const,
      content: "我想了解你的功能",
      avatar: {
        icon: <User className="w-5 h-5" />,
        name: "访客",
        time: "12:02",
      },
    },
  ];

  return (
    <div className="h-[400px] border rounded-lg overflow-hidden">
      <MessageList messages={messages} />
    </div>
  );
}
