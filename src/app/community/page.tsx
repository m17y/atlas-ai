import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MessageSquare, Github, Twitter, Mail, Users, ExternalLink, MessageCircle, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: '社区 - One-Coin AI',
  description: '加入One-Coin AI社区，与其他AI爱好者交流讨论',
}

interface Discussion {
  id: number
  title: string
  author: string
  replies: number
  views: number
  lastActive: string
  tags: string[]
  url: string
}

const communityStats = [
  { label: 'GitHub Stars', value: '128+' },
  { label: '讨论主题', value: '50+' },
  { label: '贡献者', value: '5+' },
  { label: '累计消息', value: '200+' }
]

function DiscussionsList() {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const response = await fetch('/api/discussions')
        const data = await response.json()
        
        if (data.discussions) {
          setDiscussions(data.discussions)
        } else {
          setError(data.error || 'Failed to load discussions')
        }
      } catch (err) {
        setError('Failed to connect to community')
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussions()
  }, [])

  if (loading) {
    return (
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            热门讨论
          </h2>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500">正在加载讨论...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            热门讨论
          </h2>
        </div>
        <div className="p-8 text-center">
          <p className="text-slate-500 mb-4">{error}</p>
          <p className="text-sm text-slate-400">请直接访问 GitHub Issues 参与讨论</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-slate-200">
        <h2 className="font-bold text-slate-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          GitHub 热门讨论
        </h2>
      </div>
      
      <div className="divide-y divide-slate-100">
        {discussions.length > 0 ? (
          discussions.map((topic) => (
            <div key={topic.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 mb-2 hover:text-primary-600">
                    <a href={topic.url} target="_blank" rel="noopener noreferrer">
                      {topic.title}
                    </a>
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{topic.author}</span>
                    <span>•</span>
                    <span>{topic.lastActive}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {topic.replies}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {topic.views}
                  </span>
                </div>
              </div>
              {topic.tags.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {topic.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p>暂无讨论</p>
            <a 
              href="https://github.com/m17y/atlas-ai/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-flex items-center"
            >
              成为第一个发起讨论的人 <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-slate-200">
        <a 
          href="https://github.com/m17y/atlas-ai/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          查看所有讨论
        </a>
      </div>
    </div>
  )
}

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
            <DiscussionsList />
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
                <a 
                  href="https://github.com/m17y/atlas-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  <span>GitHub 仓库</span>
                </a>
                <a 
                  href="https://github.com/m17y/atlas-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  <span>GitHub Issues</span>
                </a>
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
