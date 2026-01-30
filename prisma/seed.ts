import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { id: 'cat_conversation', name: '对话AI', description: '智能对话和问答系统', icon: '💬' },
    { id: 'cat_image', name: '图像生成', description: 'AI图像生成和编辑工具', icon: '🎨' },
    { id: 'cat_video', name: '视频生成', description: 'AI视频生成和编辑', icon: '🎬' },
    { id: 'cat_audio', name: '音频处理', description: '语音合成和音频处理', icon: '🎵' },
    { id: 'cat_code', name: '编程助手', description: 'AI编程辅助工具', icon: '💻' },
    { id: 'cat_writing', name: '写作辅助', description: 'AI写作和内容生成', icon: '✍️' },
    { id: 'cat_design', name: '设计工具', description: 'AI设计辅助工具', icon: '🎯' },
    { id: 'cat_productivity', name: '效率工具', description: '提高工作效率的AI工具', icon: '⚡' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: { ...category, count: 0 }
    })
  }

  console.log('Sample categories created!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
