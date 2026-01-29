"use client";

import { DeepThinking } from "@/registry/wuhan/composed/deep-thinking/deep-thinking";

export default function DeepThinkingWithStatus() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 思考中 */}
      <DeepThinking
        status="thinking"
        defaultOpen
        content="用户想要了解维度来源的相关信息。这是一个比较开放的问题，需要我从多个角度来思考和组织信息。应该包含定义、常见来源、获取方法等方面的内容，并尽量提供清晰和有用的语言来表达。"
      />

      {/* 已完成 */}
      <DeepThinking
        status="completed"
        title="已完成思考(用时5秒)"
        content="已完成对问题的深度分析，考虑了用户的需求和上下文，准备提供详细的回复。"
      />

      {/* 失败 */}
      <DeepThinking
        status="failed"
        content="思考过程中遇到了问题，无法继续分析。请稍后再试。"
      />
    </div>
  );
}
