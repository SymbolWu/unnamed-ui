"use client";

import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";
import { useState } from "react";

export default function FeedbackAsync() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: {
    selectedIds: string[];
    inputValue: string;
  }) => {
    setLoading(true);
    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("提交反馈:", data);
      setSuccess(true);
    } catch (error) {
      console.error("提交失败:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <div className="text-green-600 p-4 text-center">感谢您的反馈！</div>;
  }

  return (
    <FeedbackComposed
      options={[
        { id: "good", label: "👍 很好" },
        { id: "helpful", label: "有帮助" },
        { id: "bad", label: "👎 不好" },
      ]}
      submitLabel={loading ? "提交中..." : "提交"}
      onSubmit={handleSubmit}
    />
  );
}
