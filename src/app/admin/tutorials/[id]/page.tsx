'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Plus, Trash2, BookOpen } from 'lucide-react'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false, loading: () => <p className="p-4 text-slate-400">加载中...</p> }
)

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
)

const AdminLayout = lazy(() => import('../../AdminLayoutWrapper'))

interface TutorialFormData {
  slug: string
  title: string
  description: string
  content: string
  icon: string
  level: string
  duration: string
  tools: string[]
  published: boolean
  chapters: Array<{
    id?: string
    title: string
    content: string
    order: number
  }>
}

const icons = ['📚', '💬', '🎨', '💻', '🧠', '🖼️', '🎬', '📝', '🎵', '📊', '🔐', '⚡']
const levels = ['入门', '中级', '高级']
const durations = ['10分钟', '15分钟', '20分钟', '25分钟', '30分钟', '45分钟', '60分钟']

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

export default function AdminTutorialEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isEditing = params.id && params.id !== 'new'

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState<TutorialFormData>({
    slug: '',
    title: '',
    description: '',
    content: '',
    icon: '📚',
    level: '入门',
    duration: '15分钟',
    tools: [],
    published: true,
    chapters: []
  })

  useEffect(() => {
    if (isEditing) {
      fetchTutorial()
    }
  }, [isEditing])

  const fetchTutorial = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/tutorials/${params.id}`)
      if (res.ok) {
        const tutorial = await res.json()
        setFormData({
          slug: tutorial.slug,
          title: tutorial.title,
          description: tutorial.description,
          content: tutorial.content,
          icon: tutorial.icon,
          level: tutorial.level,
          duration: tutorial.duration,
          tools: tutorial.tools || [],
          published: tutorial.published,
          chapters: tutorial.chapters || []
        })
      }
    } catch (error) {
      console.error('获取教程失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.description) {
      alert('请填写标题、slug 和描述')
      return
    }

    try {
      setSaving(true)
      const url = isEditing ? `/api/tutorials/${params.id}` : '/api/tutorials'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const tutorial = await res.json()
        if (!isEditing) {
          router.push(`/admin/tutorials/${tutorial.tutorial.slug}`)
        } else {
          router.refresh()
        }
      } else {
        const data = await res.json()
        alert('保存失败：' + (data.error || '未知错误'))
      }
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  const addTool = () => {
    setFormData(prev => ({
      ...prev,
      tools: [...prev.tools, '']
    }))
  }

  const updateTool = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.map((tool, i) => i === index ? value : tool)
    }))
  }

  const removeTool = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }))
  }

  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          title: `第 ${prev.chapters.length + 1} 章`,
          content: '',
          order: prev.chapters.length
        }
      ]
    }))
  }

  const updateChapter = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) => 
        i === index ? { ...chapter, [field]: value } : chapter
      )
    }))
  }

  const removeChapter = (index: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <Suspense fallback={<Loading />}>
        <AdminLayout>
          <Loading />
        </AdminLayout>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/tutorials')}
                className="p-2 text-slate-400 hover:text-slate-600 mr-4"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {isEditing ? '编辑教程' : '新建教程'}
                </h1>
                <p className="text-slate-500 mt-1">
                  使用 Markdown 编辑教程内容
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="btn-secondary flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-slate-900 mb-4">基本信息</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      标题 *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="教程标题"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="tutorial-slug"
                      disabled={isEditing}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      描述 *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="简短描述教程内容"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">图标</label>
                    <div className="flex flex-wrap gap-2">
                      {icons.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                            formData.icon === icon 
                              ? 'border-primary-500 bg-primary-50' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">难度</label>
                      <select
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">预计时长</label>
                      <select
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {durations.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  简介内容 (支持 Markdown)
                </label>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.content}
                    onChange={(val) => setFormData({ ...formData, content: val || '' })}
                    height={300}
                    preview={previewMode ? 'preview' : 'edit'}
                  />
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

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900">章节内容</h2>
                  <button
                    type="button"
                    onClick={addChapter}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加章节
                  </button>
                </div>
                
                <div className="space-y-6">
                  {formData.chapters.map((chapter, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={e => updateChapter(index, 'title', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mr-3"
                          placeholder="章节标题"
                        />
                        <button
                          type="button"
                          onClick={() => removeChapter(index)}
                          className="p-2 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <textarea
                        rows={6}
                        value={chapter.content}
                        onChange={e => updateChapter(index, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                        placeholder="章节内容（Markdown）"
                      />
                    </div>
                  ))}
                  {formData.chapters.length === 0 && (
                    <p className="text-slate-500 text-center py-4">暂无章节，点击上方按钮添加</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-medium text-slate-900 mb-4">相关工具</h3>
                
                <div className="space-y-3">
                  {formData.tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={tool}
                        onChange={e => updateTool(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="工具名称 <button
                        type="button"
"
                      />
                                             onClick={() => removeTool(index)}
                        className="p-2 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTool}
                    className="w-full px-3 py-2 border border-dashed border-slate-300 text-slate-500 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    添加工具
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">发布状态</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {formData.published ? '立即对所有用户可见' : '保存为草稿'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, published: !formData.published })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.published ? 'bg-primary-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.published ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Suspense>
  )
}
