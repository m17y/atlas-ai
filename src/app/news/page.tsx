import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FileText, Calendar, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI新闻 - One-Coin AI',
  description: '了解最新的AI技术动态和行业新闻',
}

const news = [
  {
    id: 1,
    title: 'OpenAI发布GPT-4.5：更强大的对话能力',
    date: '2025-01-25',
    category: '大模型',
    summary: 'OpenAI最新发布的GPT-4.5在对话能力和推理速度上都有显著提升，支持更长的上下文理解。',
    image: '🤖'
  },
  {
    id: 2,
    title: 'Google发布Gemini 2.0：多模态AI新突破',
    date: '2025-01-20',
    category: '大模型',
    summary: 'Google的Gemini 2.0版本带来了更强的多模态处理能力，可以同时处理文本、图像和音频。',
    image: '✨'
  },
  {
    id: 3,
    title: 'AI生成视频技术取得重大突破',
    date: '2025-01-15',
    category: '视频生成',
    summary: 'Runway和Pika等AI视频生成工具发布了新一代模型，生成质量和速度大幅提升。',
    image: '🎬'
  },
  {
    id: 4,
    title: 'Claude 3.5超越GPT-4成为最强AI助手',
    date: '2025-01-10',
    category: '大模型',
    summary: 'Anthropic发布的Claude 3.5在多项基准测试中超越GPT-4，展现出更强大的推理能力。',
    image: '🧠'
  },
  {
    id: 5,
    title: 'AI编程助手市场快速增长',
    date: '2025-01-05',
    category: '行业动态',
    summary: 'GitHub Copilot和Cursor等AI编程工具的用户量在2024年增长了三倍。',
    image: '💻'
  },
  {
    id: 6,
    title: '欧盟发布AI监管新规',
    date: '2025-01-01',
    category: '政策法规',
    summary: '欧盟正式通过AI法案，对高风险AI系统实施更严格的监管要求。',
    image: '⚖️'
  }
]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
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
      </div>

      <Footer />
    </main>
  )
}
