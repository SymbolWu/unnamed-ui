#!/bin/bash

# 批量安装所有 Wuhan UI 组件
# 使用方法: 
#   本地开发: bash install-all-components.sh
#   自定义域名: bash install-all-components.sh https://your-domain.com

# 设置基础 URL（支持自定义域名）
BASE_URL="${1:-http://localhost:3000}"

echo "开始批量安装所有组件..."
echo "使用域名: $BASE_URL"
echo "================================"

# 基础组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/avatar.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/progress.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/status-tag.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/tag.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/tooltip.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/custom-sources.json"

# 按钮组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/block-button.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/icon-button.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/prompt.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/quick-action.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/suggestion.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/toggle-button.json"

# 气泡组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/avatar-header.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/confirm-panel.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/dynamic-form.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/feedback.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/message.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/message-list.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/quote-content.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/task-list.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/welcome.json"

# 卡片组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/agent-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/document-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/file-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/goal-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/report-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/select-card.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/task-card.json"

# 输入组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/block-input.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/block-select.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/checkbox.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/radio.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/sender.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/responsive-sender.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/upload.json"

# 布局组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/divider.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/page-header.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/sidebar.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/sources-sidebar.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/triple-split-pane.json"

# 列表组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/attachment-list.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/component-panel.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/history-item.json"

# 步骤组件
npx shadcn@latest add -y "$BASE_URL/r/wuhan/block-accordion.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/deep-thinking.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/execution-result.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/thinking-process.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/thinking-process-01.json"
npx shadcn@latest add -y "$BASE_URL/r/wuhan/thinking-step-item.json"

echo "================================"
echo "所有组件安装完成！"
