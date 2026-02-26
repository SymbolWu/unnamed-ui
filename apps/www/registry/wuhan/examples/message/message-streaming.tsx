"use client";

import { AIMessage } from "@/registry/wuhan/composed/message/message";
import { useState, useEffect } from "react";

export default function MessageStreaming() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"generating" | "idle">("generating");

  useEffect(() => {
    // 模拟流式响应
    const fullText =
      "这是一段流式生成的文本。React 是一个用于构建用户界面的 JavaScript 库，由 Meta（原 Facebook）开发和维护。它采用组件化的开发方式，使得代码更易于维护和复用。";
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setContent(fullText.slice(0, index + 1));
        index++;
      } else {
        setStatus("idle");
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[300px] w-full border rounded-lg overflow-hidden">
      <AIMessage
        status={status}
        generatingContent={status === "generating" ? content : undefined}
      >
        {status === "idle" ? content : null}
      </AIMessage>
    </div>
  );
}
