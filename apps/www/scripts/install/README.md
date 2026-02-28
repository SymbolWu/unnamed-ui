# 组件安装脚本

这个目录包含了用于批量安装 Wuhan UI 组件的脚本和配置文件。

## 📁 文件说明

### 核心安装脚本

- **install-components.cjs** ⭐ 推荐
  - Node.js 脚本，跨平台支持（Windows/macOS/Linux）
  - 带进度显示和错误处理
  - 使用 `-y -o` 参数自动覆盖安装
  - 用法：`node install-components.cjs <BASE_URL>`

- **install-all-components.sh**
  - Bash 脚本，适用于 macOS/Linux
  - 使用：`./install-all-components.sh <BASE_URL>`

### 工具脚本

- **test-components-urls.sh**
  - 测试所有组件 JSON 文件的可访问性
  - 部署前验证使用
  - 使用：`./test-components-urls.sh <BASE_URL>`

### 配置文件

- **components-list.json**
  - 所有组件的列表配置
  - 包含组件分类和基础 URL 配置

## 🚀 快速使用

### 本地开发

```bash
# 在项目根目录，确保开发服务器正在运行
cd /path/to/unnamed-ui
pnpm dev

# 在另一个终端执行安装
cd apps/www/scripts/install
node install-components.cjs http://localhost:3000
```

### 生产环境（Vercel 部署后）

```bash
# 用户可以从任何位置执行
curl -fsSL https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs | node - https://your-domain.vercel.app

# 或下载后执行
curl -O https://raw.githubusercontent.com/your-username/unnamed-ui/main/apps/www/scripts/install/install-components.cjs
node install-components.cjs https://your-domain.vercel.app
```

## 📚 文档

- [完整安装指南](../../docs/INSTALL_COMPONENTS.md) - 详细的安装文档
- [快速参考](../../docs/QUICK_REFERENCE.md) - 常用命令速查

## ⚙️ 开发说明

如果需要添加新组件到批量安装列表：

1. 更新 `components-list.json`
2. 在 `install-components.cjs` 和 `install-all-components.sh` 中添加对应的安装命令
3. 在 `test-components-urls.sh` 中添加对应的测试

## 🧪 测试

在部署前，使用测试脚本验证所有组件 JSON 文件可访问：

```bash
# 测试本地开发环境
./test-components-urls.sh http://localhost:3000

# 测试生产环境
./test-components-urls.sh https://your-domain.vercel.app
```
