import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ChevronRight, Clock, BookOpen, Play, ExternalLink, ArrowLeft } from 'lucide-react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tutorial = await prisma.tutorial.findUnique({
    where: { slug }
  })
  
  return {
    title: tutorial ? `${tutorial.title} - 教程指南` : '教程未找到',
    description: tutorial?.description || 'One-Coin AI 教程指南'
  }
}

async function getTutorial(slug: string) {
  const tutorial = await prisma.tutorial.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { order: 'asc' }
      }
    }
  })
  return tutorial
}

export default async function TutorialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutorial = await getTutorial(slug)

  if (!tutorial) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">教程未找到</h1>
            <p className="text-slate-600 mb-8">您访问的教程不存在或已被删除</p>
            <Link href="/tutorials" className="btn-primary">
              返回教程列表
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const tools = JSON.parse(tutorial.tools || '[]')

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/tutorials" className="text-slate-500 hover:text-primary-600">教程</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tutorial Header */}
            <div className="card p-8 mb-8">
              <div className="flex items-start gap-6">
                <div className="text-7xl">{tutorial.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tutorial.level === '入门' ? 'bg-green-100 text-green-700' :
                      tutorial.level === '中级' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tutorial.level}
                    </span>
                    <span className="text-slate-500 flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.duration}
                    </span>
                    <span className="text-slate-500 flex items-center text-sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {tutorial.chapters.length} 章节
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">{tutorial.title}</h1>
                  <p className="text-slate-600">{tutorial.description}</p>
                </div>
              </div>
            </div>

            {/* Chapter List */}
            <div className="card">
              <div className="p-6 border-b border-slate-200">
                <h2 className="font-bold text-slate-900 text-xl">教程目录</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {tutorial.chapters.length > 0 ? (
                  tutorial.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{chapter.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {chapter.content.length} 字
                            </p>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                          <Play className="w-4 h-4 mr-1" />
                          开始学习
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    <p>暂无章节内容</p>
                    <p className="text-sm mt-2">教程内容正在准备中</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Tools */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🛠️</span>
                相关工具
              </h3>
              <div className="space-y-3">
                {tools.map((tool: string, index: number) => (
                  <Link 
                    key={index}
                    href={`/categories?search=${encodeURIComponent(tool)}`}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-slate-700">{tool}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 mb-4">学习进度</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">已完成</span>
                  <span className="text-slate-900 font-medium">0 / {tutorial.chapters.length}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-slate-500">开始学习以追踪进度</p>
              </div>
            </div>

            {/* Back to List */}
            <Link 
              href="/tutorials"
              className="flex items-center justify-center w-full py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回教程列表
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
