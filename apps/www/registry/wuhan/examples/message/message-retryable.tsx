"use client";

import { AIMessage } from "@/registry/wuhan/composed/message/message";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function MessageRetryable() {
  const [status, setStatus] = useState<"failed" | "generating" | "idle">(
    "failed",
  );
  const [content, setContent] = useState("");

  const handleRetry = () => {
    setStatus("generating");
    // 模拟重试逻辑
    setTimeout(() => {
      setStatus("idle");
      setContent(
        "重试后成功生成的内容：React Hooks 是 React 16.8 引入的新特性，允许你在不编写 class 的情况下使用 state 和其他 React 特性。",
      );
    }, 2000);
  };

  return (
    <div className="h-[300px] w-full border rounded-lg overflow-hidden">
      <AIMessage
        status={status}
        errorContent={
          status === "failed" ? (
            <div className="space-y-3">
              <p className="text-destructive">消息生成失败，请重试</p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                重试
              </button>
            </div>
          ) : undefined
        }
      >
        {status === "idle" ? content : null}
      </AIMessage>
    </div>
  );
}
