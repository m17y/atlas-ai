import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LayoutDashboard,
  Tool,
  FolderTree,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Star,
  Eye,
} from 'lucide-react'

export const metadata: Metadata = {
  title: '仪表盘 - Atlas AI 管理后台',
}

async function getStats() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  
  try {
    const [toolsRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/api/tools`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
    ])

    const toolsData = await toolsRes.json()
    const categoriesData = await categoriesRes.json()

    return {
      totalTools: toolsData.pagination?.total || 0,
      totalCategories: categoriesData.length || 0,
      featuredTools: toolsData.tools?.filter((t: any) => t.featured).length || 0,
      trendingTools: toolsData.tools?.filter((t: any) => t.trending).length || 0,
      recentTools: toolsData.tools?.slice(0, 5) || [],
    }
  } catch (error) {
    return {
      totalTools: 0,
      totalCategories: 0,
      featuredTools: 0,
      trendingTools: 0,
      recentTools: [],
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      name: '工具总数',
      value: stats.totalTools,
      icon: Tool,
      color: 'from-blue-500 to-cyan-500',
      href: '/admin/tools',
    },
    {
      name: '分类总数',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'from-emerald-500 to-teal-500',
      href: '/admin/categories',
    },
    {
      name: '精选工具',
      value: stats.featuredTools,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      href: '/admin/tools?filter=featured',
    },
    {
      name: '热门工具',
      value: stats.trendingTools,
      icon: TrendingUp,
      color: 'from-red-500 to-pink-500',
      href: '/admin/tools?filter=trending',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">欢迎回来，管理员！</h1>
          <p className="text-slate-600 mt-1">这里是 Atlas AI 的管理后台，您可以在这里管理所有内容。</p>
        </div>
        <Link href="/admin/tools/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>添加新工具</span>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-600">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent tools */}
        <div className="card">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">最近添加的工具</h2>
              <Link href="/admin/tools" className="text-sm text-primary-600 hover:text-primary-700">
                查看全部
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {stats.recentTools.length > 0 ? (
              stats.recentTools.map((tool: any) => (
                <div key={tool.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <h3 className="font-medium text-slate-900">{tool.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">{tool.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{tool.rating.toFixed(1)}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                        tool.pricing === 'paid' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tool.pricing === 'free' ? '免费' : tool.pricing === 'paid' ? '付费' : '免费增值'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Tool className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>暂无工具数据</p>
                <Link href="/admin/tools/new" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
                  立即添加
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">快捷操作</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link href="/admin/tools/new" className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Plus className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-medium text-slate-900">添加工具</h3>
              <p className="text-sm text-slate-500 mt-1">添加新的 AI 工具</p>
            </Link>

            <Link href="/admin/categories" className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <FolderTree className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-medium text-slate-900">管理分类</h3>
              <p className="text-sm text-slate-500 mt-1">编辑或添加分类</p>
            </Link>

            <Link href="/admin/analytics" className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-medium text-slate-900">数据分析</h3>
              <p className="text-sm text-slate-500 mt-1">查看访问统计</p>
            </Link>

            <Link href="/" className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-slate-900">查看前台</h3>
              <p className="text-sm text-slate-500 mt-1">访问用户页面</p>
            </Link>
          </div>
        </div>
      </div>

      {/* System info */}
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">系统信息</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-500">版本</p>
              <p className="font-medium text-slate-900 mt-1">v1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">数据库</p>
              <p className="font-medium text-slate-900 mt-1">SQLite</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">状态</p>
              <p className="font-medium text-green-600 mt-1 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                运行正常
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">最后更新</p>
              <p className="font-medium text-slate-900 mt-1">{new Date().toLocaleDateString('zh-CN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
