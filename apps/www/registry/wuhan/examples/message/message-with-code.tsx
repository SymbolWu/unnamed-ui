"use client";

import { AIMessage } from "@/registry/wuhan/composed/message/message";

export default function MessageWithCode() {
  return (
    <AIMessage status="idle">
      <div className="space-y-2">
        <p>这是一个 React 组件示例：</p>
        <pre className="bg-muted p-3 rounded-md overflow-x-auto">
          <code className="text-sm">{`function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}</code>
        </pre>
      </div>
    </AIMessage>
  );
}
