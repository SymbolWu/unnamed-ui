# README 安装说明（添加到主 README.md）

## 快速开始

### 一键安装所有组件

使用 Node.js 脚本一次性安装所有 54 个组件：

```bash
# 方式 1: 下载后执行
curl -O https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs
node install-components.cjs https://your-domain.vercel.app

# 方式 2: 一行命令（推荐）
curl -fsSL https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs | node - https://your-domain.vercel.app
```

### 安装单个组件

如果只需要特定组件：

```bash
npx shadcn@latest add -y "https://your-domain.vercel.app/r/wuhan/avatar.json"
```

### 查看所有可用组件

浏览在线文档查看所有 54 个组件：https://your-domain.vercel.app/docs/blocks

或查看本地组件列表：[components-list.json](apps/www/scripts/install/components-list.json)

## 详细安装指南

查看 [完整安装指南](apps/www/docs/INSTALL_COMPONENTS.md) 了解：
- 多种安装方法
- 选择性安装
- 故障排除
- 更新组件

---

## 使用示例

```tsx
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Example() {
  return (
    <Card>
      <Avatar src="/avatar.jpg" />
      <Button>Click me</Button>
    </Card>
  );
}
```

---

**注意**：
1. 安装前请确保项目已初始化 shadcn/ui：`npx shadcn@latest init`
2. 替换上述命令中的域名为你的实际域名
3. 所有安装命令会自动覆盖现有组件，无需手动确认
