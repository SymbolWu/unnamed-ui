# Composed Next Batch Plan

目标：将第二批 blocks 拆分为原语层（blocks）与业务层（composed），并完成注册与文档/示例同步。

## 范围（候选）
- intervene-form-01
- feedback-01
- sidebar-01
- quote-content-01
- attachment-list-01
- history-item-01
- avatar-header-01
- prompt-01 / prompt-02（合并为单一 composed Prompt）
- suggestion-01
- quick-action-01
- welcome-01

## 计划步骤与进度
1. 组件审计（未开始）
   - 逐个梳理 blocks，明确“原语保留”与“业务封装”边界
   - 明确是否需要新增 composed 的 API、默认文案与交互

2. 创建 composed 组件（未开始）
   - 为每个候选新增 `apps/www/registry/wuhan/composed/<name>/<name>.tsx`
   - 复用 blocks 原语，抽出默认组合结构与 props

3. 注册与分发（未开始）
   - 更新 `apps/www/registry/wuhan/composed/_registry.ts`
   - 校准 `apps/www/registry/wuhan/blocks/_registry.ts` 描述为原语层

4. 示例与文档同步（未开始）
   - 将对应 examples 改为 composed 引用
   - 更新 `apps/www/content/docs/blocks/*.mdx` 的 Manual/CLI 指向 composed

5. 校验（未开始）
   - 跑 lint
   -（若需要）执行 registry 构建脚本

## 当前进度
- 目前仅完成第一批（message/sender/task-list/deep-thinking/execution-result/component-panel）。
- 第二批尚未开始。

## 交付物
- 新增 composed 组件文件
- registry 注册条目
- 示例与文档更新

