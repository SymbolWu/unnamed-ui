"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Globe } from "lucide-react";
import { useState } from "react";

type Language = "zh" | "en" | "ja";

export default function WelcomeMultilingual() {
  const [language] = useState<Language>("zh");

  const messages = {
    zh: "你好！我是 AI 助手，有什么可以帮你的吗？",
    en: "Hello! I'm an AI assistant. How can I help you?",
    ja: "こんにちは！AI アシスタントです。何かお手伝いできますか？",
  };

  return (
    <WelcomeMessage
      icon={<Globe className="w-6 h-6 text-primary" />}
      text={messages[language]}
    />
  );
}
