"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Bot } from "lucide-react";

export default function WelcomeFeatures() {
  return (
    <WelcomeMessage
      icon={<Bot className="w-8 h-8 text-primary" />}
      text={
        <div className="max-w-md text-center space-y-3">
          <h2 className="text-2xl font-bold">欢迎使用 AI 助手</h2>
          <p className="text-muted-foreground">我可以帮助你：</p>
          <ul className="text-sm space-y-2 text-left list-disc list-inside">
            <li>解答各种问题</li>
            <li>生成和优化代码</li>
            <li>翻译多种语言</li>
            <li>创作文章和内容</li>
          </ul>
        </div>
      }
    />
  );
}
