'use client'

import { Star, ExternalLink, Heart, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tool } from '@/lib/api'
import { getIconEmoji } from '@/lib/icons'

export default function Featured() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch('/api/tools?featured=true&limit=8')
        const data = await response.json()
        setTools(data.tools)
      } catch (error) {
        console.error('Failed to fetch featured tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">精选推荐</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-slate-200" />
                <div className="p-5">
                  <div className="h-6 bg-slate-200 rounded mb-3" />
                  <div className="h-4 bg-slate-200 rounded mb-4" />
                  <div className="flex gap-1.5 mb-4">
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                    <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">精选推荐</h2>
          </div>
          <a href="/featured" className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
            <span>查看全部</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="card card-hover group"
            >
              {/* Icon */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-6xl group-hover:from-primary-50 group-hover:to-purple-50 transition-colors">
                {getIconEmoji(tool.icon)}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>
                  <button
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{tool.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-400">({tool.reviewCount.toLocaleString()})</span>
                  </div>
                  <span className="text-xs text-primary-600 font-medium">
                    查看详情 →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
