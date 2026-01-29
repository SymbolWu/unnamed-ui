"use client";

import { ExecutionResult } from "@/registry/wuhan/composed/execution-result/execution-result";

export default function ExecutionResultDefault() {
  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 成功状态 */}
      <ExecutionResult
        defaultOpen
        title="已执行完成，调用3个组件"
        items={[
          {
            status: "success",
            title: "思考完成",
            sections: [
              {
                showCopyIcon: false,
                content:
                  "用户想要了解AI发展的趋势，这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。",
              },
            ],
          },
          {
            status: "success",
            title: "调用成功 search_api",
            defaultOpen: true,
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify(
                  { query: "搜索关键词", limit: 10 },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { query: "搜索关键词", limit: 10 },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 search_api",
                content: JSON.stringify(
                  { results: ["结果1", "结果2", "结果3"] },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { results: ["结果1", "结果2", "结果3"] },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "success",
            title: "调用成功 image_generator",
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify(
                  { prompt: "生成一张图片", style: "realistic" },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { prompt: "生成一张图片", style: "realistic" },
                  null,
                  2,
                ),
              },
              {
                title: "响应来自 image_generator",
                content: JSON.stringify(
                  { image_url: "https://example.com/image.png" },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { image_url: "https://example.com/image.png" },
                  null,
                  2,
                ),
              },
            ],
          },
        ]}
      />

      {/* 失败状态 */}
      <ExecutionResult
        defaultOpen
        title="执行失败，调用2个组件"
        items={[
          {
            status: "error",
            title: "调用失败 api_error",
            sections: [
              {
                title: "请求来自 user",
                content: JSON.stringify({ action: "fetch_data" }, null, 2),
                copyText: JSON.stringify({ action: "fetch_data" }, null, 2),
              },
              {
                title: "错误信息",
                content: JSON.stringify(
                  { error: "Internal Server Error", code: 500 },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { error: "Internal Server Error", code: 500 },
                  null,
                  2,
                ),
              },
            ],
          },
          {
            status: "loading",
            title: "正在重试调用 retry_api",
            sections: [
              {
                title: "请求来自 system",
                content: JSON.stringify(
                  { action: "retry_request", retryCount: 2 },
                  null,
                  2,
                ),
                copyText: JSON.stringify(
                  { action: "retry_request", retryCount: 2 },
                  null,
                  2,
                ),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
