# Atlas AI - AI 技术导航与资源平台

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/network)
[![GitHub issues](https://img.shields.io/github/issues/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/issues)

**Atlas AI：发现、探索、体验前沿人工智能 🔮🧭**

[English](README_EN.md) | 简体中文

</div>

## ✨ 特性

Atlas AI 是一个专注于展示最新人工智能工具、框架和技术的综合平台。

**核心功能**

- 🗺️ **AI 工具导航** - 按分类浏览数百个 AI 工具，发现适合你需求的解决方案
- 📈 **热门排行榜** - 基于社区热度和使用数据展示最受欢迎的 AI 工具
- 📰 **AI 新闻资讯** - 追踪人工智能领域的最新动态和发展趋势
- 📚 **教程系统** - 从入门到精通的系统化 AI 学习路径
- 💬 **社区讨论** - 与其他 AI 爱好者交流经验和见解
- ⚙️ **后台管理** - 完整的内容管理系统，支持工具、分类、新闻和教程管理

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 3](https://tailwindcss.com/)
- **数据库**: [SQLite](https://www.sqlite.org/) + [Prisma](https://www.prisma.io/)
- **图标**: [Lucide React](https://lucide.dev/)
- **编辑器**: [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)

## 📁 项目结构

```
atlas-ai/
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── prompts/                   # 项目提示词文档
│   ├── website-prompt.md      # 英文提示词
│   └── website-prompt-zh.md   # 中文提示词
├── public/                    # 静态资源
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── page.tsx                   # 首页
│   │   ├── layout.tsx                 # 根布局
│   │   ├── globals.css                # 全局样式
│   │   ├── api/                       # API 路由
│   │   │   ├── tools/                 # 工具相关 API
│   │   │   ├── categories/            # 分类相关 API
│   │   │   ├── news/                  # 新闻相关 API
│   │   │   ├── tutorials/             # 教程相关 API
│   │   │   ├── admin/                 # 后台认证 API
│   │   │   └── discussions/           # 社区讨论 API
│   │   ├── admin/                     # 后台管理页面
│   │   │   ├── tools/                 # 工具管理
│   │   │   ├── categories/            # 分类管理
│   │   │   ├── news/                  # 新闻管理
│   │   │   ├── tutorials/             # 教程管理
│   │   │   ├── analytics/             # 数据统计
│   │   │   ├── settings/              # 系统设置
│   │   │   └── login/                 # 后台登录
│   │   ├── categories/                # 分类列表页
│   │   ├── category/[slug]/           # 分类详情页
│   │   ├── trending/                  # 热门排行页
│   │   ├── news/                      # 新闻列表页
│   │   ├── news/[id]/                 # 新闻详情页
│   │   ├── tutorials/                 # 教程列表页
│   │   ├── tutorials/[slug]/          # 教程详情页
│   │   ├── tool/[id]/                 # 工具详情页
│   │   ├── community/                 # 社区页面
│   │   ├── insights/                  # 趋势洞察页
│   │   ├── open-source/               # 开源项目页
│   │   ├── api-docs/                  # API 文档页
│   │   └── login/                     # 用户登录页
│   ├── components/            # React 组件
│   │   ├── Header.tsx                 # 导航头部
│   │   ├── Hero.tsx                   # 英雄区域
│   │   ├── Featured.tsx               # 精选工具
│   │   ├── Trending.tsx               # 热门工具
│   │   ├── Categories.tsx             # 分类展示
│   │   ├── Latest.tsx                 # 最新发布
│   │   ├── Insights.tsx               # 趋势洞察
│   │   └── Footer.tsx                 # 页脚
│   ├── lib/                    # 工具函数和配置
│   │   ├── prisma.ts                   # Prisma 客户端
│   │   ├── api.ts                      # API 工具函数
│   │   └── icons.ts                    # 图标配置
│   └── types/                 # TypeScript 类型定义
├── bug.md                     # Bug 修复记录
├── todo.md                    # TODO 优化清单
├── CONTRIBUTING.md            # 贡献指南
└── package.json
```

## 🚀 快速开始

### 环境要求

- Node.js 18.17.0 或更高版本
- npm、yarn 或 pnpm

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/m17y/atlas-ai.git
cd atlas-ai

# 安装依赖
npm install
```

### 配置环境变量

复制 `.env.example` 到 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

### 初始化数据库

```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# （可选）填充示例数据
npx prisma db seed
```

### 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm run start
```

## 📖 主要页面

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 展示精选、热门、分类等内容 |
| 分类页 | `/categories` | 所有 AI 工具分类 |
| 分类详情 | `/category/[slug]` | 特定分类下的工具 |
| 热门排行 | `/trending` | 按热度排序的工具列表 |
| 工具详情 | `/tool/[id]` | 特定工具的详细信息 |
| 新闻列表 | `/news` | AI 新闻资讯 |
| 新闻详情 | `/news/[id]` | 新闻详细内容 |
| 教程列表 | `/tutorials` | AI 学习教程 |
| 教程详情 | `/tutorials/[slug]` | 教程章节内容 |
| 社区 | `/community` | GitHub 讨论集成 |
| 后台登录 | `/admin/login` | 管理员登录 |

## 🔧 后台管理

访问 [http://localhost:3000/admin/login](http://localhost:3000/admin/login) 进入后台管理。

**默认账号**：
- 用户名: `admin`
- 密码: `password`

### 后台功能

- **工具管理** - 添加、编辑、删除 AI 工具
- **分类管理** - 管理工具分类
- **新闻管理** - 发布和管理新闻资讯
- **教程管理** - 创建和编辑教程（含 Markdown 编辑）
- **统计分析** - 查看平台数据统计
- **系统设置** - 平台配置

## 📦 主要依赖

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@prisma/client": "^5.10.0",
    "lucide-react": "^0.368.0",
    "@uiw/react-md-editor": "^4.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "prisma": "^5.10.0"
  }
}
```

## 🤝 贡献指南

欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解如何参与项目。

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

## 📝 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📧 联系我们

- GitHub Issues: [报告问题](https://github.com/m17y/atlas-ai/issues)
- 项目地址: https://github.com/m17y/atlas-ai

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Lucide Icons](https://lucide.dev/)
- [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)

---

<div align="center">

如果这个项目对你有帮助，请给我们一个 ⭐️！

Made with ❤️ by [m17y](https://github.com/m17y)

</div>
