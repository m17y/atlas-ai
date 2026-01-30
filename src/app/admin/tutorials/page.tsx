'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { Plus, Edit, Trash2, Eye, Clock, BookOpen } from 'lucide-react'
import Link from 'next/link'

const AdminLayout = lazy(() => import('../AdminLayoutWrapper'))

interface Tutorial {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  level: string
  duration: string
  published: boolean
  chapters: Array<{
    id: string
    order: number
  }>
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

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTutorials()
  }, [])

  async function fetchTutorials() {
    try {
      const res = await fetch('/api/tutorials')
      if (!res.ok) {
        throw new Error('Failed to fetch tutorials')
      }
      const data = await res.json()
      setTutorials(Array.isArray(data.tutorials) ? data.tutorials : [])
    } catch (error) {
      console.error('Failed to fetch tutorials:', error)
      setTutorials([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(tutorial: Tutorial) {
    if (!confirm(`确定要删除"${tutorial.title}"吗？`)) return
    
    try {
      await fetch(`/api/tutorials/${tutorial.slug}`, { method: 'DELETE' })
      fetchTutorials()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">教程管理</h1>
              <p className="text-slate-500 mt-1">管理和发布教程内容</p>
            </div>
            <Link href="/admin/tutorials/new" className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              新建教程
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : tutorials.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-500 mb-4">暂无教程</p>
              <p className="text-sm text-slate-400">点击上方按钮创建第一个教程</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">教程</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">难度</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">时长</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">章节</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">状态</th>
                    <th className="text-right px-6 py-4 font-semibold text-slate-600">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tutorials.map((tutorial) => (
                    <tr key={tutorial.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{tutorial.icon}</span>
                          <div>
                            <h3 className="font-medium text-slate-900">{tutorial.title}</h3>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                              {tutorial.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          tutorial.level === '入门' ? 'bg-green-100 text-green-700' :
                          tutorial.level === '中级' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {tutorial.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {tutorial.duration}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="flex items-center text-sm">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {tutorial.chapters.length} 章节
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          tutorial.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tutorial.published ? '已发布' : '草稿'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Link 
                            href={`/admin/tutorials/${tutorial.slug}`}
                            className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                            title="编辑"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <Link 
                            href={`/tutorials/${tutorial.slug}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-green-600 transition-colors"
                            title="预览"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(tutorial)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </Suspense>
  )
}
