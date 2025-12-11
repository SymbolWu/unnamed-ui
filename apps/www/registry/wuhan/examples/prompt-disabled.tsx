"use client";

import {
  PromptContainer,
  PromptTextarea,
  PromptActionBar,
  PromptButton,
} from "@/registry/wuhan/blocks/prompt-01";
import { Search, Send } from "lucide-react";

export default function PromptComposedDisabled() {
  return (
    <PromptContainer className="max-w-2xl opacity-50">
      <PromptTextarea placeholder="Type your message..." disabled />
      <PromptActionBar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PromptButton variant="outline" size="sm" disabled>
            <Search className="size-4" />
            联网搜索
          </PromptButton>
        </div>
        <PromptButton variant="default" size="icon" disabled aria-label="Send">
          <Send className="size-4" />
        </PromptButton>
      </PromptActionBar>
    </PromptContainer>
  );
}
