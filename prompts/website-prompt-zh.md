# AI 技术导航平台项目

## 项目概述

Atlas AI 是一个专注于发现、探索和体验前沿人工智能工具、框架和技术的综合平台。该平台具有 AI 工具导航系统、热门排行、新闻资讯、教程系统以及完整的后台管理系统。

## 设计风格

- 现代简约美学，灵感来自 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 和 [skills.sh](https://skills.sh/)
- 浅色配色方案，带有柔和阴影和圆角
- 响应式布局，支持所有设备（手机、平板、桌面）
- 使用 CSS/Tailwind 实现平滑动画和过渡效果
- 清晰的视觉层次和直观的导航

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **数据库**: SQLite + Prisma ORM
- **图标**: Lucide React
- **Markdown 编辑器**: @uiw/react-md-editor
- **工具库**: clsx, tailwind-merge

## 项目结构

```
src/
├── app/                           # Next.js App Router 页面
│   ├── page.tsx                   # 首页
│   ├── layout.tsx                 # 根布局
│   ├── globals.css                # 全局样式
│   ├── api/                       # API 路由
│   │   ├── tools/                 # 工具 CRUD API
│   │   ├── categories/            # 分类 API
│   │   ├── news/                  # 新闻 API
│   │   ├── tutorials/             # 教程 API
│   │   ├── admin/                 # 后台认证 API
│   │   └── discussions/           # GitHub 讨论 API
│   ├── admin/                     # 后台管理页面
│   │   ├── login/                 # 后台登录
│   │   ├── tools/                 # 工具管理
│   │   ├── categories/            # 分类管理
│   │   ├── news/                  # 新闻管理
│   │   ├── tutorials/             # 教程管理
│   │   ├── analytics/             # 数据统计
│   │   └── settings/              # 系统设置
│   ├── categories/                # 分类列表页
│   ├── category/[slug]/           # 分类详情页
│   ├── trending/                  # 热门排行页
│   ├── news/                      # 新闻列表页
│   ├── news/[id]/                 # 新闻详情页
│   ├── tutorials/                 # 教程列表页
│   ├── tutorials/[slug]/          # 教程详情页（含章节）
│   ├── tool/[id]/                 # 工具详情页
│   ├── community/                 # 社区页面
│   ├── insights/                  # AI 趋势洞察
│   ├── open-source/               # 开源项目页
│   └── api-docs/                  # API 文档页
├── components/                    # React 组件
│   ├── Header.tsx                 # 导航头部
│   ├── Hero.tsx                   # 英雄区域
│   ├── Featured.tsx               # 精选工具
│   ├── Trending.tsx               # 热门工具
│   ├── Categories.tsx             # 分类网格
│   ├── Latest.tsx                 # 最新工具
│   ├── Insights.tsx               # AI 洞察
│   └── Footer.tsx                 # 页脚
├── lib/                           # 工具函数
│   ├── prisma.ts                  # Prisma 客户端
│   ├── api.ts                     # API 工具函数
│   └── icons.ts                   # 图标配置
└── types/                         # TypeScript 类型
```

## 数据库模型 (Prisma)

```prisma
model Tool {
  id          String   @id @default(cuid())
  name        String
  description String
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  pricing     String   // free, paid, freemium
  rating      Float    @default(0)
  reviewCount Int      @default(0)
  tags        String   // JSON 数组存储为字符串
  icon        String
  website     String?
  featured    Boolean  @default(false)
  trending    Boolean  @default(false)
  latest      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  reviews     Review[]
}

model Category {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String
  count       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tools       Tool[]
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  reviews   Review[]
  favorites Favorite[]
}

model Review {
  id        String   @id @default(cuid())
  content   String?
  rating    Float
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  toolId    String
  tool      Tool     @relation(fields: [toolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Favorite {
  id     String @id @default(cuid())
  userId String
  user   User   @relation(fields: [userId], references: [id])
  toolId String
  createdAt DateTime @default(now())
  @@unique([userId, toolId])
}

model Tutorial {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  content     String   // Markdown 内容
  icon        String
  level       String   // beginner, intermediate, advanced
  duration    String   // 例如: "15分钟"
  tools       String   // 工具名称的 JSON 数组
  chapterCount Int     @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  chapters    TutorialChapter[]
}

model TutorialChapter {
  id          String   @id @default(cuid())
  tutorialId  String
  tutorial    Tutorial @relation(fields: [tutorialId], references: [id])
  title       String
  content     String   // Markdown 内容
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model News {
  id        String   @id @default(cuid())
  title     String
  date      String
  category  String
  summary   String
  content   String   // Markdown 内容
  image     String
  tags      String   // JSON 数组存储为字符串
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 主要页面

### 前台页面

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 精选、热门、分类展示 |
| 分类页 | `/categories` | 所有 AI 工具分类 |
| 分类详情 | `/category/[slug]` | 特定分类下的工具 |
| 热门排行 | `/trending` | 热门 AI 工具排名 |
| 工具详情 | `/tool/[id]` | 工具详细信息 |
| 新闻列表 | `/news` | AI 新闻资讯 |
| 新闻详情 | `/news/[id]` | 新闻全文 |
| 教程列表 | `/tutorials` | 学习教程列表 |
| 教程详情 | `/tutorials/[slug]` | 教程内容（含章节） |
| 社区 | `/community` | GitHub 讨论 |
| 后台登录 | `/admin/login` | 管理员认证 |

### 后台管理页面

| 页面 | 路径 | 描述 |
|------|------|------|
| 仪表盘 | `/admin` | 概览统计 |
| 工具管理 | `/admin/tools` | 管理 AI 工具 |
| 分类管理 | `/admin/categories` | 管理分类 |
| 新闻管理 | `/admin/news` | 管理新闻 |
| 教程管理 | `/admin/tutorials` | 管理教程 |
| 统计分析 | `/admin/analytics` | 平台数据统计 |
| 系统设置 | `/admin/settings` | 系统配置 |

## 后台认证

- **默认账号**: admin / password
- **环境变量**: `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- 使用 httpOnly cookie 进行会话管理

## 核心功能

### 前台功能
- 响应式导航（支持移动端菜单）
- 分类搜索功能
- 按分类筛选工具
- 列表分页
- 教程/新闻 Markdown 渲染
- GitHub API 集成（社区讨论）
- 工具提示和悬停效果

### 后台功能
- 工具、分类、新闻、教程的完整 CRUD 操作
- Markdown 编辑器用于内容创作
- 教程章节管理
- 响应式后台布局（侧边栏导航）
- 认证保护
- 加载状态和错误处理

## API 端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/tools` | 获取工具列表（分页） |
| GET | `/api/tools/[id]` | 获取单个工具 |
| POST | `/api/tools` | 创建工具 |
| PUT | `/api/tools/[id]` | 更新工具 |
| DELETE | `/api/tools/[id]` | 删除工具 |
| GET | `/api/categories` | 获取分类列表 |
| GET | `/api/news` | 获取新闻列表 |
| GET | `/api/tutorials` | 获取教程列表 |
| POST | `/api/admin/login` | 后台登录 |

## 实现规范

1. 所有文件使用 TypeScript
2. 遵循 React 最佳实践（hooks, memoization）
3. 确保可访问性（ARIA 标签，键盘导航）
4. 使用语义化 HTML 元素
5. 保持一致的设计语言
6. 优化性能（懒加载，缓存）
7. 优雅处理错误，显示用户友好的消息
8. 所有数据库操作使用 Prisma
9. 保持 API 路由简洁，符合 RESTful 风格

## 样式规范

- 使用 Tailwind CSS 工具类
- 在 `tailwind.config.js` 中自定义颜色（主色：靛蓝/紫色）
- 使用 Tailwind 的比例保持一致的间距
- 圆角（rounded-xl, rounded-2xl）
- 柔和阴影（shadow-sm, shadow-md）
- 平滑过渡（transition-all duration-200）
- 加载动画（spin pulse）
- 交互元素的悬停效果

## 开发命令

```bash
# 安装依赖
npm install

# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 环境变量

```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password"
```
