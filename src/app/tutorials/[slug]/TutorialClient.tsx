'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ChevronRight, Clock, BookOpen, ArrowLeft, Play } from 'lucide-react'

interface Chapter {
  id: string
  title: string
  content: string
  order: number
}

interface TutorialData {
  id: string
  slug: string
  title: string
  description: string
  content: string
  icon: string
  level: string
  duration: string
  tools: string
  chapters: Chapter[]
}

interface TutorialDetailClientProps {
  tutorial: TutorialData
}

export default function TutorialDetailClient({ tutorial }: TutorialDetailClientProps) {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(
    tutorial.chapters.length > 0 ? tutorial.chapters[0] : null
  )

  const tools = JSON.parse(tutorial.tools || '[]')

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Wiki Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  教程目录
                </h3>
              </div>
              <nav className="max-h-[60vh] overflow-y-auto">
                {tutorial.chapters.length > 0 ? (
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => setCurrentChapter(null)}
                        className={`w-full px-4 py-3 text-left transition-colors border-l-2 ${
                          currentChapter === null
                            ? 'border-l-primary-600 bg-primary-50 text-primary-700'
                            : 'border-l-transparent hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div className="font-medium">简介</div>
                        <div className="text-xs text-slate-400 mt-1">概述和介绍</div>
                      </button>
                    </li>
                    {tutorial.chapters.map((chapter, index) => (
                      <li key={chapter.id}>
                        <button
                          onClick={() => setCurrentChapter(chapter)}
                          className={`w-full px-4 py-3 text-left transition-colors border-l-2 ${
                            currentChapter?.id === chapter.id
                              ? 'border-l-primary-600 bg-primary-50 text-primary-700'
                              : 'border-l-transparent hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="font-medium flex items-center">
                            <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 text-xs flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            {chapter.title}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    暂无章节
                  </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tutorial Header */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-start gap-6">
                <span className="text-6xl">{tutorial.icon}</span>
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

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-md p-8">
              {currentChapter ? (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                      <span className="w-8 h-8 rounded bg-primary-100 text-primary-600 flex items-center justify-center text-sm mr-3">
                        {tutorial.chapters.findIndex(c => c.id === currentChapter.id) + 1}
                      </span>
                      {currentChapter.title}
                    </h2>
                    <div className="flex items-center text-sm text-slate-500">
                      <span className="bg-slate-100 px-3 py-1 rounded-full">
                        {currentChapter.content.length} 字
                      </span>
                    </div>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {currentChapter.content}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => {
                        const currentIndex = tutorial.chapters.findIndex(c => c.id === currentChapter.id)
                        if (currentIndex > 0) {
                          setCurrentChapter(tutorial.chapters[currentIndex - 1])
                        }
                      }}
                      disabled={tutorial.chapters.findIndex(c => c.id === currentChapter.id) === 0}
                      className="px-4 py-2 text-slate-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      上一章
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = tutorial.chapters.findIndex(c => c.id === currentChapter.id)
                        if (currentIndex < tutorial.chapters.length - 1) {
                          setCurrentChapter(tutorial.chapters[currentIndex + 1])
                        }
                      }}
                      disabled={tutorial.chapters.findIndex(c => c.id === currentChapter.id) === tutorial.chapters.length - 1}
                      className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      下一章
                      <Play className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 pb-4 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">教程简介</h2>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {tutorial.content}
                    </div>
                  </div>
                  {tutorial.chapters.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <button
                        onClick={() => setCurrentChapter(tutorial.chapters[0])}
                        className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        开始学习第一章
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Related Tools */}
            {tools.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🛠️</span>
                  相关工具
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool: string, index: number) => (
                    <Link 
                      key={index}
                      href={`/categories?search=${encodeURIComponent(tool)}`}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {tool}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to List */}
            <div className="mt-6">
              <Link 
                href="/tutorials"
                className="inline-flex items-center text-slate-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回教程列表
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
