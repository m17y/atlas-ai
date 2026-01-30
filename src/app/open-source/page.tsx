import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Github, ExternalLink, Star, GitFork, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: '开源项目 - One-Coin AI',
  description: 'One-Coin AI 是一个开源项目，欢迎贡献代码和参与开发',
}

const repoInfo = {
  name: 'm17y/atlas-ai',
  description: 'AI工具目录网站，帮助用户发现、探索和体验最新的人工智能工具',
  language: 'TypeScript',
  stars: 128,
  forks: 32,
  issues: 15,
  lastUpdate: '2025-01-28'
}

const contributors = [
  { name: '开发者A', avatar: '👨‍💻', role: '项目创始人' },
  { name: '开发者B', avatar: '👩‍💻', role: '核心贡献者' },
  { name: '开发者C', avatar: '🧑‍💻', role: 'UI设计师' },
  { name: '开发者D', avatar: '👨‍💻', role: '文档维护者' }
]

const features = [
  {
    icon: '🔍',
    title: 'AI工具目录',
    description: '收集整理最新最全的AI工具，支持分类浏览和搜索'
  },
  {
    icon: '📊',
    title: '数据分析',
    description: '提供AI工具的使用统计和趋势分析'
  },
  {
    icon: '🔐',
    title: 'Admin管理后台',
    description: '完善的内容管理功能，方便维护更新'
  },
  {
    icon: '🌐',
    title: '多语言支持',
    description: '支持中英文，方便全球用户使用'
  }
]

const techStack = [
  { name: 'Next.js', category: '框架' },
  { name: 'React', category: '框架' },
  { name: 'TypeScript', category: '语言' },
  { name: 'Tailwind CSS', category: '样式' },
  { name: 'Prisma', category: '数据库' },
  { name: 'SQLite', category: '数据库' },
  { name: 'Lucide React', category: '图标库' }
]

export default function OpenSourcePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">开源项目</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mb-6">
            <Github className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">开源项目</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            One-Coin AI 是一个开源的AI工具目录项目，欢迎开发者参与贡献
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="https://github.com/m17y/atlas-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              查看仓库
            </Link>
            <Link 
              href="https://github.com/m17y/atlas-ai/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              提出建议
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-slate-900">{repoInfo.stars}</div>
            <div className="text-slate-500">Stars</div>
          </div>
          <div className="card p-6 text-center">
            <GitFork className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-slate-900">{repoInfo.forks}</div>
            <div className="text-slate-500">Forks</div>
          </div>
          <div className="card p-6 text-center">
            <ExternalLink className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-slate-900">{repoInfo.issues}</div>
            <div className="text-slate-500">Open Issues</div>
          </div>
          <div className="card p-6 text-center">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-slate-900">{contributors.length}</div>
            <div className="text-slate-500">Contributors</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">项目特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card p-6">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                {tech.name}
                <span className="text-slate-400 text-xs ml-2">{tech.category}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">核心贡献者</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {contributors.map((person, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-5xl mb-4">{person.avatar}</div>
                <h3 className="font-bold text-slate-900">{person.name}</h3>
                <p className="text-slate-500 text-sm">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Contribute */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">如何参与贡献</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🐛</div>
              <h3 className="font-bold mb-2">报告Bug</h3>
              <p className="text-white/80 text-sm">在GitHub Issues中报告发现的Bug</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="font-bold mb-2">提出建议</h3>
              <p className="text-white/80 text-sm">分享你的想法和建议，帮助项目改进</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📝</div>
              <h3 className="font-bold mb-2">提交代码</h3>
              <p className="text-white/80 text-sm">Fork项目并提交Pull Request</p>
            </div>
          </div>
          <div className="text-center">
            <Link 
              href="https://github.com/m17y/atlas-ai/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-white/90 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              贡献指南
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
