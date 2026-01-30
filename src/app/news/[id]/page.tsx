import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'

const newsData: Record<string, {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  image: string
  tags: string[]
}> = {
  '1': {
    id: 1,
    title: 'OpenAI发布GPT-4.5：更强大的对话能力',
    date: '2025-01-25',
    category: '大模型',
    summary: 'OpenAI最新发布的GPT-4.5在对话能力和推理速度上都有显著提升，支持更长的上下文理解。',
    image: '🤖',
    tags: ['OpenAI', 'GPT-4.5', '大语言模型'],
    content: `OpenAI近日正式发布了GPT-4.5，这是该公司迄今为止最强大的对话AI模型。新版本在多个方面实现了重大突破。

## 主要特性

**增强的对话能力**
GPT-4.5在自然对话流畅性方面有了显著提升，能够更好地理解语境和用户意图，生成的回复更加自然和连贯。

**更长的上下文理解**
新模型支持最高128K的上下文窗口，这意味着用户可以输入更长的文档或对话历史，模型能够更好地理解和保持一致性。

**推理速度提升**
相比前代模型，GPT-4.5的推理速度提升了约40%，用户体验更加流畅。

## 行业影响

GPT-4.5的发布将进一步推动AI在各行业的应用。企业在客户服务、内容创作、代码编写等场景将获得更强大的AI辅助能力。

## 定价方案

OpenAI提供了多种定价方案，包括API调用和ChatGPT订阅服务，以满足不同用户的需求。`
  },
  '2': {
    id: 2,
    title: 'Google发布Gemini 2.0：多模态AI新突破',
    date: '2025-01-20',
    category: '大模型',
    summary: 'Google的Gemini 2.0版本带来了更强的多模态处理能力，可以同时处理文本、图像和音频。',
    image: '✨',
    tags: ['Google', 'Gemini', '多模态'],
    content: `Google DeepMind近日发布了Gemini 2.0，这是其最先进的多模态AI模型的最新版本。

## 技术亮点

**原生多模态**
Gemini 2.0从设计之初就支持文本、图像、音频和视频的统一处理，能够在各种模态之间无缝切换。

**增强的视觉理解**
新版本在图像理解和生成方面有了质的飞跃，可以精确识别复杂场景并生成高质量图像。

**实时处理能力**
Gemini 2.0支持实时语音和视频交互，为下一代AI助手奠定了基础。`
  },
  '3': {
    id: 3,
    title: 'AI生成视频技术取得重大突破',
    date: '2025-01-15',
    category: '视频生成',
    summary: 'Runway和Pika等AI视频生成工具发布了新一代模型，生成质量和速度大幅提升。',
    image: '🎬',
    tags: ['视频生成', 'AI工具', 'Runway', 'Pika'],
    content: `AI视频生成领域在2025年初迎来了重要突破，多家公司发布了新一代视频生成模型。

## 技术进步

**生成质量提升**
新一代模型生成的视频在清晰度、流畅性和一致性方面都有了显著改进。

**生成速度加快**
视频生成时间从数分钟缩短到数秒，大大提升了创作效率。

**时长延长**
新模型支持生成长达数分钟的高质量视频。`
  },
  '4': {
    id: 4,
    title: 'Claude 3.5超越GPT-4成为最强AI助手',
    date: '2025-01-10',
    category: '大模型',
    summary: 'Anthropic发布的Claude 3.5在多项基准测试中超越GPT-4，展现出更强大的推理能力。',
    image: '🧠',
    tags: ['Anthropic', 'Claude', '大语言模型'],
    content: `Anthropic公司发布的Claude 3.5在多项权威基准测试中取得了突破性成绩，成为当前最强的AI助手。

## 性能表现

**推理能力**
Claude 3.5在复杂推理任务中的表现超越了GPT-4，特别是在数学和编程领域。

**安全性**
新模型在安全性和对齐方面也取得了进步，能够更好地理解和遵守用户的安全要求。

**长上下文**
支持200K token的上下文窗口，适合处理长文档和复杂对话。`
  },
  '5': {
    id: 5,
    title: 'AI编程助手市场快速增长',
    date: '2025-01-05',
    category: '行业动态',
    summary: 'GitHub Copilot和Cursor等AI编程工具的用户量在2024年增长了三倍。',
    image: '💻',
    tags: ['AI编程', 'GitHub Copilot', 'Cursor'],
    content: `AI编程助手市场在2024年经历了爆发式增长，越来越多的开发者开始使用AI工具辅助编程。

## 市场数据

**用户增长**
GitHub Copilot和Cursor等主流工具的用户量增长了三倍。

**效率提升**
使用AI编程助手的开发者平均效率提升了40%以上。

**未来趋势**
预计到2025年底，超过80%的专业开发者将使用某种形式的AI编程辅助工具。`
  },
  '6': {
    id: 6,
    title: '欧盟发布AI监管新规',
    date: '2025-01-01',
    category: '政策法规',
    summary: '欧盟正式通过AI法案，对高风险AI系统实施更严格的监管要求。',
    image: '⚖️',
    tags: ['欧盟', 'AI监管', '政策法规'],
    content: `欧盟近日正式通过了《人工智能法案》，这是全球首部全面的AI监管法规。

## 主要内容

**风险分级**
法案将AI系统分为四个风险等级，对高风险系统实施更严格的监管。

**透明度要求**
要求AI系统开发者披露关键技术信息和使用限制。

**违规处罚**
对违规行为的处罚可达全球营收的6%或3000万欧元。`
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const newsItem = newsData[id]
  
  if (!newsItem) {
    return {
      title: '新闻未找到 - One-Coin AI'
    }
  }
  
  return {
    title: `${newsItem.title} - AI新闻`,
    description: newsItem.summary
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const newsItem = newsData[id]

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
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
            {newsItem.content}
          </div>
        </div>

        {newsItem.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">相关标签</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, index) => (
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
