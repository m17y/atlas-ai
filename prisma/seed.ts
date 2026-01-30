import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'cat_image',
        name: '图像生成',
        description: 'AI 图像生成和编辑工具',
        icon: 'image',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_code',
        name: '代码生成',
        description: 'AI 编程助手和代码生成工具',
        icon: 'code',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_content',
        name: '内容写作',
        description: 'AI 写作助手和内容创作工具',
        icon: 'pen-tool',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_video',
        name: '视频生成',
        description: 'AI 视频生成和编辑工具',
        icon: 'video',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_audio',
        name: '语音合成',
        description: 'AI 语音合成和音频处理工具',
        icon: 'mic',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_search',
        name: 'AI 搜索',
        description: 'AI 驱动的搜索引擎',
        icon: 'search',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_productivity',
        name: '生产力工具',
        description: '提升工作效率的 AI 工具',
        icon: 'zap',
        count: 0,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_chatbot',
        name: 'AI 对话',
        description: 'AI 聊天机器人和对话工具',
        icon: 'message-circle',
        count: 0,
      },
    }),
  ])

  // Create Tools
  const tools = await Promise.all([
    // Image Generation
    prisma.tool.create({
      data: {
        id: 'tool_chatgpt',
        name: 'ChatGPT',
        description: 'OpenAI 开发的强大 AI 对话助手，支持多语言对话、代码编写、内容创作等',
        categoryId: 'cat_chatbot',
        pricing: 'freemium',
        rating: 4.8,
        reviewCount: 125000,
        tags: JSON.stringify(['对话AI', '写作', '代码', '多语言']),
        icon: 'MessageSquare',
        website: 'https://chat.openai.com',
        featured: true,
        trending: true,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_claude',
        name: 'Claude',
        description: 'Anthropic 开发的 AI 助手，专注于安全、有帮助的对话',
        categoryId: 'cat_chatbot',
        pricing: 'freemium',
        rating: 4.7,
        reviewCount: 45000,
        tags: JSON.stringify(['对话AI', '写作', '分析']),
        icon: 'Bot',
        website: 'https://claude.ai',
        featured: true,
        trending: true,
        latest: true,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_midjourney',
        name: 'Midjourney',
        description: '强大的 AI 图像生成工具，可以从文本描述创建高质量图像',
        categoryId: 'cat_image',
        pricing: 'paid',
        rating: 4.9,
        reviewCount: 89000,
        tags: JSON.stringify(['图像生成', '艺术', '设计']),
        icon: 'Image',
        website: 'https://midjourney.com',
        featured: true,
        trending: true,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_stable_diffusion',
        name: 'Stable Diffusion',
        description: '开源的 AI 图像生成模型，支持本地部署和自定义训练',
        categoryId: 'cat_image',
        pricing: 'free',
        rating: 4.6,
        reviewCount: 78000,
        tags: JSON.stringify(['图像生成', '开源', '本地部署']),
        icon: 'Palette',
        website: 'https://stability.ai',
        featured: true,
        trending: false,
        latest: false,
      },
    }),
    // Code Generation
    prisma.tool.create({
      data: {
        id: 'tool_copilot',
        name: 'GitHub Copilot',
        description: 'GitHub 推出的 AI 编程助手，支持多种编程语言和 IDE',
        categoryId: 'cat_code',
        pricing: 'paid',
        rating: 4.7,
        reviewCount: 156000,
        tags: JSON.stringify(['代码生成', '编程助手', 'IDE插件']),
        icon: 'Code',
        website: 'https://github.com/features/copilot',
        featured: true,
        trending: true,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_cursor',
        name: 'Cursor',
        description: 'AI 优先的代码编辑器，基于 VS Code，提供智能代码补全和重构',
        categoryId: 'cat_code',
        pricing: 'freemium',
        rating: 4.8,
        reviewCount: 34000,
        tags: JSON.stringify(['代码编辑器', 'AI编程', '重构']),
        icon: 'Cpu',
        website: 'https://cursor.sh',
        featured: false,
        trending: true,
        latest: true,
      },
    }),
    // Content Writing
    prisma.tool.create({
      data: {
        id: 'tool_jasper',
        name: 'Jasper',
        description: '企业级 AI 写作助手，帮助创建营销文案、博客文章等',
        categoryId: 'cat_content',
        pricing: 'paid',
        rating: 4.5,
        reviewCount: 28000,
        tags: JSON.stringify(['内容写作', '营销文案', '博客']),
        icon: 'FileText',
        website: 'https://jasper.ai',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_copy_ai',
        name: 'Copy.ai',
        description: 'AI 驱动的文案生成工具，快速创建营销文案和内容',
        categoryId: 'cat_content',
        pricing: 'freemium',
        rating: 4.4,
        reviewCount: 42000,
        tags: JSON.stringify(['文案生成', '营销', '广告']),
        icon: 'Copy',
        website: 'https://copy.ai',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
    // Video Generation
    prisma.tool.create({
      data: {
        id: 'tool_runway',
        name: 'Runway',
        description: 'AI 视频生成和编辑平台，支持文本到视频、图像编辑等功能',
        categoryId: 'cat_video',
        pricing: 'freemium',
        rating: 4.6,
        reviewCount: 23000,
        tags: JSON.stringify(['视频生成', '视频编辑', 'AI创作']),
        icon: 'Film',
        website: 'https://runwayml.com',
        featured: false,
        trending: true,
        latest: true,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_pika',
        name: 'Pika',
        description: '专注于文本到视频生成的 AI 平台，生成高质量短视频',
        categoryId: 'cat_video',
        pricing: 'freemium',
        rating: 4.5,
        reviewCount: 18000,
        tags: JSON.stringify(['视频生成', '短视频', 'AI创作']),
        icon: 'Clapperboard',
        website: 'https://pika.art',
        featured: false,
        trending: true,
        latest: true,
      },
    }),
    // Audio/Voice
    prisma.tool.create({
      data: {
        id: 'tool_elevenlabs',
        name: 'ElevenLabs',
        description: 'AI 语音合成平台，提供自然流畅的文本转语音服务',
        categoryId: 'cat_audio',
        pricing: 'freemium',
        rating: 4.8,
        reviewCount: 56000,
        tags: JSON.stringify(['语音合成', '文本转语音', '配音']),
        icon: 'Mic',
        website: 'https://elevenlabs.io',
        featured: true,
        trending: false,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_murf',
        name: 'Murf',
        description: 'AI 语音生成器，用于创建专业品质的画外音和配音',
        categoryId: 'cat_audio',
        pricing: 'freemium',
        rating: 4.5,
        reviewCount: 19000,
        tags: JSON.stringify(['语音合成', '配音', '画外音']),
        icon: 'Volume2',
        website: 'https://murf.ai',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
    // AI Search
    prisma.tool.create({
      data: {
        id: 'tool_perplexity',
        name: 'Perplexity',
        description: 'AI 驱动的搜索引擎，提供带有来源引用的智能答案',
        categoryId: 'cat_search',
        pricing: 'freemium',
        rating: 4.7,
        reviewCount: 67000,
        tags: JSON.stringify(['AI搜索', '智能答案', '研究']),
        icon: 'Globe',
        website: 'https://perplexity.ai',
        featured: true,
        trending: true,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_you',
        name: 'You.com',
        description: '个性化 AI 搜索引擎，结合搜索和 AI 对话功能',
        categoryId: 'cat_search',
        pricing: 'freemium',
        rating: 4.4,
        reviewCount: 28000,
        tags: JSON.stringify(['AI搜索', '个性化', '对话搜索']),
        icon: 'Search',
        website: 'https://you.com',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
    // Productivity
    prisma.tool.create({
      data: {
        id: 'tool_notion_ai',
        name: 'Notion AI',
        description: 'Notion 中的 AI 助手，帮助写作、总结、翻译等',
        categoryId: 'cat_productivity',
        pricing: 'paid',
        rating: 4.5,
        reviewCount: 45000,
        tags: JSON.stringify(['生产力', '笔记', '协作']),
        icon: 'Layout',
        website: 'https://notion.ai',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
    prisma.tool.create({
      data: {
        id: 'tool_grammarly',
        name: 'Grammarly',
        description: 'AI 驱动的写作助手，提供语法检查、风格建议',
        categoryId: 'cat_productivity',
        pricing: 'freemium',
        rating: 4.6,
        reviewCount: 234000,
        tags: JSON.stringify(['写作助手', '语法检查', '风格优化']),
        icon: 'CheckCircle',
        website: 'https://grammarly.com',
        featured: false,
        trending: false,
        latest: false,
      },
    }),
  ])

  // Update category counts
  for (const category of categories) {
    const count = await prisma.tool.count({
      where: { categoryId: category.id },
    })
    await prisma.category.update({
      where: { id: category.id },
      data: { count },
    })
  }

  console.log(`Created ${categories.length} categories`)
  console.log(`Created ${tools.length} tools`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
