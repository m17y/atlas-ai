import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, ExternalLink } from 'lucide-react'
import { PrismaClient } from '@prisma/client'

export const metadata: Metadata = {
  title: 'AI新闻 - One-Coin AI',
  description: '了解最新的AI技术动态和行业新闻',
}

async function getNews() {
  try {
    const prisma = new PrismaClient()
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { date: 'desc' }
    })
    return news
  } catch (e) {
    console.error('Failed to fetch news:', e)
    return []
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">AI新闻</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">AI 新闻动态</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            追踪人工智能领域的最新发展，了解前沿技术动态
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">暂无新闻</h2>
            <p className="text-slate-500 mb-6">后台还没有发布任何新闻</p>
            <Link href="/admin/news/new" className="btn-primary">
              前往后台发布新闻
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="card card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-8xl">
                  {item.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    <Link href={`/news/${item.id}`}>{item.title}</Link>
                  </h2>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {item.summary}
                  </p>
                  <Link href={`/news/${item.id}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                    阅读全文 <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
