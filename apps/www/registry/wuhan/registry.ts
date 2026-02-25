import { registryItemSchema, type Registry } from "shadcn/schema";
import { z } from "zod";

// import { themes } from "../themes"
import { blocks } from "./blocks/_registry";
import { composed } from "./composed/_registry";
// import { charts } from "./charts/_registry"
import { examples } from "./examples/_registry";
// import { hooks } from "./hooks/_registry"
// import { internal } from "./internal/_registry"
// import { lib } from "./lib/_registry"
import { ui } from "./ui/_registry";
import { recruitmentBlocks } from "./recruitment/_registry";

const DEPRECATED_ITEMS = [
  "toast",
  "toast-demo",
  "toast-destructive",
  "toast-simple",
  "toast-with-action",
  "toast-with-title",
];

// Shared between index and style for backward compatibility.
const NEW_YORK_V4_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: [
    "tw-animate-css",
    "tailwindcss",
    "@tailwindcss/postcss",
    "postcss",
  ],
  registryDependencies: [],
  // 仅使用 files，避免与 cssVars/css 重复导致两套 CSS 文件
  files: [
    {
      path: "style/globals.css",
      type: "registry:style",
      // 不指定 target，shadcn CLI 会从 components.json 的 tailwind.css 读取路径，从而根据项目类型自动判断
    },
    {
      path: "style/postcss.config.mjs",
      type: "registry:style",
      target: "postcss.config.mjs",
    },
  ],
};

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        ...NEW_YORK_V4_STYLE,
      },
      {
        name: "style",
        ...NEW_YORK_V4_STYLE,
      },
      ...ui,
      ...blocks,
      ...composed,
      ...recruitmentBlocks, // Recruitment blocks - easy to remove
      // ...charts,
      // ...lib,
      // ...hooks,
      // ...themes,
      ...examples,
      // ...internal,
    ]
      .filter((item) => {
        return !DEPRECATED_ITEMS.includes(item.name);
      })
      .map((item) => {
        // Temporary fix for dashboard-01.
        if (item.name === "dashboard-01") {
          item.dependencies?.push("@tabler/icons-react");
        }

        if (item.name === "accordion" && "tailwind" in item) {
          delete item.tailwind;
        }

        return item;
      }),
  ),
} satisfies Registry;
