# 安装脚本兼容性说明

## 问题

当在某些项目中执行 `node install-components.js` 时，可能会遇到以下错误：

```
ReferenceError: require is not defined in ES module scope
```

## 原因

- 某些项目的 `package.json` 中设置了 `"type": "module"`
- 这导致 `.js` 文件被当作 ES module 处理
- 但我们的脚本使用了 CommonJS 语法 (`require`)

## 解决方案

我们将安装脚本重命名为 `.cjs` 扩展名：
- **install-components.cjs** - CommonJS 格式
- `.cjs` 扩展名明确告诉 Node.js 这是 CommonJS 模块
- 在所有环境下都能正常工作

## 使用方法

### 本地开发

```bash
cd apps/www/scripts/install
node install-components.cjs http://localhost:3000
```

### 生产环境

```bash
# 下载并执行
curl -O https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs
node install-components.cjs https://your-domain.vercel.app

# 或一行命令
curl -fsSL https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs | node - https://your-domain.vercel.app
```

## 技术细节

### 文件扩展名说明

- `.cjs` - CommonJS 模块（使用 `require`、`module.exports`）
- `.mjs` - ES 模块（使用 `import`、`export`）
- `.js` - 根据 package.json 的 `type` 字段决定

### 为什么选择 .cjs

1. **最大兼容性** - 在所有 Node.js 环境下都能工作
2. **无需配置** - 不依赖项目的 package.json 配置
3. **明确语义** - 文件扩展名明确表示模块类型
4. **避免冲突** - 不会与项目的模块系统冲突

### 其他脚本

- `install-all-components.sh` - Bash 脚本，不受影响
- `test-components-urls.sh` - Bash 脚本，不受影响
- `components-list.json` - JSON 配置文件，不受影响

## 更新内容

已更新以下文档中的所有引用：
- ✅ `apps/www/scripts/install/README.md`
- ✅ `apps/www/docs/用户指南/组件安装指南.md`
- ✅ `apps/www/docs/用户指南/快速参考.md`
- ✅ `apps/www/docs/用户指南/README安装片段.md`
- ✅ 所有其他相关文档

## 验证

测试安装脚本是否正常工作：

```bash
cd /path/to/your-project
node /path/to/install-components.cjs https://unnamed-ui.vercel.app
```

应该可以正常安装组件，不再出现 `require is not defined` 错误。
