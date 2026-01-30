# AI 技术展示网站项目

## 项目概述
创建一个现代化、响应式的网站，用于展示最新的 AI 技术、工具和趋势。网站应该简洁、专业且易于导航。

## 设计风格
- 简约设计，灵感来自 skills.sh
- 简洁现代的美学风格
- 浅色配色方案，带有柔和阴影
- 适用于所有设备的响应式布局
- 平滑的动画和过渡效果

## 技术栈
- 框架：Next.js 14（含 App Router）
- 语言：TypeScript
- 样式：Tailwind CSS 3
- 动画：Framer Motion
- 图标：Lucide React

## 项目结构
```
src/
├── app/
│   ├── page.tsx                    # 首页
│   ├── layout.tsx                  # 根布局
│   ├── globals.css                 # 全局样式
│   ├── categories/
│   │   └── page.tsx                # 分类列表页
│   ├── trending/
│   │   └── page.tsx                # 热门工具排名页
│   ├── insights/
│   │   └── page.tsx                # AI 趋势和见解页
│   └── tool/
│       └── [id]/
│           └── page.tsx            # 工具详情页
├── components/
│   ├── Header.tsx                  # 导航头部
│   ├── Hero.tsx                    # 英雄区域
│   ├── Featured.tsx                # 精选 AI 工具
│   ├── Trending.tsx                # 热门工具区域
│   ├── Categories.tsx              # 分类区域
│   ├── Latest.tsx                  # 最新工具区域
│   ├── Insights.tsx                # 见解区域
│   └── Footer.tsx                  # 页脚
├── data/
│   └── tools.ts                    # AI 工具模拟数据
└── types/
    └── index.ts                    # TypeScript 类型定义
```

## 主要页面和组件

### 首页 (src/app/page.tsx)
按顺序包含以下部分：
1. Header - 带有标志、搜索和链接的粘性导航
2. Hero - 带有标语和 CTA 按钮的大型英雄区域
3. Featured - 精选 AI 工具区域
4. Trending - 热门工具排名
5. Categories - 带有图标的 AI 工具分类
6. Latest - 最新的 AI 工具和发布
7. Insights - AI 技术见解和趋势
8. Footer - 带有链接和信息的页脚

### 分类页 (src/app/categories/page.tsx)
- 所有 AI 工具分类的网格布局
- 每个分类显示：
  - 分类图标
  - 分类名称
  - 工具数量
  - 简要描述
  - 筛选工具的链接

### 热门页 (src/app/trending/page.tsx)
- 按热度排名的 AI 工具列表
- 每个工具卡片显示：
  - 排名数字
  - 工具名称和图标
  - 分类徽章
  - 描述
  - 评分/评价数量
  - 访问按钮

### 见解页 (src/app/insights/page.tsx)
- AI 技术趋势分析
- 关于 AI 发展的文章/帖子
- 统计数据和图表（可选）

### 工具详情页 (src/app/tool/[id]/page.tsx)
- 特定 AI 工具的完整信息
- 包含：
  - 工具名称和标志
  - 分类和标签
  - 详细描述
  - 定价信息（免费/付费/免费增值）
  - 评分和评价
  - 访问网站按钮
  - 截图或预览图片
  - 相关工具

## 数据结构

创建包含以下接口的工具数据文件：
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: 'free' | 'paid' | 'freemium';
  rating: number;
  reviewCount: number;
  tags: string[];
  icon: string;
  website?: string;
  featured?: boolean;
  trending?: boolean;
  latest?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}
```

## 示例数据

包含至少 10 个不同类别的 AI 工具：
- ChatGPT、Claude、Midjourney、Stable Diffusion（图像生成）
- GitHub Copilot、Cursor（代码生成）
- Jasper、Copy.ai（内容写作）
- Runway、Pika（视频生成）
- ElevenLabs、Murf（音频/语音）
- Perplexity、You.com（AI 搜索）

## 样式指南

### Tailwind 配置
- 自定义调色板（主色使用靛蓝/紫色范围）
- 自定义动画（淡入、向上滑动、向下滑动）
- 响应式断点（移动端、平板、桌面端）

### 组件样式
- 卡片：白色背景、圆角、柔和阴影
- 按钮：主色背景、悬停效果
- 徽章：小巧、彩色、圆角
- 排版：简洁的无衬线字体
- 间距：部分之间留有充足的空白

## 实现步骤

1. 初始化 Next.js 项目：
   ```bash
   npx create-next-app@latest ai-tech-hub --typescript --tailwind --eslint
   cd ai-tech-hub
   npm install framer-motion lucide-react clsx tailwind-merge
   ```

2. 创建文件夹结构和文件

3. 实现组件和页面

4. 添加模拟数据

5. 测试响应式和功能

6. 构建和验证

## 关键功能实现
- 响应式导航（含移动端菜单）
- 搜索功能
- 分类筛选
- 平滑的页面过渡
- 卡片悬停效果
- 加载状态
- 错误处理

## 重要说明
- 使用正确的 TypeScript 类型
- 遵循 React 最佳实践
- 确保可访问性（ARIA 标签、键盘导航）
- 优化图片和性能
- 使用语义化 HTML
- 保持一致的设计语言

## 示例参考
设计灵感来自 skills.sh - 简洁、简约、专注于内容展示。
