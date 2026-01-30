"use client";

import {
  PromptButton,
  PromptGroup,
} from "@/registry/wuhan/composed/prompt/prompt";
import { Sparkles, FileText, Lightbulb, BookOpen } from "lucide-react";

export default function PromptVertical() {
  return (
    <PromptGroup variant="vertical">
      <PromptButton
        variant="vertical"
        icon={<Sparkles />}
        onClick={() => alert("总结内容")}
      >
        帮我总结一下这段内容
      </PromptButton>
      <PromptButton
        variant="vertical"
        icon={<FileText />}
        onClick={() => alert("学习计划")}
      >
        给我列一个学习计划
      </PromptButton>
      <PromptButton
        variant="vertical"
        icon={<Lightbulb />}
        onClick={() => alert("解释概念")}
      >
        解释一下这个概念
      </PromptButton>
      <PromptButton
        variant="vertical"
        icon={<BookOpen />}
        onClick={() => alert("推荐资源")}
      >
        推荐一些学习资源
      </PromptButton>
    </PromptGroup>
  );
}
