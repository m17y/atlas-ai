import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MessageSquare, Github, Twitter, Mail, Users, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: '社区 - One-Coin AI',
  description: '加入One-Coin AI社区，与其他AI爱好者交流讨论',
}

const discussionTopics = [
  {
    id: 1,
    title: '2025年AI工具发展趋势讨论',
    author: 'AI研究者',
    replies: 128,
    views: 2560,
    lastActive: '2小时前',
    tags: ['趋势', '讨论']
  },
  {
    id: 2,
    title: '如何选择适合的AI编程助手',
    author: '开发者小王',
    replies: 86,
    views: 1820,
    lastActive: '5小时前',
    tags: ['编程', '工具选择']
  },
  {
    id: 3,
    title: 'Midjourney VS Stable Diffusion 哪个更好',
    author: '设计师Anna',
    replies: 245,
    views: 5430,
    lastActive: '1天前',
    tags: ['图像生成', '对比']
  },
  {
    id: 4,
    title: '分享我使用Claude完成工作的经验',
    author: '产品经理',
    replies: 67,
    views: 1340,
    lastActive: '2天前',
    tags: ['经验分享', 'Claude']
  },
  {
    id: 5,
    title: 'AI工具本地部署经验交流',
    author: '技术爱好者',
    replies: 43,
    views: 890,
    lastActive: '3天前',
    tags: ['本地部署', '技术']
  }
]

const communityStats = [
  { label: '注册用户', value: '10,000+' },
  { label: '讨论主题', value: '1,500+' },
  { label: '每日活跃', value: '500+' },
  { label: '累计消息', value: '50,000+' }
]

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">社区</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <MessageSquare className="w-16 h-16 text-primary-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">社区讨论</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            与其他AI爱好者交流心得，分享经验，共同探索AI技术的无限可能
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-slate-200">
                <h2 className="font-bold text-slate-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  热门讨论
                </h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {discussionTopics.map((topic) => (
                  <div key={topic.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 mb-2 hover:text-primary-600">
                          <Link href={`https://github.com/m17y/atlas-ai/issues`} target="_blank">
                            {topic.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{topic.author}</span>
                          <span>•</span>
                          <span>{topic.lastActive}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {topic.replies}
                        </span>
                        <span>{topic.views} 浏览</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {topic.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-slate-200">
                <Link 
                  href="https://github.com/m17y/atlas-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  查看更多讨论
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Community */}
            <div className="card p-6 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
              <h3 className="font-bold text-lg mb-4">加入社区</h3>
              <p className="text-white/80 mb-6 text-sm">
                立即加入我们的社区，与志同道合的AI爱好者一起交流学习
              </p>
              <div className="space-y-3">
                <Link 
                  href="https://github.com/m17y/atlas-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  <span>GitHub 讨论组</span>
                </Link>
                <Link 
                  href="https://github.com/m17y/atlas-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  <span>提交问题建议</span>
                </Link>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 mb-4">社区准则</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  尊重他人，友善交流
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  分享有价值的内容
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  积极参与讨论互动
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  遵守法律法规
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 mb-4">联系我们</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:contact@one-coin-ai.com"
                  className="flex items-center text-slate-600 hover:text-primary-600"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  contact@one-coin-ai.com
                </a>
                <a 
                  href="https://github.com/m17y/atlas-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-600 hover:text-primary-600"
                >
                  <Github className="w-5 h-5 mr-3" />
                  GitHub 仓库
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
