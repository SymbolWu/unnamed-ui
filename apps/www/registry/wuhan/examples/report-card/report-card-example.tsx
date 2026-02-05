"use client";

import { ReportCardPrimitive } from "@/registry/wuhan/blocks/report-card/report-card-01";

export default function ReportCardExample() {
  return (
    <ReportCardPrimitive>
      <div className="text-sm text-[var(--text-primary)]">报告卡片示例内容</div>
    </ReportCardPrimitive>
  );
}
