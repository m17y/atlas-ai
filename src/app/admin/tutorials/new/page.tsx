'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../layout'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

export default function NewTutorialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tutorial, setTutorial] = useState({
    slug: '',
    title: '',
    description: '',
    content: '',
    icon: '📚',
    level: '入门',
    duration: '15分钟',
    tools: [] as string[],
    published: true
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    fetch('/api/tutorials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tutorial)
    })
      .then(res => res.json())
      .then(data => {
        if (data.tutorial) {
          router.push('/admin/tutorials')
        } else {
          alert('创建失败：' + (data.error || '未知错误'))
        }
      })
      .catch(err => {
        alert('创建失败：' + err.message)
      })
      .finally(() => setLoading(false))
  }

  function addTool() {
    setTutorial(prev => ({
      ...prev,
      tools: [...prev.tools, '']
    }))
  }

  function updateTool(index: number, value: string) {
    setTutorial(prev => ({
      ...prev,
      tools: prev.tools.map((tool, i) => i === index ? value : tool)
    }))
  }

  function removeTool(index: number) {
    setTutorial(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }))
  }

  const icons = ['📚', '💬', '🎨', '💻', '🧠', '🖼️', '🎬', '📝', '🎵', '📊', '🔐', '⚡']
  const levels = ['入门', '中级', '高级']
  const durations = ['10分钟', '15分钟', '20分钟', '25分钟', '30分钟', '45分钟', '60分钟']

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">新建教程</h1>
            <p className="text-slate-500 mt-1">创建新的教程内容</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6">
            <h2 className="font-bold text-slate-900 mb-4">基本信息</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  标题 *
                </label>
                <input
                  type="text"
                  required
                  value={tutorial.title}
                  onChange={e => setTutorial({ ...tutorial, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="教程标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={tutorial.slug}
                  onChange={e => setTutorial({ ...tutorial, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="tutorial-slug"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  描述 *
                </label>
                <textarea
                  required
                  rows={3}
                  value={tutorial.description}
                  onChange={e => setTutorial({ ...tutorial, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="简短描述教程内容"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  图标
                </label>
                <div className="flex flex-wrap gap-2">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setTutorial({ ...tutorial, icon })}
                      className={`w-10 h-10 text-2xl rounded-lg border-2 transition-colors ${
                        tutorial.icon === icon ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    难度
                  </label>
                  <select
                    value={tutorial.level}
                    onChange={e => setTutorial({ ...tutorial, level: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    预计时长
                  </label>
                  <select
                    value={tutorial.duration}
                    onChange={e => setTutorial({ ...tutorial, duration: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {durations.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">相关工具</h2>
              <button type="button" onClick={addTool} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                添加工具
              </button>
            </div>
            
            <div className="space-y-3">
              {tutorial.tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={tool}
                    onChange={e => updateTool(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="工具名称"
                  />
                  <button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {tutorial.tools.length === 0 && (
                <p className="text-slate-500 text-sm">暂无相关工具，点击上方按钮添加</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="card p-6">
            <h2 className="font-bold text-slate-900 mb-4">教程内容</h2>
            <textarea
              rows={10}
              value={tutorial.content}
              onChange={e => setTutorial({ ...tutorial, content: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              placeholder="使用 Markdown 格式编写教程内容..."
            />
            <p className="text-sm text-slate-500 mt-2">
              支持 Markdown 格式，可使用 # 标题、**粗体**、- 列表等语法
            </p>
          </div>

          {/* Publish */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">发布状态</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {tutorial.published ? '教程将立即对所有用户可见' : '教程将保存为草稿，仅管理员可见'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTutorial({ ...tutorial, published: !tutorial.published })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tutorial.published ? 'bg-primary-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tutorial.published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center px-6 py-3"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? '保存中...' : '保存教程'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
