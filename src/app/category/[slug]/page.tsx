'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Tool, Category } from '@/lib/api'
import { getIconEmoji, getCategoryColor } from '@/lib/icons'
import Link from 'next/link'

export default function CategoryPage() {
  const params = useParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

  const categorySlug = params?.slug as string

  useEffect(() => {
    async function fetchData() {
      try {
        // 获取所有分类找到当前分类
        const categoriesResponse = await fetch('/api/categories')
        const categoriesData = await fetch('/api/categories').then(res => res.json())
        setCategories(categoriesData)

        // 找到匹配的分类
        const foundCategory = categoriesData.find((cat: Category) => 
          cat.name === categorySlug || cat.id === categorySlug
        )
        setCategory(foundCategory || null)

        // 获取该分类的工具
        if (foundCategory) {
          const toolsResponse = await fetch(`/api/tools?category=${foundCategory.id}`)
          const toolsData = await toolsResponse.json()
          setTools(toolsData.tools)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categorySlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mb-4" />
            <div className="h-4 bg-slate-200 rounded w-24 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-5">
                    <div className="h-6 bg-slate-200 rounded mb-3" />
                    <div className="h-4 bg-slate-200 rounded mb-4" />
                    <div className="flex gap-1.5">
                      <div className="h-5 w-16 bg-slate-200 rounded-full" />
                      <div className="h-5 w-16 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-600">分类不存在</p>
          <Link href="/categories" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            返回分类页面
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${getCategoryColor(category.name)} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl">{getIconEmoji(category.icon)}</span>
            <h1 className="text-4xl font-bold text-white">{category.name}</h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl">{category.description}</p>
          <div className="mt-6 text-white/60">
            共 {tools.length} 个工具
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-primary-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-primary-600">分类</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{category.name}</span>
        </nav>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tool/${tool.id}`}
                className="card card-hover group"
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-7xl group-hover:from-primary-50 group-hover:to-purple-50 transition-colors">
                  {getIconEmoji(tool.icon)}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {tool.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                      tool.pricing === 'paid' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tool.pricing === 'free' ? '免费' : tool.pricing === 'paid' ? '付费' : '免费增值'}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-700">{tool.rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">({tool.reviewCount.toLocaleString()})</span>
                    </div>
                    <span className="text-sm text-primary-600 font-medium group-hover:underline">
                      查看详情 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">该分类下暂无工具</p>
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">其他分类</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(c => c.id !== category.id).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.name}`}
                className="card p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getIconEmoji(cat.icon)}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-500">{cat.count} 个工具</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
