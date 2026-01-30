import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample tutorials
  const tutorials = [
    {
      slug: 'chatgpt-starter',
      title: 'ChatGPT 入门指南',
      description: '从零开始学习使用ChatGPT，掌握基本对话技巧和高级功能',
      content: '# ChatGPT 入门指南\n\n欢迎学习ChatGPT入门教程！本教程将带你从零开始掌握ChatGPT的使用。',
      icon: '💬',
      level: '入门',
      duration: '15分钟',
      tools: JSON.stringify(['ChatGPT']),
      chapterCount: 5,
      published: true
    },
    {
      slug: 'midjourney-art',
      title: 'Midjourney AI绘画教程',
      description: '学习如何使用Midjourney生成令人惊叹的AI艺术作品',
      content: '# Midjourney AI绘画教程\n\n欢迎学习Midjourney绘画教程！本教程将教你如何生成AI艺术作品。',
      icon: '🎨',
      level: '中级',
      duration: '30分钟',
      tools: JSON.stringify(['Midjourney']),
      chapterCount: 8,
      published: true
    },
    {
      slug: 'copilot-coding',
      title: 'GitHub Copilot 编程助手',
      description: '提高编程效率，利用AI辅助完成代码编写和调试',
      content: '# GitHub Copilot 编程助手\n\n欢迎学习GitHub Copilot教程！本教程将帮助你提高编程效率。',
      icon: '💻',
      level: '入门',
      duration: '20分钟',
      tools: JSON.stringify(['GitHub Copilot', 'VS Code']),
      chapterCount: 6,
      published: true
    },
    {
      slug: 'claude-advanced',
      title: 'Claude 高级使用技巧',
      description: '深入了解Claude的功能，学会用它完成复杂任务',
      content: '# Claude 高级使用技巧\n\n欢迎学习Claude高级教程！本教程将深入介绍Claude的强大功能。',
      icon: '🧠',
      level: '高级',
      duration: '25分钟',
      tools: JSON.stringify(['Claude']),
      chapterCount: 7,
      published: true
    },
    {
      slug: 'stable-diffusion',
      title: 'Stable Diffusion 本地部署',
      description: '在自己的电脑上运行Stable Diffusion，实现图像自由',
      content: '# Stable Diffusion 本地部署\n\n欢迎学习Stable Diffusion部署教程！本教程将教你如何在本地运行AI图像生成。',
      icon: '🖼️',
      level: '高级',
      duration: '60分钟',
      tools: JSON.stringify(['Stable Diffusion', 'Python']),
      chapterCount: 12,
      published: true
    }
  ]

  for (const tutorial of tutorials) {
    await prisma.tutorial.upsert({
      where: { slug: tutorial.slug },
      update: tutorial,
      create: tutorial
    })
  }

  console.log('Sample tutorials created!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
