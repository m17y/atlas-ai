import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Code, ExternalLink, Copy, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'API文档 - One-Coin AI',
  description: 'One-Coin AI API 接口文档和使用指南',
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/tools',
    description: '获取所有AI工具列表',
    params: [
      { name: 'category', type: 'string', optional: true, description: '按分类筛选' },
      { name: 'featured', type: 'boolean', optional: true, description: '只返回精选工具' },
      { name: 'trending', type: 'boolean', optional: true, description: '只返回热门工具' },
      { name: 'limit', type: 'number', optional: true, description: '返回数量限制' }
    ],
    response: {
      tools: 'Array',
      total: 'number'
    }
  },
  {
    method: 'GET',
    path: '/api/tools/:id',
    description: '获取单个工具详情',
    params: [],
    response: {
      id: 'string',
      name: 'string',
      description: 'string',
      rating: 'number',
      category: 'object'
    }
  },
  {
    method: 'GET',
    path: '/api/categories',
    description: '获取所有分类列表',
    params: [],
    response: {
      categories: 'Array'
    }
  },
  {
    method: 'GET',
    path: '/api/categories/:id',
    description: '获取单个分类详情',
    params: [],
    response: {
      id: 'string',
      name: 'string',
      tools: 'Array'
    }
  }
]

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">API文档</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">API 文档</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            了解 One-Coin AI 的 RESTful API 接口，用于集成和开发
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                快速开始
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-xl">
                  <p className="text-slate-400 text-xs mb-2">Base URL</p>
                  <code className="text-green-400 text-sm">http://localhost:3000/api</code>
                </div>

                <div>
                  <p className="text-slate-600 text-sm mb-2">示例请求</p>
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto">
{`curl http://localhost:3000/api/tools`}
                  </pre>
                </div>

                <div>
                  <p className="text-slate-600 text-sm mb-2">响应格式</p>
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto">
{`{
  "tools": [...],
  "total": 16
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded font-bold text-sm ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-slate-900 font-mono">{endpoint.path}</code>
                </div>
                
                <p className="text-slate-600 mb-4">{endpoint.description}</p>
                
                {endpoint.params.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-slate-900 mb-2 text-sm">参数</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 font-medium text-slate-600">参数</th>
                            <th className="text-left py-2 font-medium text-slate-600">类型</th>
                            <th className="text-left py-2 font-medium text-slate-600">说明</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.params.map((param, i) => (
                            <tr key={i} className="border-b border-slate-100">
                              <td className="py-2">
                                <code className="text-primary-600">{param.name}</code>
                                {param.optional && <span className="text-slate-400 text-xs ml-1">可选</span>}
                              </td>
                              <td className="py-2 text-slate-500">{param.type}</td>
                              <td className="py-2 text-slate-600">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-slate-900 mb-2 text-sm">响应示例</h4>
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto">
{JSON.stringify(endpoint.response, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">需要更多API功能？</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            查看完整的开源项目，了解如何贡献新的API端点
          </p>
          <Link 
            href="https://github.com/m17y/atlas-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            查看GitHub项目
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
