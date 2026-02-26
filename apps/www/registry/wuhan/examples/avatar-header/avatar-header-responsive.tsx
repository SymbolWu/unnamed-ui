"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";

export default function AvatarHeaderResponsive() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">响应式尺寸:</span>
        <AvatarHeader
          size={{ xs: 20, sm: 24, md: 32, lg: 40 }}
          name="响应式头像"
          time="刚刚"
        />
      </div>
      <div className="text-xs text-muted-foreground">
        提示：调整浏览器窗口大小可以看到头像尺寸的变化
      </div>
    </div>
  );
}
