# Atlas AI - AI 技术导航网站

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/network)
[![GitHub issues](https://img.shields.io/github/issues/m17y/atlas-ai)](https://github.com/m17y/atlas-ai/issues)

一个现代化的人工智能工具与技术发现平台，帮助用户快速找到最新的 AI 工具和资源。

[English](README_EN.md) | 简体中文

</div>

## ✨ 特性
**Atlas AI：你的AI世界基岩与导航图 🔮🧭**

>在信息如星海爆炸的AI时代，Atlas AI 既是支撑你探索的坚实基岩，也是为你指引明路的精密星图。我们整合、筛选并动态>测绘全球AI技术，助你从工具使用者，进阶为生态驾驭者。

核心功能与价值主张：

- **🗺️ 动态图谱，而非静态列表**
我们依据技术关联、应用场景与社区热度，构建动态更新的AI工具图谱。帮你发现未知关联，洞察技术脉络。

 **💎 扛起筛选之重，予你纯粹之轻**
面对每日涌现的新模型、新工具，我们通过严谨评测与分类，为你扛起信息过载的重担，只呈现经得起推敲的精华。

 **🚀 从找到到精通**
不止于导航。关键工具提供深度速览、应用场景指南与生态入口，缩短从“发现”到“上手”的路径。


## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 3](https://tailwindcss.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **图标**: [Lucide React](https://lucide.dev/)
- **构建工具**: Vite

## 📁 项目结构

```
atlas-ai/
├── prompts/              # 项目提示词文档
│   ├── website-prompt.md
│   └── website-prompt-zh.md
├── src/
│   ├── app/             # Next.js App Router 页面
│   │   ├── page.tsx             # 首页
│   │   ├── layout.tsx           # 根布局
│   │   ├── globals.css          # 全局样式
│   │   ├── categories/          # 分类页面
│   │   ├── trending/            # 热门排行页面
│   │   ├── insights/            # 趋势洞察页面
│   │   └── tool/[id]/           # 工具详情页面
│   ├── components/      # React 组件
│   │   ├── Header.tsx           # 导航头部
│   │   ├── Hero.tsx             # 英雄区域
│   │   ├── Featured.tsx         # 精选工具
│   │   ├── Trending.tsx         # 热门工具
│   │   ├── Categories.tsx       # 分类展示
│   │   ├── Latest.tsx           # 最新发布
│   │   ├── Insights.tsx         # 趋势洞察
│   │   └── Footer.tsx           # 页脚
│   └── data/            # 数据文件
│       └── tools.ts             # AI 工具数据
├── public/              # 静态资源
├── package.json
├── tailwind.config.js   # Tailwind 配置
├── tsconfig.json        # TypeScript 配置
└── next.config.js       # Next.js 配置
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

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
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

## 📖 使用说明

### 添加新工具

在 `src/data/tools.ts` 文件中添加新的 AI 工具数据：

```typescript
{
  id: 'tool-id',
  name: '工具名称',
  description: '工具描述',
  category: '分类名称',
  pricing: 'free' | 'paid' | 'freemium',
  rating: 4.5,
  reviewCount: 100,
  tags: ['标签1', '标签2'],
  icon: '图标组件',
  website: 'https://tool-website.com',
  featured: true,      // 是否在精选区域显示
  trending: true,      // 是否在热门区域显示
  latest: true         // 是否在最新区域显示
}
```

### 添加新分类

在 `src/data/categories.ts` 中添加分类数据，并在对应页面中更新分类列表。

### 自定义主题

修改 `tailwind.config.js` 文件来自定义颜色、字体和其他样式：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#...',
        // 自定义颜色
      }
    }
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
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

如果这个项目对你有帮助，请给我们一个 ⭐️！

Made with ❤️ by [m17y](https://github.com/m17y)

</div>
