'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  X,
} from 'lucide-react'

interface Category {
  id: string
  name: string
}

const icons = [
  'Settings', 'Image', 'Code', 'FileText', 'Film', 'Mic', 'Search', 'Zap',
  'Bot', 'Palette', 'Cpu', 'Copy', 'Globe', 'Layout', 'CheckCircle', 'Volume2',
  'Clapperboard', 'PenTool', 'MessageSquare',
]

export default function AdminToolFormPage() {
  const router = useRouter()
  const params = useParams()
  const isEditing = params.id && params.id !== 'new'

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    pricing: 'freemium',
    rating: 0,
    reviewCount: 0,
    tags: '',
    icon: 'Settings',
    website: '',
    featured: false,
    trending: false,
    latest: false,
  })

  useEffect(() => {
    fetchCategories()
    if (isEditing) {
      fetchTool()
    }
  }, [isEditing])

  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data || [])
      if (data.length > 0 && !isEditing) {
        setFormData(prev => ({ ...prev, categoryId: data[0].id }))
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  async function fetchTool() {
    try {
      const response = await fetch(`/api/tools/${params.id}`)
      const tool = await response.json()
      setFormData({
        name: tool.name,
        description: tool.description,
        categoryId: tool.categoryId,
        pricing: tool.pricing,
        rating: tool.rating,
        reviewCount: tool.reviewCount,
        tags: tool.tags.join(', '),
        icon: tool.icon,
        website: tool.website || '',
        featured: tool.featured,
        trending: tool.trending,
        latest: tool.latest,
      })
    } catch (error) {
      console.error('Failed to fetch tool:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing ? `/api/tools/${params.id}` : '/api/tools'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        router.push('/admin/tools')
      } else {
        alert('保存失败，请重试')
      }
    } catch (error) {
      console.error('Save failed:', error)
      alert('保存失败，请重试')
    } finally {
      setLoading(false)
    }
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/tools" className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEditing ? '编辑工具' : '添加工具'}
            </h1>
            <p className="text-slate-600 mt-1">
              {isEditing ? '修改工具信息' : '添加新的 AI 工具'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">基本信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="输入工具名称"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="输入工具描述"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                分类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">价格模式</label>
              <select
                value={formData.pricing}
                onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="free">免费 (Free)</option>
                <option value="paid">付费 (Paid)</option>
                <option value="freemium">免费增值 (Freemium)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">评分 (0-5)</label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">评价数量</label>
              <input
                type="number"
                value={formData.reviewCount}
                onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                标签 (用逗号分隔)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="例如：对话AI, 写作, 代码"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">官网链接</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">图标</h2>
          <div className="grid grid-cols-10 gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`p-3 rounded-lg text-2xl transition-colors ${
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

        {/* Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">状态</h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <span className="text-slate-700">精选工具 - 在首页精选区域显示</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.trending}
                onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <span className="text-slate-700">热门工具 - 在排行榜显示</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.latest}
                onChange={(e) => setFormData({ ...formData, latest: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <span className="text-slate-700">最新工具 - 在最新发布区域显示</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/admin/tools" className="px-6 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">
            取消
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? '保存中...' : '保存'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
