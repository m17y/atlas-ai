'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
)

interface NewsItem {
  id: string
  title: string
  date: string
  category: string
  summary: string
  content: string
  image: string
  tags: string
}

function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 mt-4">加载中...</p>
    </div>
  )
}

export default function NewsDetailPage() {
  const params = useParams()
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  const newsId = params?.id as string

  useEffect(() => {
    if (!newsId) {
      setLoading(false)
      return
    }

    async function fetchNews() {
      try {
        const res = await fetch(`/api/news/${newsId}`)
        if (res.ok) {
          const data = await res.json()
          setNewsItem(data)
        }
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [newsId])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <Loading />
        <Footer />
      </main>
    )
  }

  if (!newsItem) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">新闻未找到</h1>
            <p className="text-slate-600 mb-8">您访问的新闻不存在或已被删除</p>
            <Link href="/news" className="btn-primary">
              返回新闻列表
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const tags = JSON.parse(newsItem.tags || '[]')

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/news" className="text-slate-500 hover:text-primary-600">AI新闻</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">{newsItem.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {newsItem.category}
            </span>
            <span className="text-slate-500 flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {newsItem.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {newsItem.title}
          </h1>
          <div className="text-6xl mb-8 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 text-center">
            {newsItem.image}
          </div>
        </header>

        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {newsItem.summary}
          </p>
          <div className="markdown-body" data-color-mode="light">
            <MarkdownPreview source={newsItem.content} />
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">相关标签</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-slate-200">
          <Link 
            href="/news" 
            className="inline-flex items-center text-slate-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回新闻列表
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
