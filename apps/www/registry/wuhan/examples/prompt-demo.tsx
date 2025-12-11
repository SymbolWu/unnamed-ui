"use client";

import { useState } from "react";
import { ComposedPrompt } from "@/registry/wuhan/examples/prompt-composed-demo";
import { 
  Search, 
  Brain, 
  FileText,
  Image,
} from "lucide-react";

export default function PromptDemo() {
  const [value, setValue] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [attachments, setAttachments] = useState([
    {
      id: "attachment-1",
      name: "screenshot.png",
      thumbnail: "https://via.placeholder.com/64",
      size: "2.3 MB",
      icon: Image,
    },
    {
      id: "attachment-2",
      name: "document.pdf",
      size: "1.5 MB",
      icon: FileText,
    }
  ]);

  const modes = [
    { id: "web-search", label: "联网搜索", icon: Search },
    { id: "deep-think", label: "深度思考", icon: Brain },
  ];

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="w-full max-w-2xl text-sm text-muted-foreground mb-2">
        示例：使用组合组件构建的 Prompt
      </div>
      <ComposedPrompt
        value={value}
        onChange={setValue}
        placeholder="输入你的提示..."
        attachments={attachments}
        onAttachmentRemove={(id) =>
          setAttachments((prev) => prev.filter((a) => a.id !== id))
        }
        modes={modes}
        selectedModes={selectedModes}
        onModeToggle={(modeId) =>
          setSelectedModes((prev) =>
            prev.includes(modeId)
              ? prev.filter((id) => id !== modeId)
              : [...prev, modeId]
          )
        }
        onAttach={() => console.log("打开附件选择器")}
        onSend={() => console.log("发送消息:", value)}
        sendDisabled={!value.trim()}
      />
    </div>
  );
}
