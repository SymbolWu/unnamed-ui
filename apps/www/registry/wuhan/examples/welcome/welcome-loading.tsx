"use client";

import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function WelcomeLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <WelcomeMessage
        icon={<Loader2 className="w-6 h-6 animate-spin text-primary" />}
        text="正在初始化 AI 助手..."
      />
    );
  }

  return (
    <WelcomeMessage
      icon={<CheckCircle className="w-6 h-6 text-green-500" />}
      text="准备就绪！有什么可以帮你的吗？"
    />
  );
}
