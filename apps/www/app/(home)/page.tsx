import { Separator } from "@/registry/wuhan/ui/separator";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">unnamed-ui / home</h1>
      <p>
        打开{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{" "}
        你可以看到 设计系统文档 | You can open{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{" "}
        and see the design system documentation.
      </p>

      <p>
        打开{" "}
        <Link href="/themes" className="font-medium underline">
          /themes
        </Link>{" "}
        你可以看到 token / 主题 切换 | You can open{" "}
        <Link href="/themes" className="font-medium underline">
          /themes
        </Link>{" "}
        and see how to customize themes.
      </p>

      <p>
        打开{" "}
        <Link href="/libs" className="font-medium underline">
          /libs
        </Link>{" "}
        你可以看到 ai 聊天框架文档 ｜ You can open{" "}
        <Link href="/libs" className="font-medium underline">
          /libs
        </Link>{" "}
        and see the ai chat framework documentation.
      </p>
      <p>
        打开{" "}
        <Link href="/compositions" className="font-medium underline">
          /compositions
        </Link>{" "}
        你可以看到 不同 chat 的组合 ｜ You can open{" "}
        <Link href="/compositions" className="font-medium underline">
          /compositions
        </Link>{" "}
        and see the ai chat variants.
      </p>
    </div>
  );
}
