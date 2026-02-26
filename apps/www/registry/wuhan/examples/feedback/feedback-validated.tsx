"use client";

import { FeedbackComposed } from "@/registry/wuhan/composed/feedback/feedback";
import { useState } from "react";

export default function FeedbackValidated() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (data: {
    selectedIds: string[];
    inputValue: string;
  }) => {
    // 验证
    if (data.selectedIds.length === 0) {
      setError("请至少选择一个反馈类型");
      return;
    }
    if (!data.inputValue.trim()) {
      setError("请输入详细描述");
      return;
    }

    // 提交
    console.log("提交反馈:", data);
    setError("");
  };

  return (
    <div>
      <FeedbackComposed
        options={[
          { id: "bug", label: "Bug" },
          { id: "feature", label: "功能" },
          { id: "other", label: "其他" },
        ]}
        selectedIds={selectedIds}
        onSelectChange={setSelectedIds}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
