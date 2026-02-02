'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react'

interface News {
  id: string
  title: string
  date: string
  category: string
  summary: string
  image: string
  tags: string
  published: boolean
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(newsItem: News) {
    if (!confirm(`确定要删除"${newsItem.title}"吗？`)) return
    
    try {
      await fetch(`/api/news/${newsItem.id}`, { method: 'DELETE' })
      fetchNews()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Link href="/admin/news/new" className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          发布新闻
        </Link>
      </div>

          {loading ? (
            <div className="card p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 mt-4">加载中...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-500 mb-4">暂无新闻</p>
              <Link href="/admin/news/new" className="btn-primary inline-flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                发布第一条新闻
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item.id} className="card overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-6xl">
                    {item.image || '📰'}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                      <span className="text-slate-400 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Tag className="w-3 h-3" />
                        {JSON.parse(item.tags || '[]').length} 个标签
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/admin/news/${item.id}`}
                          className="p-2 text-slate-400 hover:text-primary-600"
                          title="编辑"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <Link 
                          href={`/news/${item.id}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-green-600"
                          title="预览"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-slate-400 hover:text-red-600"
                          title="删除"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  )
}
