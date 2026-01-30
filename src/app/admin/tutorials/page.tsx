import type { Metadata } from 'next'
import AdminLayout from '../layout'
import { Plus, Edit, Trash2, Eye, EyeOff, Clock, BookOpen } from 'lucide-react'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: '教程管理 - 管理后台',
}

async function getTutorials() {
  const tutorials = await prisma.tutorial.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      chapters: {
        orderBy: { order: 'asc' }
      }
    }
  })
  return tutorials
}

export default async function AdminTutorialsPage() {
  const tutorials = await getTutorials()

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">教程管理</h1>
            <p className="text-slate-500 mt-1">管理和发布教程内容</p>
          </div>
          <Link href="/admin/tutorials/new" className="btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            新建教程
          </Link>
        </div>

        {/* Tutorial List */}
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
                        href={`/admin/tutorials/${tutorial.id}`}
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
                      <form action={`/api/tutorials/${tutorial.slug}`} method="DELETE" className="inline">
                        <button 
                          type="submit"
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="删除"
                          onClick={(e) => {
                            if (!confirm('确定要删除此教程吗？')) {
                              e.preventDefault()
                            }
                          }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {tutorials.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg mb-2">暂无教程</p>
                    <p className="text-sm">点击上方按钮创建第一个教程</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
