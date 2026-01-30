'use client'

import { TrendingUp, TrendingDown, ChevronRight, Flame } from 'lucide-react'

const trendingTools = [
  {
    rank: 1,
    name: 'ChatGPT',
    hotness: 98.5,
    trend: 12,
    category: '对话AI',
    icon: '🤖'
  },
  {
    rank: 2,
    name: 'Claude',
    hotness: 87.2,
    trend: 8,
    category: '对话AI',
    icon: '🧠'
  },
  {
    rank: 3,
    name: 'Midjourney',
    hotness: 76.8,
    trend: 15,
    category: '图像生成',
    icon: '🎨'
  },
  {
    rank: 4,
    name: 'GitHub Copilot',
    hotness: 65.3,
    trend: 5,
    category: '代码辅助',
    icon: '💻'
  },
  {
    rank: 5,
    name: 'Stable Diffusion',
    hotness: 58.1,
    trend: 20,
    category: '图像生成',
    icon: '🖼️'
  },
  {
    rank: 6,
    name: 'Runway',
    hotness: 52.4,
    trend: 18,
    category: '视频生成',
    icon: '🎬'
  },
  {
    rank: 7,
    name: 'Perplexity',
    hotness: 48.9,
    trend: 25,
    category: '搜索AI',
    icon: '🔍'
  },
  {
    rank: 8,
    name: 'Hugging Face',
    hotness: 45.6,
    trend: 10,
    category: 'AI平台',
    icon: '🤗'
  }
]

export default function Trending() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">今日热门排行</h2>
          </div>
          <a href="/trending" className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
            <span>查看完整榜单</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Ranking Table */}
        <div className="bg-slate-50 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100 text-sm font-medium text-slate-500">
            <div className="col-span-1">排名</div>
            <div className="col-span-5">工具名称</div>
            <div className="col-span-2 text-center">热度</div>
            <div className="col-span-2 text-center">趋势</div>
            <div className="col-span-2 text-right">操作</div>
          </div>

          <div className="divide-y divide-slate-200">
            {trendingTools.map((tool) => (
              <div
                key={tool.rank}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white transition-colors items-center"
              >
                {/* Rank */}
                <div className="col-span-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    tool.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    tool.rank === 2 ? 'bg-slate-200 text-slate-700' :
                    tool.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {tool.rank}
                  </div>
                </div>

                {/* Name & Icon */}
                <div className="col-span-5 flex items-center space-x-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 hover:text-primary-600 cursor-pointer transition-colors">
                      <a href={`/tool/${tool.rank}`}>{tool.name}</a>
                    </h3>
                    <span className="text-xs text-slate-400">{tool.category}</span>
                  </div>
                </div>

                {/* Hotness */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center space-x-1">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        style={{ width: `${tool.hotness}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{tool.hotness}k</span>
                  </div>
                </div>

                {/* Trend */}
                <div className="col-span-2 text-center">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    tool.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tool.trend > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{Math.abs(tool.trend)}%</span>
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 text-right">
                  <a
                    href={`/tool/${tool.rank}`}
                    className="inline-flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span>查看</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
