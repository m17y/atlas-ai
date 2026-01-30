import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { BookOpen, ExternalLink, Play, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: '教程指南 - One-Coin AI',
  description: '学习如何使用各种AI工具和技术的详细教程',
}

const tutorials = [
  {
    id: 'chatgpt-starter',
    title: 'ChatGPT 入门指南',
    description: '从零开始学习使用ChatGPT，掌握基本对话技巧和高级功能',
    icon: '💬',
    level: '入门',
    duration: '15分钟',
    tools: ['ChatGPT'],
    chapters: 5
  },
  {
    id: 'midjourney-art',
    title: 'Midjourney AI绘画教程',
    description: '学习如何使用Midjourney生成令人惊叹的AI艺术作品',
    icon: '🎨',
    level: '中级',
    duration: '30分钟',
    tools: ['Midjourney'],
    chapters: 8
  },
  {
    id: 'copilot-coding',
    title: 'GitHub Copilot 编程助手',
    description: '提高编程效率，利用AI辅助完成代码编写和调试',
    icon: '💻',
    level: '入门',
    duration: '20分钟',
    tools: ['GitHub Copilot', 'VS Code'],
    chapters: 6
  },
  {
    id: 'claude-advanced',
    title: 'Claude 高级使用技巧',
    description: '深入了解Claude的功能，学会用它完成复杂任务',
    icon: '🧠',
    level: '高级',
    duration: '25分钟',
    tools: ['Claude'],
    chapters: 7
  },
  {
    id: 'stable-diffusion',
    title: 'Stable Diffusion 本地部署',
    description: '在自己的电脑上运行Stable Diffusion，实现图像自由',
    icon: '🖼️',
    level: '高级',
    duration: '60分钟',
    tools: ['Stable Diffusion', 'Python'],
    chapters: 12
  },
  {
    id: 'notion-ai',
    title: 'Notion AI 工作流优化',
    description: '利用AI提升工作效率，打造智能个人知识管理系统',
    icon: '📝',
    level: '入门',
    duration: '20分钟',
    tools: ['Notion AI'],
    chapters: 5
  }
]

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">教程指南</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">教程指南</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            精选AI工具使用教程，从入门到精通，助你快速掌握AI技术
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{tutorial.icon}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tutorial.level === '入门' ? 'bg-green-100 text-green-700' :
                  tutorial.level === '中级' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {tutorial.level}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {tutorial.title}
              </h2>
              
              <p className="text-slate-600 mb-4 text-sm">
                {tutorial.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tutorial.tools.map((tool) => (
                  <span key={tool} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                    {tool}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-500">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {tutorial.chapters} 章节
                  <span className="mx-2">·</span>
                  {tutorial.duration}
                </div>
                
                <Link 
                  href={`/tutorials/${tutorial.id}`}
                  className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  <Play className="w-4 h-4 mr-1" />
                  开始学习
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">贡献你的教程</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            你有独特的AI使用技巧想分享吗？向开源项目提交你的教程，帮助更多人学习AI技术
          </p>
          <Link 
            href="https://github.com/m17y/atlas-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            在GitHub贡献
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
