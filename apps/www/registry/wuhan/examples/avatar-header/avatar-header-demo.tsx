"use client";

import { AvatarHeaderComposed } from "@/registry/wuhan/composed/avatar-header/avatar-header";

export default function AvatarHeaderDemo() {
  return (
    <div className="flex flex-col gap-[var(--gap-md)]">
      <AvatarHeaderComposed name="User" time="12:25" />
      <AvatarHeaderComposed
        name="AI"
        time="09:10"
        avatar={
          <div className="size-6 rounded-full bg-[var(--bg-brand-light)]" />
        }
      />
    </div>
  );
}
