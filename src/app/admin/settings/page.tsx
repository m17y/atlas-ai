'use client'

import { useState, lazy, Suspense } from 'react'
import { Settings, Info, Shield, Bell, Save, Eye, EyeOff } from 'lucide-react'

const AdminLayout = lazy(() => import('../AdminLayoutWrapper'))

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

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  
  const [settings, setSettings] = useState({
    siteName: 'One-Coin AI',
    siteDescription: '发现最新的人工智能工具与技术',
    adminUsername: 'admin',
    adminPassword: '',
    maintenanceMode: false,
    allowRegistration: false,
    notifyOnNewTool: true,
    notifyOnNewReview: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('site_settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">系统设置</h1>
            <p className="text-slate-500 mt-1">管理站点配置和系统参数</p>
          </div>

          <div className="flex gap-6">
            <div className="w-48 flex-shrink-0">
              <nav className="space-y-1">
                {[
                  { id: 'general', name: '基本设置', icon: Settings },
                  { id: 'security', name: '安全设置', icon: Shield },
                  { id: 'notifications', name: '通知设置', icon: Bell },
                  { id: 'about', name: '关于', icon: Info },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1">
              {activeTab === 'general' && (
                <div className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">基本设置</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      站点名称
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      站点描述
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">维护模式</h3>
                      <p className="text-sm text-slate-500">启用后普通用户无法访问前台</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.maintenanceMode ? 'bg-primary-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.maintenanceMode ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">安全设置</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      管理员用户名
                    </label>
                    <input
                      type="text"
                      value={settings.adminUsername}
                      onChange={(e) => setSettings({ ...settings, adminUsername: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      管理员密码
                    </label>
                    <div className="relative">
                      <input
                        type={showSecrets.password ? 'text' : 'password'}
                        value={settings.adminPassword}
                        onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
                        placeholder="留空则不修改"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => toggleSecret('password')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                      >
                        {showSecrets.password ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      修改密码需要重启服务器使 .env 生效
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900">允许注册</h3>
                      <p className="text-sm text-slate-500">允许普通用户注册账号</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.allowRegistration ? 'bg-primary-600' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.allowRegistration ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">通知设置</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-slate-900">新工具通知</h3>
                        <p className="text-sm text-slate-500">当有新工具提交时发送通知</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, notifyOnNewTool: !settings.notifyOnNewTool })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.notifyOnNewTool ? 'bg-primary-600' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifyOnNewTool ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-slate-900">新评论通知</h3>
                        <p className="text-sm text-slate-500">当有新评论时发送通知</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, notifyOnNewReview: !settings.notifyOnNewReview })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.notifyOnNewReview ? 'bg-primary-600' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.notifyOnNewReview ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">关于</h2>
                  
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">One-Coin AI</h3>
                    <p className="text-slate-500 mb-4">发现最新的人工智能工具与技术</p>
                    <div className="text-sm text-slate-400">
                      <p>版本 1.0.0</p>
                      <p className="mt-2">Built with Next.js, Prisma, TailwindCSS</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h4 className="font-medium text-slate-900 mb-3">技术栈</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">框架</span>
                        <p className="font-medium text-slate-900">Next.js 14</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">数据库</span>
                        <p className="font-medium text-slate-900">SQLite + Prisma</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">样式</span>
                        <p className="font-medium text-slate-900">TailwindCSS</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">图标</span>
                        <p className="font-medium text-slate-900">Lucide React</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end space-x-4">
                {saved && (
                  <span className="text-green-600 text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    保存成功
                  </span>
                )}
                <button onClick={handleSave} className="btn-primary flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  保存设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Suspense>
  )
}
