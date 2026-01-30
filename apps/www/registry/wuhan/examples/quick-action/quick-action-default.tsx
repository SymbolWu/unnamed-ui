"use client";

import {
  QuickActionButton,
  QuickActionGroup,
} from "@/registry/wuhan/composed/quick-action/quick-action";

export default function QuickActionDefault() {
  return (
    <QuickActionGroup>
      <QuickActionButton onClick={() => alert("帮我总结一下这段内容")}>
        帮我总结一下这段内容
      </QuickActionButton>
      <QuickActionButton onClick={() => alert("给我列一个学习计划")}>
        给我列一个学习计划
      </QuickActionButton>
      <QuickActionButton onClick={() => alert("解释一下这个概念")}>
        解释一下这个概念
      </QuickActionButton>
    </QuickActionGroup>
  );
}
