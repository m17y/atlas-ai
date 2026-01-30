'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '../../layout'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Calendar, Tag } from 'lucide-react'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false, loading: () => <p className="p-4 text-slate-400">加载中...</p> }
)

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
)

interface NewsFormData {
  title: string
  date: string
  category: string
  summary: string
  content: string
  image: string
  tags: string[]
  published: boolean
}

const categories = ['大模型', '视频生成', '行业动态', '政策法规', '产品更新', '其他']
const sampleImages = ['🤖', '✨', '🎬', '🧠', '💻', '⚖️', '📱', '🔮']

export default function AdminNewsEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isEditing = params.id && params.id !== 'new'

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: '大模型',
    summary: '',
    content: '',
    image: '🤖',
    tags: [],
    published: true
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (isEditing) {
      fetchNews()
    }
  }, [isEditing])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/news/${params.id}`)
      if (res.ok) {
        const news = await res.json()
        setFormData({
          title: news.title,
          date: news.date,
          category: news.category,
          summary: news.summary,
          content: news.content,
          image: news.image,
          tags: JSON.parse(news.tags || '[]'),
          published: news.published
        })
      }
    } catch (error) {
      console.error('获取新闻失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.summary || !formData.content) {
      alert('请填写标题、摘要和内容')
      return
    }

    try {
      setSaving(true)
      const url = isEditing ? `/api/news/${params.id}` : '/api/news'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const news = await res.json()
        if (!isEditing) {
          router.push(`/admin/news/${news.id}`)
        } else {
          router.refresh()
        }
      } else {
        alert('保存失败')
      }
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 mt-4">加载中...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin/news')}
              className="p-2 text-slate-400 hover:text-slate-600 mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {isEditing ? '编辑新闻' : '发布新闻'}
              </h1>
              <p className="text-slate-500 mt-1">
                使用 Markdown 编辑新闻内容
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="btn-secondary flex items-center"
            >
              <Eye className="w-5 h-5 mr-2" />
              {previewMode ? '编辑' : '预览'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="输入新闻标题"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="card p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                摘要 *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="输入新闻摘要（显示在列表页）"
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <div className="card p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                内容 * (支持 Markdown)
              </label>
              <div data-color-mode="light">
                <MDEditor
                  value={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val || '' })}
                  height={400}
                  preview={previewMode ? 'preview' : 'edit'}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-medium text-slate-900 mb-4">基本信息</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    日期
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">分类</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">图标</label>
                  <div className="flex flex-wrap gap-2">
                    {sampleImages.map(img => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: img })}
                        className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                          formData.image === img 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {img}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">发布状态</span>
                  <button
                    onClick={() => setFormData({ ...formData, published: !formData.published })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.published ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.published ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-medium text-slate-900 mb-4">
                <Tag className="w-4 h-4 inline mr-2" />
                标签
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="添加标签"
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-primary-400 hover:text-primary-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {previewMode && (
              <div className="card p-6">
                <h3 className="font-medium text-slate-900 mb-4">预览</h3>
                <div className="prose prose-sm max-w-none">
                  <MarkdownPreview source={formData.content} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
