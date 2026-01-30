import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { id: 'cat_conversation', name: '对话AI', description: '智能对话和问答系统', icon: '💬', count: 0 },
    { id: 'cat_image', name: '图像生成', description: 'AI图像生成和编辑工具', icon: '🎨', count: 0 },
    { id: 'cat_video', name: '视频生成', description: 'AI视频生成和编辑', icon: '🎬', count: 0 },
    { id: 'cat_audio', name: '音频处理', description: '语音合成和音频处理', icon: '🎵', count: 0 },
    { id: 'cat_code', name: '编程助手', description: 'AI编程辅助工具', icon: '💻', count: 0 },
    { id: 'cat_writing', name: '写作辅助', description: 'AI写作和内容生成', icon: '✍️', count: 0 },
    { id: 'cat_design', name: '设计工具', description: 'AI设计辅助工具', icon: '🎯', count: 0 },
    { id: 'cat_productivity', name: '效率工具', description: '提高工作效率的AI工具', icon: '⚡', count: 0 },
    { id: 'cat_search', name: 'AI 搜索', description: 'AI 驱动的搜索引擎', icon: '🔍', count: 0 },
    { id: 'cat_chatbot', name: '文本对话', description: 'AI 聊天机器人和对话工具', icon: '💬', count: 0 },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category
    })
  }

  const tools = [
    { id: 'tool_chatgpt', name: 'ChatGPT', description: 'OpenAI 开发的强大 AI 对话助手，支持多语言对话、代码编写、内容创作等', categoryId: 'cat_chatbot', pricing: 'freemium', rating: 4.8, reviewCount: 125000, tags: JSON.stringify(['对话AI', '写作', '代码', '多语言']), icon: '🤖', website: 'https://chat.openai.com', featured: true, trending: true, latest: false },
    { id: 'tool_claude', name: 'Claude', description: 'Anthropic 开发的 AI 助手，专注于安全、有帮助的对话', categoryId: 'cat_chatbot', pricing: 'freemium', rating: 4.7, reviewCount: 45000, tags: JSON.stringify(['对话AI', '写作', '分析']), icon: '🧠', website: 'https://claude.ai', featured: true, trending: true, latest: true },
    { id: 'tool_midjourney', name: 'Midjourney', description: '强大的 AI 图像生成工具，可以从文本描述创建高质量图像', categoryId: 'cat_image', pricing: 'paid', rating: 4.9, reviewCount: 89000, tags: JSON.stringify(['图像生成', '艺术', '设计']), icon: '🎨', website: 'https://midjourney.com', featured: true, trending: true, latest: false },
    { id: 'tool_stable_diffusion', name: 'Stable Diffusion', description: '开源的 AI 图像生成模型，支持本地部署和自定义训练', categoryId: 'cat_image', pricing: 'free', rating: 4.6, reviewCount: 78000, tags: JSON.stringify(['图像生成', '开源', '本地部署']), icon: '🎨', website: 'https://stability.ai', featured: true, trending: false, latest: false },
    { id: 'tool_copilot', name: 'GitHub Copilot', description: 'GitHub 推出的 AI 编程助手，支持多种编程语言和 IDE', categoryId: 'cat_code', pricing: 'paid', rating: 4.7, reviewCount: 156000, tags: JSON.stringify(['代码生成', '编程助手', 'IDE插件']), icon: '💻', website: 'https://github.com/features/copilot', featured: true, trending: true, latest: false },
    { id: 'tool_cursor', name: 'Cursor', description: 'AI 优先的代码编辑器，基于 VS Code，提供智能代码补全和重构', categoryId: 'cat_code', pricing: 'freemium', rating: 4.8, reviewCount: 34000, tags: JSON.stringify(['代码编辑器', 'AI编程', '重构']), icon: '💻', website: 'https://cursor.sh', featured: false, trending: true, latest: true },
    { id: 'tool_perplexity', name: 'Perplexity', description: 'AI 驱动的搜索引擎，提供带有来源引用的智能答案', categoryId: 'cat_search', pricing: 'freemium', rating: 4.7, reviewCount: 67000, tags: JSON.stringify(['AI搜索', '智能答案', '研究']), icon: '🔍', website: 'https://perplexity.ai', featured: true, trending: true, latest: false },
    { id: 'tool_elevenlabs', name: 'ElevenLabs', description: 'AI 语音合成平台，提供自然流畅的文本转语音服务', categoryId: 'cat_audio', pricing: 'freemium', rating: 4.8, reviewCount: 56000, tags: JSON.stringify(['语音合成', '文本转语音', '配音']), icon: '🎵', website: 'https://elevenlabs.io', featured: true, trending: false, latest: false },
    { id: 'tool_runway', name: 'Runway', description: 'AI 视频生成和编辑平台，支持文本到视频、图像编辑等功能', categoryId: 'cat_video', pricing: 'freemium', rating: 4.6, reviewCount: 23000, tags: JSON.stringify(['视频生成', '视频编辑', 'AI创作']), icon: '🎬', website: 'https://runwayml.com', featured: false, trending: true, latest: true },
    { id: 'tool_notion_ai', name: 'Notion AI', description: 'Notion 中的 AI 助手，帮助写作、总结、翻译等', categoryId: 'cat_productivity', pricing: 'paid', rating: 4.5, reviewCount: 45000, tags: JSON.stringify(['生产力', '笔记', '协作']), icon: '⚡', website: 'https://notion.ai', featured: false, trending: false, latest: false },
    { id: 'tool_grammarly', name: 'Grammarly', description: 'AI 驱动的写作助手，提供语法检查、风格建议', categoryId: 'cat_writing', pricing: 'freemium', rating: 4.6, reviewCount: 234000, tags: JSON.stringify(['写作助手', '语法检查', '风格优化']), icon: '✍️', website: 'https://grammarly.com', featured: false, trending: false, latest: false },
  ]

  for (const tool of tools) {
    await prisma.tool.upsert({
      where: { id: tool.id },
      update: tool,
      create: tool
    })
  }

  const tutorials = [
    { slug: 'chatgpt-starter', title: 'ChatGPT 入门指南', description: '从零开始学习使用ChatGPT，掌握基本对话技巧和高级功能', content: '# ChatGPT 入门指南\n\n欢迎学习ChatGPT入门教程！本教程将带你从零开始掌握ChatGPT的使用。\n\n## 什么是 ChatGPT？\n\nChatGPT 是 OpenAI 开发的强大 AI 对话助手，可以帮助你完成各种任务。\n\n## 开始使用\n\n1. 访问 chat.openai.com\n2. 注册账号\n3. 开始对话', icon: '🤖', level: '入门', duration: '15分钟', tools: JSON.stringify(['ChatGPT']), chapterCount: 5, published: true },
    { slug: 'midjourney-art', title: 'Midjourney AI绘画教程', description: '学习如何使用Midjourney生成令人惊叹的AI艺术作品', content: '# Midjourney AI绘画教程\n\n欢迎学习Midjourney绘画教程！本教程将教你如何生成AI艺术作品。', icon: '🎨', level: '中级', duration: '30分钟', tools: JSON.stringify(['Midjourney']), chapterCount: 8, published: true },
    { slug: 'copilot-coding', title: 'GitHub Copilot 编程助手', description: '提高编程效率，利用AI辅助完成代码编写和调试', content: '# GitHub Copilot 编程助手\n\n欢迎学习GitHub Copilot教程！本教程将帮助你提高编程效率。', icon: '💻', level: '入门', duration: '20分钟', tools: JSON.stringify(['GitHub Copilot']), chapterCount: 6, published: true },
  ]

  for (const tutorial of tutorials) {
    await prisma.tutorial.upsert({
      where: { slug: tutorial.slug },
      update: tutorial,
      create: tutorial
    })
  }

  const news = [
    { title: 'OpenAI 推出 GPT-4o 模型', date: '2025-01-25', category: '大模型', summary: 'OpenAI 发布了最新的 GPT-4o 模型，支持多模态交互，响应速度更快。', content: '# OpenAI 推出 GPT-4o 模型\n\nOpenAI 今日宣布推出全新的 GPT-4o 模型，这是一个支持多模态交互的 AI 模型。\n\n## 主要特性\n\n- **多模态支持**：可以处理文本、图像和音频\n- **更快响应**：响应速度是之前模型的两倍\n- **更自然对话**：对话更加流畅自然\n\n## 应用场景\n\nGPT-4o 可以应用于各种场景，包括教育、医疗、客服等领域。', image: '🤖', tags: JSON.stringify(['OpenAI', 'GPT-4', '多模态']), published: true },
    { title: 'AI 视频生成技术重大突破', date: '2025-01-22', category: '视频生成', summary: '多家公司发布新一代 AI 视频生成模型，视频质量和生成速度大幅提升。', content: '# AI 视频生成技术重大突破\n\nAI 视频生成领域传来好消息，多家公司发布了新一代模型。\n\n## 技术进步\n\n- 视频分辨率提升至 4K\n- 生成速度加快 50%\n- 更好的物理一致性\n\n## 行业影响\n\n这一突破将极大地改变内容创作行业。', image: '🎬', tags: JSON.stringify(['视频生成', 'AI', '技术突破']), published: true },
    { title: '中国发布新一代大语言模型', date: '2025-01-20', category: '行业动态', summary: '多家中国科技公司发布新一代大语言模型，在中文理解和生成方面表现优异。', content: '# 中国发布新一代大语言模型\n\n中国科技公司纷纷发布新一代大语言模型。\n\n## 主要参与者\n\n- 百度：文心一言\n- 阿里：通义千问\n- 腾讯：混元\n\n## 技术特点\n\n这些模型在中文理解和生成方面表现出色。', image: '🇨🇳', tags: JSON.stringify(['大语言模型', '中国AI', '中文']), published: true },
  ]

  for (const item of news) {
    await prisma.news.create({ data: item })
  }

  console.log('Sample data created!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
