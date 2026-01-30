'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Settings',
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  const icons = [
    'Settings', 'Image', 'Code', 'FileText', 'Film', 'Mic', 'Search', 'Zap',
    'Bot', 'Palette', 'Cpu', 'Copy', 'Globe', 'Layout', 'CheckCircle', 'Volume2',
    'Clapperboard', 'PenTool', 'MessageSquare',
  ]

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowModal(false)
        setEditingCategory(null)
        setFormData({ name: '', description: '', icon: 'Settings' })
        fetchCategories()
      }
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  async function handleDelete() {
    if (!categoryToDelete) return

    try {
      // Check if category has tools
      if (categoryToDelete.count > 0) {
        alert('该分类下有工具，无法删除')
        setShowDeleteModal(false)
        setCategoryToDelete(null)
        return
      }

      await fetch(`/api/categories/${categoryToDelete.id}`, { method: 'DELETE' })
      setShowDeleteModal(false)
      setCategoryToDelete(null)
      fetchCategories()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  function openEditModal(category: Category) {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
    })
    setShowModal(true)
  }

  function getIconEmoji(iconName: string): string {
    const emojiMap: Record<string, string> = {
      Settings: '⚙️', Image: '🖼️', Code: '💻', FileText: '📄', Film: '🎬',
      Mic: '🎤', Search: '🔍', Zap: '⚡', Bot: '🤖', Palette: '🎨',
      Cpu: '🧠', Copy: '📋', Globe: '🌐', Layout: '📝', CheckCircle: '✅',
      Volume2: '🔊', Clapperboard: '🎥', PenTool: '✏️', MessageSquare: '💬',
    }
    return emojiMap[iconName] || '🔧'
  }

  function getCategoryColor(name: string): string {
    const colorMap: Record<string, string> = {
      '图像生成': 'from-pink-500 to-rose-500',
      '代码生成': 'from-blue-500 to-cyan-500',
      '内容写作': 'from-emerald-500 to-teal-500',
      '视频生成': 'from-purple-500 to-violet-500',
      '语音合成': 'from-orange-500 to-amber-500',
      'AI 搜索': 'from-indigo-500 to-blue-500',
      '生产力工具': 'from-green-500 to-emerald-500',
      '文本对话': 'from-violet-500 to-purple-500',
    }
    return colorMap[name] || 'from-slate-500 to-slate-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">分类管理</h1>
          <p className="text-slate-600 mt-1">管理工具分类</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null)
            setFormData({ name: '', description: '', icon: 'Settings' })
            setShowModal(true)
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>添加分类</span>
        </button>
      </div>

      {/* Categories grid */}
      {loading ? (
        <div className="card p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 mt-4">加载中...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-500">暂无分类数据</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="card overflow-hidden">
              {/* Color header */}
              <div className={`h-24 bg-gradient-to-br ${getCategoryColor(category.name)} flex items-center justify-center`}>
                <span className="text-5xl">{getIconEmoji(category.icon)}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm">
                    {category.count} 个工具
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4">{category.description}</p>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => openEditModal(category)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">编辑</span>
                  </button>
                  <Link
                    href={`/category/${category.name}`}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">查看</span>
                  </Link>
                  <button
                    onClick={() => {
                      setCategoryToDelete(category)
                      setShowDeleteModal(true)
                    }}
                    className="flex items-center justify-center space-x-1 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingCategory ? '编辑分类' : '添加分类'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingCategory(null)
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="输入分类名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="输入分类描述"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">图标</label>
                <div className="grid grid-cols-10 gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`p-2 rounded-lg text-xl transition-colors ${
                        formData.icon === icon
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      {getIconEmoji(icon)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingCategory(null)
                  }}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  取消
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">确认删除</h3>
            <p className="text-slate-600 mb-6">
              确定要删除「{categoryToDelete?.name}」吗？此操作无法撤销。
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setCategoryToDelete(null)
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
  )
}
