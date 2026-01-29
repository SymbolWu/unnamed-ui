"use client";

import { ExecutionResult } from "@/registry/wuhan/composed/execution-result/execution-result";

export default function ExecutionResultDemo() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      <ExecutionResult
        defaultOpen
        title="已执行完成，调用3个组件"
        items={[
          {
            status: "success",
            title: "调用",
            toolName: "search_api",
            imageSrc: "https://picsum.photos/16/16",
            imageAlt: "Tool icon",
            sections: [
              {
                title: "请求来自 xxx",
                content: "请求内容内容内容",
                copyText: "请求内容内容内容",
              },
              {
                title: "响应来自 xxx",
                content: "响应内容内容内容",
                copyText: "响应内容内容内容",
              },
            ],
          },
          {
            status: "success",
            title: "调用",
            toolName: "search_api",
            imageSrc: "https://picsum.photos/16/16",
            imageAlt: "Tool icon",
            sections: [
              {
                title: "请求来自 xxx",
                content: "请求内容内容内容",
                copyText: "请求内容内容内容",
              },
              {
                title: "响应来自 xxx",
                content: "响应内容内容内容",
                copyText: "响应内容内容内容",
              },
            ],
          },
          {
            status: "success",
            title: "调用",
            toolName: "search_api",
            imageSrc: "https://picsum.photos/16/16",
            imageAlt: "Tool icon",
            defaultOpen: true,
            sections: [
              {
                title: "请求来自 xxx",
                content: "请求内容内容内容",
                copyText: "请求内容内容内容",
              },
              {
                title: "响应来自 xxx",
                content: "响应内容内容内容",
                copyText: "响应内容内容内容",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
