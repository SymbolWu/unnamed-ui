"use client";

import {
  PromptContainer,
  PromptTextarea,
  PromptActionBar,
  PromptButton,
} from "@/registry/wuhan/blocks/prompt-01";
import { Search, Brain, Send } from "lucide-react";

export default function PromptComposedActive() {
  return (
    <PromptContainer className="max-w-2xl border-primary">
      <PromptTextarea placeholder="Type your message..." />
      <PromptActionBar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PromptButton variant="default" size="sm">
            <Search className="size-4" />
            联网搜索
          </PromptButton>
          <PromptButton variant="outline" size="sm">
            <Brain className="size-4" />
            深度思考
          </PromptButton>
        </div>
        <PromptButton variant="default" size="icon" aria-label="Send">
          <Send className="size-4" />
        </PromptButton>
      </PromptActionBar>
    </PromptContainer>
  );
}
