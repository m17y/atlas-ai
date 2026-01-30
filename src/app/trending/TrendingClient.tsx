'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, Flame, Star } from 'lucide-react'
import Link from 'next/link'

interface TrendingTool {
  id: string
  name: string
  description: string
  icon: string
  category: any
  hotness?: number
  trend?: number
  rating: number
  reviewCount: number
}

interface Category {
  id: string
  name: string
  icon: string
}

interface TrendingClientProps {
  initialTools: TrendingTool[]
  initialCategories: Category[]
}

export default function TrendingClient({ initialTools, initialCategories }: TrendingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const allCategories = ['全部', ...initialCategories.map(c => (c as any).name || c.name || c)]

  const filteredTools = selectedCategory && selectedCategory !== '全部'
    ? initialTools.filter(tool => (tool.category as any)?.name === selectedCategory || tool.category === selectedCategory)
    : initialTools

  const sortedTools = [...filteredTools].sort((a, b) => b.reviewCount - a.reviewCount)

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">排行榜</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === '全部' ? null : category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                (category === '全部' && !selectedCategory) || category === selectedCategory
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {sortedTools.length > 0 ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100 text-sm font-medium text-slate-500">
                <div className="col-span-1 text-center">排名</div>
                <div className="col-span-6">工具名称</div>
                <div className="col-span-2 text-center">热度指数</div>
                <div className="col-span-3 text-center">用户评价</div>
              </div>

              <div className="divide-y divide-slate-200">
                {sortedTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-slate-50 transition-colors items-center"
                  >
                    <div className="col-span-1 text-center">
                      <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-slate-200 text-slate-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    <div className="col-span-6 flex items-center space-x-4">
                      <span className="text-3xl">{tool.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 hover:text-primary-600 cursor-pointer transition-colors">
                          <Link href={`/tool/${tool.id}`}>{tool.name}</Link>
                        </h3>
                        <span className="text-xs text-slate-400">{(tool.category as any)?.name || tool.category || '未分类'}</span>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-24 bg-slate-200 rounded-full h-3 overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full ${
                              tool.reviewCount > 10000 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                              tool.reviewCount > 5000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                              'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}
                            style={{ width: `${Math.min((tool.reviewCount / 15000) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-slate-700">{Math.round(tool.reviewCount / 150)}</span>
                      </div>
                    </div>

                    <div className="col-span-3 text-center">
                      <div className="flex items-center justify-center space-x-1 text-slate-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">该分类暂无工具</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
