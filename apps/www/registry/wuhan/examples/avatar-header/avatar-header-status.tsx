"use client";

import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

export default function AvatarHeaderStatus() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <AvatarHeader
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Online"
          name="在线用户"
          time="刚刚"
        />
        <StatusTag status="success" text="在线" />
      </div>
      <div className="flex items-center gap-2">
        <AvatarHeader
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Away"
          name="离开用户"
          time="5分钟前"
        />
        <StatusTag status="warning" text="离开" />
      </div>
      <div className="flex items-center gap-2">
        <AvatarHeader
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Offline"
          name="离线用户"
          time="1小时前"
        />
        <StatusTag status="error" text="离线" />
      </div>
    </div>
  );
}
