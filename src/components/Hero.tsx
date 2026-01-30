'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Search, Zap, TrendingUp, Sparkles } from 'lucide-react'

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/categories?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/categories')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">发现最新的人工智能技术</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            AI 技术前沿阵地
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            发现、探索、体验最新的人工智能工具和技术
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索AI工具、技术、框架..."
                  className="w-full pl-14 pr-32 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-2.5 px-6">
                  搜索
                </button>
              </div>
            </form>
          </div>

          {/* Hot Tags */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-white/60">今日热门：</span>
            <Link href="/tool/tool_chatgpt" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors text-sm">
              ChatGPT
            </Link>
            <Link href="/tool/tool_midjourney" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors text-sm">
              Midjourney
            </Link>
            <Link href="/tool/tool_claude" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors text-sm">
              Claude
            </Link>
            <Link href="/tool/tool_stable_diffusion" className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors text-sm">
              Stable Diffusion
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">16+</div>
              <div className="text-white/60">AI 工具</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">9</div>
              <div className="text-white/60">分类</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">实时</div>
              <div className="text-white/60">数据更新</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
        </svg>
      </div>
    </section>
  )
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}</a>
}
