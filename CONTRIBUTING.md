# 贡献指南

感谢您对 One-Coin AI 项目的兴趣！我们欢迎各种形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 完善文档
- 🔧 提交代码修复
- ✨ 添加新功能
- 🎨 改进 UI/UX

## 如何开始

### 1. Fork 项目

点击页面右上角的 **Fork** 按钮，将项目复制到您的 GitHub 账户。

### 2. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/atlas-ai.git
cd atlas-ai
```

### 3. 安装依赖

```bash
npm install
# 或
yarn install
```

### 4. 创建特性分支

```bash
git checkout -b feature/your-feature-name
```

### 5. 开始开发

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动。

## 项目结构

```
atlas-ai/
├── src/
│   ├── app/                    # Next.js 13+ App Router 页面
│   │   ├── api/               # API 路由
│   │   ├── admin/             # 管理后台
│   │   ├── categories/        # 分类页面
│   │   ├── tutorials/         # 教程页面
│   │   └── ...
│   ├── components/            # React 组件
│   ├── lib/                   # 工具函数和配置
│   └── ...
├── prisma/                    # 数据库 schema 和迁移
├── public/                    # 静态资源
└── ...
```

## 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建或辅助工具更新

示例：

```bash
git commit -m "feat: add new AI tools category"
git commit -m "fix: resolve search functionality bug"
git commit -m "docs: update API documentation"
```

## 添加新 AI 工具

要添加新的 AI 工具到目录中，请：

1. 确保工具符合我们的[收录标准](#收录标准)
2. 在 `/admin/tools` 页面添加工具信息
3. 或通过提交 PR 的方式添加

### 收录标准

- ✅ 必须是基于 AI/ML 的工具或服务
- ✅ 有可访问的网站或 API
- ✅ 描述清晰，功能明确
- ✅ 至少有一个实际用例

## 添加新教程

1. 在管理后台 `/admin/tutorials` 创建新教程
2. 或通过 PR 提交 Markdown 格式的教程

### 教程格式

```markdown
# 教程标题

## 前言
介绍本教程的目标和受众

## 环境准备
列出需要准备的工具和账户

## 步骤
1. 第一步
2. 第二步
...

## 总结
总结所学内容

## 参考资料
相关链接
```

## 报告 Bug

当您发现 Bug 时，请：

1. 搜索现有的 [Issues](https://github.com/m17y/atlas-ai/issues) 确保问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为和实际行为
   - 截图或日志（如有）
   - 环境信息（浏览器、操作系统等）

## 提出建议

如果您有新功能建议，请：

1. 搜索现有的 [Discussions](https://github.com/m17y/atlas-ai/discussions)
2. 如果没有类似讨论，创建新的 Discussion
3. 清晰描述功能需求和使用场景

## 代码规范

### TypeScript

- 使用 TypeScript 编写所有新代码
- 避免使用 `any` 类型，尽量使用具体类型
- 为复杂函数添加类型定义

### React 组件

- 使用函数式组件和 Hooks
- 组件文件名使用 PascalCase
- 保持组件小巧和单一职责

### CSS/Tailwind

- 使用 Tailwind CSS 进行样式开发
- 遵循项目现有的设计规范
- 保持响应式设计

## Pull Request 流程

1. 确保所有测试通过
2. 更新相关文档
3. 提交 PR 时填写模板
4. 等待代码审查
5. 根据反馈进行修改
6. 合并后删除分支

## 获取帮助

- 📧 邮箱：contact@one-coin-ai.com
- 💬 GitHub Discussions：https://github.com/m17y/atlas-ai/discussions
- 🐛 报告 Bug：https://github.com/m17y/atlas-ai/issues

## 行为准则

请阅读我们的[行为准则](CODE_OF_CONDUCT.md)，并遵守社区礼仪。

---

再次感谢您的贡献！🎉
