import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, FolderTree, TrendingUp, BarChart3, MessageSquare, Image, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: '网站预览 - One-Coin AI',
  description: '某科学的AI目录，探索、发现最新的人工智能工具与技术',
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center text-white mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold">One-Coin AI</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mt-6">
            某科学的AI目录，探索、发现最新的人工智能工具与技术。
          </p>
          
          <div className="flex justify-center gap-16 mt-10 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold">16+</div>
              <div className="text-sm opacity-75">AI 工具</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">8</div>
              <div className="text-sm opacity-75">分类</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">实时</div>
              <div className="text-sm opacity-75">数据更新</div>
            </div>
          </div>
        </header>
        
        {/* Page Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">首页</h3>
            <p className="text-slate-600 mb-4">
              精美的首页展示，包含精选推荐工具、热门排行榜、分类浏览和最新发布动态。
            </p>
            <Link href="/" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>查看首页</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">分类浏览</h3>
            <p className="text-slate-600 mb-4">
              按类别浏览AI工具，支持按分类、价格模式快速筛选，找到你需要的人工智能工具。
            </p>
            <Link href="/categories" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>查看分类</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">排行榜</h3>
            <p className="text-slate-600 mb-4">
              查看最热门的AI工具排行榜，了解当前最受关注的AI产品和排名变化趋势。
            </p>
            <Link href="/trending" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>查看排行</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">趋势分析</h3>
            <p className="text-slate-600 mb-4">
              深入了解AI技术发展趋势，包括多模态AI、AI Agent、开源框架等数据分析。
            </p>
            <Link href="/insights" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>查看趋势</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">工具详情</h3>
            <p className="text-slate-600 mb-4">
              详细介绍AI工具的功能特性、定价方案、使用案例和用户评价，全面了解工具信息。
            </p>
            <Link href="/tool/tool_chatgpt" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>查看详情</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">管理后台</h3>
            <p className="text-slate-600 mb-4">
              强大的管理后台，支持工具管理、分类管理、统计分析等功能。
            </p>
            <Link href="/admin" className="inline-flex items-center space-x-1 text-primary-600 font-medium">
              <span>进入后台</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">✨ 网站特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-semibold text-slate-900 mb-2">响应式设计</h4>
              <p className="text-slate-600 text-sm">完美适配桌面、平板和手机等各种设备</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold text-slate-900 mb-2">精选推荐</h4>
              <p className="text-slate-600 text-sm">精心挑选最实用的AI工具和框架</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-slate-900 mb-2">数据可视化</h4>
              <p className="text-slate-600 text-sm">直观的图表展示AI技术发展趋势</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h4 className="font-semibold text-slate-900 mb-2">分类清晰</h4>
              <p className="text-slate-600 text-sm">8个主要分类，快速定位目标工具</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="font-semibold text-slate-900 mb-2">用户评价</h4>
              <p className="text-slate-600 text-sm">真实的用户评价和评分参考</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="font-semibold text-slate-900 mb-2">性能优化</h4>
              <p className="text-slate-600 text-sm">基于 Next.js 构建，快速加载流畅体验</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">🎉 开始探索AI世界</h2>
          <p className="text-slate-600 mb-6">立即体验这个精美的AI工具目录，发现最新的人工智能技术</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/" className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>打开网站</span>
            </Link>
            <Link href="/admin" className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors inline-flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>管理后台</span>
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-white/80">
          <p>One-Coin AI - 某科学的AI目录，发现、探索、体验最新的人工智能工具与技术</p>
          <p className="mt-2">© 2025 One-Coin AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
