"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { User, Sparkles } from "lucide-react";

export default function WelcomePersonalized() {
  const userName = "张三"; // 实际使用中从状态或 props 获取

  if (userName) {
    return (
      <WelcomeMessage
        icon={<User className="w-6 h-6 text-primary" />}
        text={
          <div className="text-center">
            <p className="text-lg font-medium">欢迎回来，{userName}！</p>
            <p className="text-sm text-muted-foreground mt-1">
              上次对话：2小时前
            </p>
          </div>
        }
      />
    );
  }

  return (
    <WelcomeMessage
      icon={<Sparkles className="w-6 h-6 text-primary" />}
      text="你好！我是 AI 助手，有什么可以帮你的吗？"
    />
  );
}
