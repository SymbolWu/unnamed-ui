#!/bin/bash

# 快速测试安装脚本
# 用于验证所有组件 JSON 文件是否可访问

BASE_URL="${1:-http://localhost:3000}"

echo "🔍 测试组件 JSON 文件可访问性..."
echo "使用域名: $BASE_URL"
echo "================================"

components=(
  "avatar" "progress" "status-tag" "tag" "tooltip" "custom-sources"
  "block-button" "icon-button" "prompt" "quick-action" "suggestion" "toggle-button"
  "avatar-header" "confirm-panel" "dynamic-form" "feedback" "message"
  "message-list" "quote-content" "task-list" "welcome"
  "agent-card" "document-card" "file-card" "goal-card" "report-card"
  "select-card" "task-card"
  "block-input" "block-select" "checkbox" "radio" "sender"
  "responsive-sender" "upload"
  "divider" "page-header" "sidebar" "sources-sidebar" "triple-split-pane"
  "attachment-list" "component-panel" "history-item"
  "block-accordion" "deep-thinking" "execution-result" "thinking-process"
  "thinking-process-01" "thinking-step-item"
)

success_count=0
fail_count=0

for component in "${components[@]}"; do
  url="$BASE_URL/r/wuhan/$component.json"
  
  if curl -f -s -o /dev/null "$url"; then
    echo "✅ $component"
    ((success_count++))
  else
    echo "❌ $component - 无法访问: $url"
    ((fail_count++))
  fi
done

echo "================================"
echo "测试完成！"
echo "✅ 成功: $success_count 个"
echo "❌ 失败: $fail_count 个"

if [ $fail_count -gt 0 ]; then
  echo ""
  echo "⚠️  请检查失败的组件 JSON 文件"
  exit 1
else
  echo ""
  echo "🎉 所有组件 JSON 文件都可以正常访问！"
  exit 0
fi
