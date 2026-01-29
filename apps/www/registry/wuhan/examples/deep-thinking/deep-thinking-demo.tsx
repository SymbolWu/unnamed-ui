"use client";

import { DeepThinking } from "@/registry/wuhan/composed/deep-thinking/deep-thinking";

export default function DeepThinkingDemo() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      <DeepThinking
        status="thinking"
        defaultOpen
        content="用户想要了解维度来源的相关信息。这是一个比较开放的问题，需要我从多个角度来思考和组织信息。应该包含定义、常见来源、获取方法等方面的内容，并尽量提供清晰和有用的语言来表达。"
      />
    </div>
  );
}
