import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, Flame, ChevronRight, Star, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: '排行榜 - AI Tech Hub',
  description: '查看最热门的人工智能工具排行榜',
}

const trendingTools = [
  { rank: 1, name: 'ChatGPT', hotness: 98.5, trend: 12, category: '对话AI', icon: '🤖', reviews: 12500 },
  { rank: 2, name: 'Claude', hotness: 87.2, trend: 8, category: '对话AI', icon: '🧠', reviews: 7600 },
  { rank: 3, name: 'Midjourney', hotness: 76.8, trend: 15, category: '图像生成', icon: '🎨', reviews: 8900 },
  { rank: 4, name: 'GitHub Copilot', hotness: 65.3, trend: 5, category: '代码辅助', icon: '💻', reviews: 11200 },
  { rank: 5, name: 'Stable Diffusion', hotness: 58.1, trend: 20, category: '图像生成', icon: '🖼️', reviews: 9800 },
  { rank: 6, name: 'Runway', hotness: 52.4, trend: 18, category: '视频生成', icon: '🎬', reviews: 5400 },
  { rank: 7, name: 'Perplexity', hotness: 48.9, trend: 25, category: '搜索AI', icon: '🔍', reviews: 4300 },
  { rank: 8, name: 'Hugging Face', hotness: 45.6, trend: 10, category: 'AI平台', icon: '🤗', reviews: 8900 },
  { rank: 9, name: 'Notion AI', hotness: 42.3, trend: 8, category: '生产力', icon: '📝', reviews: 6700 },
  { rank: 10, name: 'Gamma', hotness: 38.9, trend: 12, category: '演示文稿', icon: '📊', reviews: 4300 },
  { rank: 11, name: 'DALL-E 3', hotness: 35.6, trend: 15, category: '图像生成', icon: '🎨', reviews: 5600 },
  { rank: 12, name: 'LangChain', hotness: 32.4, trend: 22, category: '开发框架', icon: '⛓️', reviews: 3400 },
  { rank: 13, name: 'Llama 3', hotness: 29.8, trend: 28, category: '大语言模型', icon: '🦙', reviews: 2800 },
  { rank: 14, name: 'Sora', hotness: 27.2, trend: 35, category: '视频生成', icon: '🎬', reviews: 1900 },
  { rank: 15, name: 'Gemini', hotness: 25.6, trend: 18, category: '对话AI', icon: '💎', reviews: 3200 }
]

const categories = ['全部', '对话AI', '图像生成', '视频生成', '代码辅助', '生产力', '开发框架']

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <a href="/" className="text-slate-500 hover:text-primary-600">首页</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">排行榜</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AI工具排行榜</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            根据用户热度、增长速度和评价综合排名，展示最受欢迎的人工智能工具
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category === '全部'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ranking Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100 text-sm font-medium text-slate-500">
            <div className="col-span-1 text-center">排名</div>
            <div className="col-span-5">工具名称</div>
            <div className="col-span-2 text-center">热度指数</div>
            <div className="col-span-2 text-center">增长趋势</div>
            <div className="col-span-2 text-center">用户评价</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-200">
            {trendingTools.map((tool) => (
              <div
                key={tool.rank}
                className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-slate-50 transition-colors items-center"
              >
                {/* Rank */}
                <div className="col-span-1 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-sm font-bold ${
                    tool.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    tool.rank === 2 ? 'bg-slate-200 text-slate-700' :
                    tool.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {tool.rank}
                  </div>
                </div>

                {/* Name & Icon */}
                <div className="col-span-5 flex items-center space-x-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-primary-600 cursor-pointer transition-colors">
                      <a href={`/tool/${tool.rank}`}>{tool.name}</a>
                    </h3>
                    <span className="text-xs text-slate-400">{tool.category}</span>
                  </div>
                </div>

                {/* Hotness */}
                <div className="col-span-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-24 bg-slate-200 rounded-full h-3 overflow-hidden mb-1">
                      <div
                        className={`h-full rounded-full ${
                          tool.hotness > 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                          tool.hotness > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}
                        style={{ width: `${tool.hotness}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-slate-700">{tool.hotness}</span>
                  </div>
                </div>

                {/* Trend */}
                <div className="col-span-2 text-center">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                    tool.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tool.trend > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(tool.trend)}%</span>
                  </div>
                </div>

                {/* Reviews */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center space-x-1 text-slate-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{tool.reviews.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              上一页
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary-600 text-white font-medium">1</button>
            <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">2</button>
            <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">3</button>
            <span className="text-slate-400">...</span>
            <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">10</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              下一页
            </button>
          </nav>
        </div>
      </div>

      <Footer />
    </main>
  )
}
