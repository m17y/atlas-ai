import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Star, Heart, Share2, ExternalLink, Check, TrendingUp, Download, Eye, MessageSquare } from 'lucide-react'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'ChatGPT - AI Tech Hub',
    description: 'OpenAI 推出的对话式AI助手，能够进行自然语言对话、写作、编程等多种任务',
  }
}

export async function generateStaticParams() {
  // 生成前8个工具的静态参数
  const tools = [
    { id: '1', name: 'ChatGPT' },
    { id: '2', name: 'Midjourney' },
    { id: '3', name: 'Claude' },
    { id: '4', name: 'GitHub Copilot' },
    { id: '5', name: 'Stable Diffusion' },
    { id: '6', name: 'Runway' },
    { id: '7', name: 'Notion AI' },
    { id: '8', name: 'Gamma' },
  ]
  
  return tools.map((tool) => ({
    id: tool.id,
  }))
}

const toolData = {
  id: 1,
  name: 'ChatGPT',
  description: 'OpenAI 推出的对话式AI助手，能够进行自然语言对话、写作、编程等多种任务。作为最受欢迎的AI对话工具之一，ChatGPT 基于强大的 GPT-4 模型，可以帮助你完成各种复杂的工作。',
  icon: '🤖',
  tags: ['对话AI', '写作', '编程', '文本生成', 'AI助手'],
  rating: 4.9,
  reviewCount: 12500,
  category: '文本对话',
  website: 'https://chat.openai.com',
  pricing: '免费 / 付费版 $20/月',
  releaseDate: '2022年11月',
  company: 'OpenAI',
  platform: 'Web, iOS, Android, API',

  // Stats
  todayVisits: '12,456',
  weeklyDownloads: '89,234',
  favorites: '23,456',

  // Features
  features: [
    { title: '智能对话', description: '支持自然语言对话，可以理解复杂的语境和指令' },
    { title: '多语言支持', description: '支持中文、英文、日文等多种语言的对话和写作' },
    { title: '代码编写', description: '可以帮助编写、调试和解释各种编程语言的代码' },
    { title: '文档写作', description: '支持撰写文章、邮件、报告等多种类型的文档' },
    { title: '创意生成', description: '可以生成创意内容，包括故事、诗歌、营销文案等' },
    { title: 'API集成', description: '提供API接口，可以集成到自己的应用中使用' }
  ],

  // Pricing Plans
  pricingPlans: [
    {
      name: '免费版',
      price: '免费',
      features: ['基础对话功能', 'GPT-3.5模型', '标准响应速度', '有限的使用次数'],
      popular: false
    },
    {
      name: 'Plus',
      price: '$20/月',
      features: ['GPT-4模型', '更快的响应速度', '无限使用次数', '优先访问新功能'],
      popular: true
    },
    {
      name: 'Team',
      price: '$25/月/人',
      features: ['GPT-4模型', '团队协作功能', '管理后台', '更高的使用限制'],
      popular: false
    }
  ],

  // Use Cases
  useCases: [
    {
      title: '代码开发',
      description: '帮助开发者编写、调试和优化代码',
      image: '💻'
    },
    {
      title: '内容创作',
      description: '撰写文章、博客、营销文案等各类内容',
      image: '✍️'
    },
    {
      title: '学习助手',
      description: '解答问题、解释概念、辅助学习',
      image: '📚'
    },
    {
      title: '商务沟通',
      description: '撰写邮件、报告、商务提案等',
      image: '💼'
    }
  ],

  // Reviews
  reviews: [
    {
      user: '技术开发者',
      avatar: '👨‍💻',
      rating: 5,
      date: '2025-01-15',
      content: 'ChatGPT 彻底改变了我的开发工作流程。它帮我节省了大量编写样板代码的时间，而且对复杂问题的解释非常清晰。',
      helpful: 128
    },
    {
      user: '内容创作者',
      avatar: '👩‍🎨',
      rating: 5,
      date: '2025-01-12',
      content: '作为一个内容创作者，ChatGPT 是我的得力助手。它帮我快速生成创意、润色文案，极大提高了工作效率。',
      helpful: 89
    },
    {
      user: '学生用户',
      avatar: '👨‍🎓',
      rating: 4,
      date: '2025-01-10',
      content: '学习过程中的好帮手！用它来理解复杂的概念和解答作业问题非常有效。不过要注意培养独立思考能力。',
      helpful: 56
    }
  ],

  // Related Tools
  relatedTools: [
    { name: 'Claude', icon: '🧠', rating: 4.9 },
    { name: 'Gemini', icon: '💎', rating: 4.8 },
    { name: 'Perplexity', icon: '🔍', rating: 4.7 },
    { name: 'Mistral', icon: '🌪️', rating: 4.6 }
  ]
}

export default function ToolPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <a href="/" className="text-slate-500 hover:text-primary-600">首页</a>
            <span className="mx-2 text-slate-400">/</span>
            <a href="/categories" className="text-slate-500 hover:text-primary-600">分类</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">{toolData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Icon & Basic Info */}
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl flex items-center justify-center text-7xl">
                {toolData.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{toolData.name}</h1>
                <p className="text-slate-600 mb-4">{toolData.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {toolData.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    {toolData.rating} ({toolData.reviewCount.toLocaleString()} 条评价)
                  </span>
                  <span>{toolData.category}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex-1 flex flex-col items-end space-y-3">
              <div className="flex space-x-3">
                <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <a
                href={toolData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2"
              >
                <span>访问官网</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100">
            <div className="text-center">
              <div className="flex items-center justify-center text-slate-400 mb-2">
                <Eye className="w-5 h-5 mr-2" />
                <span className="text-sm">今日访问</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{toolData.todayVisits}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-slate-400 mb-2">
                <Download className="w-5 h-5 mr-2" />
                <span className="text-sm">本周下载</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{toolData.weeklyDownloads}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-slate-400 mb-2">
                <Heart className="w-5 h-5 mr-2" />
                <span className="text-sm">收藏数量</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{toolData.favorites}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-md mb-8 overflow-x-auto">
          {['概览', '功能特性', '定价方案', '使用案例', '用户评价', '相关推荐'].map((tab, index) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                index === 0
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">功能特性</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {toolData.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">定价方案</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {toolData.pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative bg-slate-50 rounded-2xl p-6 ${
                      plan.popular ? 'border-2 border-primary-500' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          最受欢迎
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-primary-600 mb-6">
                      {plan.price}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                    }`}>
                      选择方案
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">使用案例</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {toolData.useCases.map((useCase, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <span className="text-4xl mb-4 block">{useCase.image}</span>
                    <h3 className="font-bold text-slate-900 mb-2">{useCase.title}</h3>
                    <p className="text-sm text-slate-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">用户评价</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  查看全部 {toolData.reviewCount.toLocaleString()} 条评价
                </button>
              </div>

              <div className="space-y-6">
                {toolData.reviews.map((review: any, index: number) => (
                  <div key={index} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">{review.avatar}</span>
                      <div>
                        <div className="font-medium text-slate-900">{review.user}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">{review.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-slate-400 hover:text-primary-600 transition-colors">
                        <span>有帮助</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded-full">{review.helpful}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-slate-400 hover:text-primary-600 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>评论</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-slate-900 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">发布者</span>
                  <span className="font-medium text-slate-900">{toolData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">发布时间</span>
                  <span className="font-medium text-slate-900">{toolData.releaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">平台</span>
                  <span className="font-medium text-slate-900">{toolData.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">定价</span>
                  <span className="font-medium text-slate-900">{toolData.pricing}</span>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-slate-900 mb-4">相似工具</h3>
              <div className="space-y-4">
                {toolData.relatedTools.map((tool, index) => (
                  <a key={index} href={`/tool/${index + 2}`} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{tool.name}</div>
                      <div className="flex items-center text-sm text-slate-400">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {tool.rating}
                      </div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Browse History */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-slate-900 mb-4">浏览历史</h3>
              <div className="space-y-3">
                {['Claude', 'Midjourney', 'GitHub Copilot'].map((name, index) => (
                  <a key={index} href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-xl">→</span>
                    <span className="text-slate-600 hover:text-primary-600">{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
