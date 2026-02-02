'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const AdminLayout = lazy(() => import('../AdminLayoutWrapper'))

interface Tool {
  id: string
  name: string
  description: string
  categoryId: string
  category?: { id: string; name: string }
  pricing: string
  rating: number
  reviewCount: number
  tags: string[]
  icon: string
  website?: string
  featured: boolean
  trending: boolean
  latest: boolean
}

interface Category {
  id: string
  name: string
}

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toolToDelete, setToolToDelete] = useState<Tool | null>(null)

  const limit = 10

  useEffect(() => {
    fetchData()
  }, [currentPage, categoryFilter])

  async function fetchData() {
    try {
      const [toolsRes, categoriesRes] = await Promise.all([
        fetch(`/api/tools?page=${currentPage}&limit=${limit}${categoryFilter ? `&category=${categoryFilter}` : ''}`),
        fetch('/api/categories'),
      ])

      const toolsData = await toolsRes.json()
      const categoriesData = await categoriesRes.json()

      setTools(toolsData.tools || [])
      setTotalPages(toolsData.pagination?.totalPages || 1)
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch() {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: limit.toString(),
      })
      
      if (search) params.append('search', search)
      if (categoryFilter) params.append('category', categoryFilter)

      const response = await fetch(`/api/tools?${params.toString()}`)
      const data = await response.json()
      
      setTools(data.tools || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setCurrentPage(1)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!toolToDelete) return

    try {
      await fetch(`/api/tools/${toolToDelete.id}`, { method: 'DELETE' })
      setShowDeleteModal(false)
      setToolToDelete(null)
      fetchData()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  function getPricingBadge(pricing: string) {
    const styles: Record<string, string> = {
      free: 'bg-green-100 text-green-700',
      paid: 'bg-red-100 text-red-700',
      freemium: 'bg-yellow-100 text-yellow-700',
    }
    const labels: Record<string, string> = {
      free: '免费',
      paid: '付费',
      freemium: '免费增值',
    }
    return styles[pricing] || 'bg-slate-100 text-slate-700'
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout>
        <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">工具管理</h1>
          <p className="text-slate-600 mt-1">管理您的 AI 工具集合</p>
        </div>
        <Link href="/admin/tools/new" className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>添加工具</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索工具..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">全部分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button onClick={handleSearch} className="btn-primary">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </button>
          </div>
        </div>
      </div>

      {/* Tools table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 mt-4">加载中...</p>
          </div>
        ) : tools.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-500">暂无工具数据</p>
            <Link href="/admin/tools/new" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
              立即添加第一个工具
            </Link>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">工具</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">分类</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">价格</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">评分</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">状态</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🤖</span>
                        <div>
                          <h3 className="font-medium text-slate-900">{tool.name}</h3>
                          <p className="text-sm text-slate-500 line-clamp-1 max-w-xs">{tool.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {tool.category?.name || '未分类'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPricingBadge(tool.pricing)}`}>
                        {getPricingBadge(tool.pricing) ? '' : ''}
                        {tool.pricing === 'free' ? '免费' : tool.pricing === 'paid' ? '付费' : '免费增值'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-slate-900">{tool.rating.toFixed(1)}</span>
                        <span className="text-slate-500">({tool.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {tool.featured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">精选</span>
                        )}
                        {tool.trending && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">热门</span>
                        )}
                        {tool.latest && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">最新</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/tool/${tool.id}`} className="p-2 text-slate-400 hover:text-slate-600">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/tools/${tool.id}`} className="p-2 text-slate-400 hover:text-primary-600">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setToolToDelete(tool)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {tool.website && (
                          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-600">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  第 {currentPage} 页，共 {totalPages} 页
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">确认删除</h3>
            <p className="text-slate-600 mb-6">
              确定要删除「{toolToDelete?.name}」吗？此操作无法撤销。
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setToolToDelete(null)
                }}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </AdminLayout>
    </Suspense>
  )
}

function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 mt-4">加载中...</p>
      </div>
    </div>
  )
}
