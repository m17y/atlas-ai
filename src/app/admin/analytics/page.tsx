import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: '统计分析 - Atlas AI 管理后台',
}

async function getStats() {
  try {
    const [totalTools, totalCategories, featuredTools, trendingTools, toolsByCategory, toolsByPricing] = await Promise.all([
      prisma.tool.count(),
      prisma.category.count(),
      prisma.tool.count({ where: { featured: true } }),
      prisma.tool.count({ where: { trending: true } }),
      prisma.tool.groupBy({
        by: ['categoryId'],
        _count: true,
      }),
      prisma.tool.groupBy({
        by: ['pricing'],
        _count: true,
      }),
    ])

    const categories = await prisma.category.findMany()
    const categoryMap = new Map(categories.map(c => [c.id, c]))

    const categoryStats = toolsByCategory.map(item => ({
      name: categoryMap.get(item.categoryId)?.name || '未知',
      count: item._count,
    }))

    const pricingStats = {
      free: toolsByPricing.find(p => p.pricing === 'free')?._count || 0,
      paid: toolsByPricing.find(p => p.pricing === 'paid')?._count || 0,
      freemium: toolsByPricing.find(p => p.pricing === 'freemium')?._count || 0,
    }

    // Calculate rating distribution
    const allTools = await prisma.tool.findMany({
      select: { rating: true },
    })

    const ratingDistribution = {
      '4.5-5.0': allTools.filter(t => t.rating >= 4.5).length,
      '4.0-4.5': allTools.filter(t => t.rating >= 4.0 && t.rating < 4.5).length,
      '3.5-4.0': allTools.filter(t => t.rating >= 3.5 && t.rating < 4.0).length,
      '3.0-3.5': allTools.filter(t => t.rating >= 3.0 && t.rating < 3.5).length,
      '<3.0': allTools.filter(t => t.rating < 3.0).length,
    }

    return {
      totalTools,
      totalCategories,
      featuredTools,
      trendingTools,
      categoryStats,
      pricingStats,
      ratingDistribution,
      avgRating: allTools.length > 0 
        ? (allTools.reduce((sum, t) => sum + t.rating, 0) / allTools.length).toFixed(2)
        : '0',
    }
  } catch (error) {
    console.error('Failed to get stats:', error)
    return null
  }
}

export default async function AdminAnalyticsPage() {
  const stats = await getStats()

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">无法加载统计数据</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">统计分析</h1>
        <p className="text-slate-600 mt-1">查看 One-Coin AI 的数据概览</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card p-6">
          <p className="text-sm text-slate-500">工具总数</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalTools}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">分类总数</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalCategories}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">精选工具</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.featuredTools}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">热门工具</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{stats.trendingTools}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">平均评分</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{stats.avgRating}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing distribution */}
        <div className="card">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">价格分布</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">免费 (Free)</span>
                  <span className="text-sm font-medium text-slate-900">{stats.pricingStats.free} 个</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(stats.pricingStats.free / stats.totalTools) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">付费 (Paid)</span>
                  <span className="text-sm font-medium text-slate-900">{stats.pricingStats.paid} 个</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(stats.pricingStats.paid / stats.totalTools) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">免费增值 (Freemium)</span>
                  <span className="text-sm font-medium text-slate-900">{stats.pricingStats.freemium} 个</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(stats.pricingStats.freemium / stats.totalTools) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="card">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">评分分布</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {Object.entries(stats.ratingDistribution).reverse().map(([range, count]) => (
                <div key={range} className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600 w-20">{range}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{ width: `${(count / stats.totalTools) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category stats */}
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">分类工具数量</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.categoryStats.map((cat) => (
              <div key={cat.name} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{cat.name}</span>
                  <span className="text-2xl font-bold text-primary-600">{cat.count}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${(cat.count / stats.totalTools) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
