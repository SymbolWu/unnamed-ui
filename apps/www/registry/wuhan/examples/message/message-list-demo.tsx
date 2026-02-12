"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  MessageList,
  type MessageItem,
  type AIMessageItem,
  type MessageAvatar,
} from "@/registry/wuhan/composed/message/message-list";
import { Button } from "@/registry/wuhan/ui/button";
import { IconButton } from "@/registry/wuhan/composed/icon-button/icon-button";
import {
  Send,
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
} from "lucide-react";

interface FeedbackButtonsProps {
  role: "user" | "ai";
  content?: string;
}

const FeedbackButtons = ({ role, content }: FeedbackButtonsProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-1">
      {/* 复制按钮 - 所有消息都有 */}
      <IconButton
        variant="ghost"
        size="sm"
        color="secondary"
        onClick={handleCopy}
        tooltip={copied ? "已复制" : "复制"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </IconButton>
      {/* 点赞点踩 - 只有 AI 消息有 */}
      {role === "ai" && (
        <>
          <IconButton
            variant="ghost"
            size="sm"
            color="secondary"
            tooltip="有帮助"
          >
            <ThumbsUp className="w-4 h-4" />
          </IconButton>
          <IconButton
            variant="ghost"
            size="sm"
            color="secondary"
            tooltip="没帮助"
          >
            <ThumbsDown className="w-4 h-4" />
          </IconButton>
        </>
      )}
    </div>
  );
};

const defaultMessages: (MessageItem | AIMessageItem)[] = [
  {
    id: "1",
    role: "user",
    content: "你好，我想了解一下 React Hooks",
    timestamp: Date.now() - 60000,
    avatar: {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      name: "用户",
      time: new Date(Date.now() - 60000).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    feedback: (
      <FeedbackButtons role="user" content="你好，我想了解一下 React Hooks" />
    ),
  },
  {
    id: "2",
    role: "ai",
    content: `
# React Hooks 简介

React Hooks 是 React 16.8 引入的新特性，让你在不编写 class 的情况下使用 state 和其他 React 特性。

## 常用 Hooks

1. **useState** - 管理组件状态
2. **useEffect** - 处理副作用
3. **useContext** - 使用 Context

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`
    `,
    timestamp: Date.now() - 50000,
    avatar: {
      src: "https://api.dicebear.com/7.x/bottts/svg?seed=ai",
      name: "AI 助手",
      time: new Date(Date.now() - 50000).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    feedback: <FeedbackButtons role="ai" />,
  },
  {
    id: "3",
    role: "user",
    content: "能举个例子吗？",
    timestamp: Date.now() - 40000,
    avatar: {
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      name: "用户",
      time: new Date(Date.now() - 40000).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    feedback: (
      <FeedbackButtons role="user" content="你好，我想了解一下 React Hooks" />
    ),
  },
];

interface DemoMessageItem extends MessageItem {
  status?: "idle" | "generating" | "failed";
}

export default function MessageListDemo() {
  const [messages, setMessages] = useState<DemoMessageItem[]>(defaultMessages);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "ai" && lastMessage.status === "generating") {
      const timer = setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? {
                  ...msg,
                  status: "idle",
                  content: `
# 当然可以！

\`\`\`jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
\`\`\`

这是一个简单的计数器组件，使用了 **useState** Hook 来管理计数状态。
                  `,
                }
              : msg,
          ),
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: DemoMessageItem = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
      avatar: {
        src: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
        name: "用户",
        time: new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    setTimeout(() => {
      const aiReply: DemoMessageItem = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "",
        status: "generating",
        timestamp: Date.now(),
        avatar: {
          src: "https://api.dicebear.com/7.x/bottts/svg?seed=ai",
          name: "AI 助手",
          time: new Date().toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 500);
  };

  return (
    <div className="flex flex-col w-full h-[600px] border border-[var(--border)] rounded-lg overflow-hidden">
      <div className="flex-1 bg-[var(--bg-primary)]">
        <MessageList
          messages={messages}
          onMessageClick={(msg) => console.log("消息点击:", msg.id)}
        />
      </div>

      <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-secondary)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--bg-brand)]"
          />
          <Button
            variant="default"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4 mr-1" />
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MessageListSimpleDemo() {
  const simpleMessages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "这是一个简单的消息列表示例",
      feedback: (
        <FeedbackButtons role="user" content="你好，我想了解一下 React Hooks" />
      ),
    },
    {
      id: "2",
      role: "ai",
      content: "消息列表支持自动滚动和多种消息状态",
      feedback: <FeedbackButtons role="ai" />,
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList messages={simpleMessages} />
    </div>
  );
}

export function MessageListEmptyDemo() {
  return (
    <div className="w-full max-w-md">
      <MessageList messages={[]} />
    </div>
  );
}

// ==================== 自定义渲染示例 ====================

/**
 * 模拟 Markdown 组件
 * 实际项目中请使用 @/registry/wuhan/composed/markdown
 */
function MockMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-2">
      {content.split("\n").map((line, index) => {
        // 处理标题
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="text-xl font-bold">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="text-lg font-semibold">
              {line.slice(3)}
            </h2>
          );
        }
        // 处理粗体
        const boldText = line.replace(/\*\*(.*?)\*\*/g, "$1");
        // 处理列表
        if (line.trim().startsWith("- ")) {
          return <li key={index}>{boldText}</li>;
        }
        if (line.trim().startsWith("1.")) {
          return <li key={index}>{boldText}</li>;
        }
        // 处理代码块
        if (line.includes("```")) {
          return null;
        }
        if (line.trim().startsWith("`") && line.trim().endsWith("`")) {
          return (
            <code
              key={index}
              className="bg-[var(--bg-neutral-light)] px-1 rounded"
            >
              {line.replace(/`/g, "")}
            </code>
          );
        }
        // 空行
        if (!line.trim()) {
          return <br key={index} />;
        }
        return <p key={index}>{boldText}</p>;
      })}
    </div>
  );
}

export function MessageListWithMarkdownDemo() {
  const messages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "请解释一下什么是闭包？",
    },
    {
      id: "2",
      role: "ai",
      content: `## 闭包的概念

**闭包**（Closure）是 JavaScript 中一个重要的概念。

### 定义
闭包是指一个函数可以访问其词法作用域外的变量，即使该函数在其作用域外执行。

### 示例
\`\`\`js
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`
`,
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList
        messages={messages}
        renderContent={(content, msg) => {
          // AI 消息使用 Markdown 渲染
          if (msg.role === "ai" && typeof content === "string") {
            return <MockMarkdown content={content} />;
          }
          return content;
        }}
      />
    </div>
  );
}

export function MessageListCustomRenderDemo() {
  const messages = [
    {
      id: "1",
      role: "user" as const,
      content: "查看订单状态",
    },
    {
      id: "2",
      role: "ai" as const,
      content: {
        type: "order_card",
        data: {
          orderId: "ORD-2024-001",
          status: "已发货",
          items: ["商品 A", "商品 B"],
          total: 299.0,
        },
      },
    },
    {
      id: "3",
      role: "user" as const,
      content: "再买一件",
    },
  ] as (MessageItem | AIMessageItem)[];

  return (
    <div className="w-full max-w-md">
      <MessageList
        messages={messages}
        renderContent={(content, msg) => {
          // 自定义渲染订单卡片
          if (
            msg.role === "ai" &&
            typeof content === "object" &&
            content !== null &&
            "type" in content &&
            (content as unknown as { type: string }).type === "order_card"
          ) {
            const orderData = (
              content as unknown as {
                data: {
                  orderId: string;
                  status: string;
                  items: string[];
                  total: number;
                };
              }
            ).data;
            return (
              <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                <div className="font-semibold">订单信息</div>
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  <div>订单号: {orderData.orderId}</div>
                  <div>状态: {orderData.status}</div>
                  <div>商品: {orderData.items.join(", ")}</div>
                  <div className="font-medium mt-1">
                    合计: ¥{orderData.total}
                  </div>
                </div>
              </div>
            );
          }
          return content;
        }}
      />
    </div>
  );
}

export function MessageListFullCustomDemo() {
  const messages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "你好！",
    },
    {
      id: "2",
      role: "ai",
      content: "你好！有什么可以帮助你的？",
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList
        messages={messages}
        // 完全自定义消息渲染
        renderMessage={(message, defaultRender) => {
          // 为失败的消息添加重试按钮
          const aiMsg = message as AIMessageItem;
          if (aiMsg.status === "failed") {
            return (
              <div className="relative group">
                {defaultRender()}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => console.log("重试消息:", message.id)}
                >
                  重试
                </Button>
              </div>
            );
          }
          // 为特定消息添加特殊样式
          if (message.id === "1") {
            return (
              <div className="transform scale-105 transition-transform">
                {defaultRender()}
              </div>
            );
          }
          return defaultRender();
        }}
      />
    </div>
  );
}

// ==================== 带头像的示例 ====================

export function MessageListWithAvatarDemo() {
  const messages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "你好，我想咨询一下产品",
      avatar: {
        src: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        name: "张三",
        time: "10:30",
      },
      feedback: (
        <FeedbackButtons role="user" content="你好，我想了解一下 React Hooks" />
      ),
    },
    {
      id: "2",
      role: "ai",
      content: "你好！很高兴为您服务。请问有什么可以帮您？",
      avatar: {
        src: "https://api.dicebear.com/7.x/bottts/svg?seed=SupportBot",
        name: "智能客服",
        time: "10:31",
      },
      feedback: <FeedbackButtons role="ai" />,
    },
    {
      id: "3",
      role: "user",
      content: "你们的AI助手有什么特色功能？",
      avatar: {
        src: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        name: "张三",
        time: "10:32",
      },
      feedback: (
        <FeedbackButtons role="user" content="你好，我想了解一下 React Hooks" />
      ),
    },
    {
      id: "4",
      role: "ai",
      content:
        "我们的AI助手有以下特色功能：\n1. 智能对话\n2. 多语言支持\n3. 个性化推荐",
      avatar: {
        src: "https://api.dicebear.com/7.x/bottts/svg?seed=SupportBot",
        name: "智能客服",
        time: "10:33",
      },
      feedback: <FeedbackButtons role="ai" />,
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList messages={messages} />
    </div>
  );
}

// ==================== 自定义图标头像示例 ====================

export function MessageListWithIconAvatarDemo() {
  const messages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "你好！",
      avatar: {
        icon: <User className="w-5 h-5" />,
        name: "访客",
        time: "12:00",
      },
    },
    {
      id: "2",
      role: "ai",
      content: "你好！有什么可以帮助你的？",
      avatar: {
        icon: <Bot className="w-5 h-5" />,
        name: "AI 助手",
        time: "12:01",
      },
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList messages={messages} />
    </div>
  );
}

// ==================== 不同尺寸头像示例 ====================

export function MessageListAvatarSizesDemo() {
  const messages: (MessageItem | AIMessageItem)[] = [
    {
      id: "1",
      role: "user",
      content: "小头像",
      avatar: {
        icon: <User className="w-3 h-3" />,
        size: "small",
        name: "小",
        time: "12:00",
      },
    },
    {
      id: "2",
      role: "ai",
      content: "默认尺寸头像",
      avatar: {
        icon: <Bot className="w-5 h-5" />,
        size: "default",
        name: "默认",
        time: "12:01",
      },
    },
    {
      id: "3",
      role: "user",
      content: "大头像",
      avatar: {
        icon: <User className="w-7 h-7" />,
        size: "large",
        name: "大",
        time: "12:02",
      },
    },
  ];

  return (
    <div className="w-full max-w-md">
      <MessageList messages={messages} />
    </div>
  );
}
