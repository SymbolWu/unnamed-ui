import { WelcomeMessage } from "@/registry/wuhan/composed/welcome/welcome";
import { SuggestionPanel } from "@/registry/wuhan/composed/suggestion/suggestion";
import { Sparkles, MessageSquare, Code, FileText } from "lucide-react";

export default function WelcomeCompleteEmpty() {
  const suggestions = [
    {
      id: "1",
      label: "开始对话",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: "2",
      label: "生成代码",
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: "3",
      label: "写文章",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="max-w-2xl space-y-8">
        <WelcomeMessage
          icon={<Sparkles className="w-8 h-8 text-primary" />}
          text={
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">你好！我是 AI 助手</h1>
              <p className="text-muted-foreground">
                我可以帮助你解答问题、生成代码、创作内容等
              </p>
            </div>
          }
        />

        <SuggestionPanel
          title="快速开始"
          description="选择一个建议或直接输入你的问题"
          items={suggestions}
        />
      </div>
    </div>
  );
}
