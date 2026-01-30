'use client'

import { TrendingUp, TrendingDown, ChevronRight, Flame } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tool } from '@/lib/api'
import { getIconEmoji } from '@/lib/icons'

export default function Trending() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch('/api/tools?trending=true&limit=8')
        const data = await response.json()
        setTools(data.tools)
      } catch (error) {
        console.error('Failed to fetch trending tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">今日热门排行</h2>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-200">
                <div className="col-span-1">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                </div>
                <div className="col-span-5 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="h-2 w-20 bg-slate-200 rounded-full animate-pulse" />
                </div>
                <div className="col-span-2">
                  <div className="h-6 w-12 bg-slate-200 rounded-full animate-pulse" />
                </div>
                <div className="col-span-2">
                  <div className="h-4 w-12 bg-slate-200 rounded animate-pulse ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
            <div className="col-span-2 text-center">评分</div>
            <div className="col-span-2 text-right">操作</div>
          </div>

          <div className="divide-y divide-slate-200">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white transition-colors items-center"
              >
                {/* Rank */}
                <div className="col-span-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-slate-200 text-slate-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Name & Icon */}
                <div className="col-span-5 flex items-center space-x-3">
                  <span className="text-2xl">{getIconEmoji(tool.icon)}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 hover:text-primary-600 cursor-pointer transition-colors">
                      <a href={`/tool/${tool.id}`}>{tool.name}</a>
                    </h3>
                    <span className="text-xs text-slate-400">{tool.category?.name || '未分类'}</span>
                  </div>
                </div>

                {/* Hotness */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center space-x-1">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        style={{ width: `${Math.min(tool.rating * 20, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{(tool.rating * 10).toFixed(0)}k</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <TrendingUp className="w-3 h-3" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 text-right">
                  <a
                    href={`/tool/${tool.id}`}
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
