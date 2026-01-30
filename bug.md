# Bug 修复清单

> **重要提示**：详细的修复记录保存在 [`.bug-records/`](.bug-records/) 目录下，包含完整的问题分析、修复方案和涉及文件。

---

## 历史修复记录

按时间线排序，简要总结每个修复周期。

### 2025-01-31

**本次修复包含 4 项改进**

1. ✅ **社区页面 metadata 导出错误** - 改为服务器组件，直接从 GitHub API 获取数据
2. ✅ **Trending 页面分类过滤** - 点击分类按钮在当前页面过滤展示工具
3. ✅ **教程详情页简化** - 去掉学习进度卡片，改为 wiki 风格侧边栏，支持章节切换
4. ✅ **工具详情页优化** - 去掉评价数量显示，只保留评分

---

### 2025-01-30

**本次修复包含 6 项改进**：[详细记录](./.bug-records/2025-01-30.md)

1. ✅ **Categories 页面分类点击交互优化** - 改为当前页面过滤展示工具
2. ✅ **恢复导航入口** - 添加 trending 和 insights 导航链接
3. ✅ **教程系统** - 创建完整教程系统（数据库、API、页面、示例数据）
4. ✅ **社区页面 GitHub 集成** - 调用 GitHub Issues API 获取真实讨论
5. ✅ **CONTRIBUTING.md** - 创建贡献指南
6. ✅ **Bug 记录系统** - 创建 `.bug-records/` 文件夹和索引文件

---

### 2025-01-29

**本次修复包含 7 项改进**

1. ✅ **分类详情页 404** - 分类页面正常工作
2. ✅ **搜索框功能** - 首页搜索跳转到分类页过滤
3. ✅ **admin/login 404** - 创建独立登录页面
4. ✅ **工具详情 404** - 修复工具 ID 匹配问题
5. ✅ **categories 页面报错** - 修复 tool.category 对象渲染问题
6. ✅ **新页面** - AI新闻、教程、API文档、开源项目、社区
7. ✅ **导航链接** - 新增页面链接到 Header

---

### 2025-01-28

**本次修复包含 1 项改进**

1. ✅ **useState/useEffect 客户端组件错误** - 为 CategoriesClient.tsx 和 community/page.tsx 添加 'use client' 指令

---

## 测试链接

| 功能 | URL |
|------|-----|
| 首页 | http://localhost:3000 |
| 分类页 | http://localhost:3000/categories |
| 排行榜 | http://localhost:3000/trending |
| 社区 | http://localhost:3000/community |
| 教程详情 | http://localhost:3000/tutorials/chatgpt-starter |
| 工具详情 | http://localhost:3000/tool/tool_chatgpt |

---

## 贡献给 AI 时的说明

当需要 AI 帮助修复 bug 时，可以这样提供信息：

### 方式 1：快速修复（简单 bug）
```
请修复以下 bug：
[bug 描述]
[错误信息（如有）]
```

### 方式 2：完整上下文（复杂 bug）
```
请修复 bug.md 中记录的问题。
当前 bug.md 内容：[粘贴 bug.md]
相关记录文件：.bug-records/YYYY-MM-DD.md
新问题描述：[新 bug 的描述]
```

### 方式 3：新增功能
```
请实现以下功能：
[功能描述]
参考现有实现：[相关文件或功能]
```

---

## 记录规范

1. **bug.md**：只记录简要总结，按时间线排序，详细内容链接到 `.bug-records/`
2. **`.bug-records/`**：详细分析文档，每个日期一个文件
3. **不要修改历史记录文件**，保持原貌
4. 新记录以日期命名：`.bug-records/YYYY-MM-DD.md`
