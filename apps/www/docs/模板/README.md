# 模板

开发时使用的文档和代码模板。

## 📚 模板列表

- **[组件文档模板.mdx](组件文档模板.mdx)**
  - Composed 组件的文档模板
  - 包含完整的文档结构和示例
  - 使用 MDX 格式

## 🎯 使用方式

### 创建组件文档

1. 复制[组件文档模板.mdx](组件文档模板.mdx)
2. 根据实际组件修改内容：
   - 标题、描述、作者
   - 组件预览和示例
   - API 文档
   - 使用场景
3. 放置到 `apps/www/content/docs/blocks/` 对应分类目录下

### 模板结构

```mdx
---
title: Component Name
description: One-line description
author: Your Name
---

<ComponentPreview name="demo" />

组件说明

## Installation
## API
## Examples
## Usage
```

## 💡 提示

- 使用 CLI 工具（`pnpm component:create`）可以自动基于模板生成文档
- 保持文档结构的一致性，方便用户阅读
- 文档应包含：安装、API、示例、使用场景等完整信息

## 🔄 模板维护

如需修改模板结构：
1. 更新此目录下的模板文件
2. 同步更新 CLI 工具中的模板生成逻辑
3. 已有文档可参考新模板逐步改进
