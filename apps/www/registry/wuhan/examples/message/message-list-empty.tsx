"use client";

import { MessageList } from "@/registry/wuhan/composed/message/message-list";

export default function MessageListEmpty() {
  return (
    <div className="h-[400px] border rounded-lg overflow-hidden">
      <MessageList messages={[]} />
    </div>
  );
}
