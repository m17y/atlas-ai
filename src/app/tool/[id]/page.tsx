import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Star, Heart, Share2, ExternalLink, Check, TrendingUp, Download, Eye, MessageSquare } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return {
    title: '工具详情 - Atlas AI',
    description: '查看AI工具的详细信息、使用体验和用户评价',
  }
}

async function getToolData(id: string) {
  try {
    const tool = await prisma.tool.findUnique({
      where: { id },
      include: { category: true },
    })
    return tool
  } catch (error) {
    console.error('Failed to fetch tool:', error)
    return null
  }
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = await getToolData(id)

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-600">工具不存在</p>
        </div>
        <Footer />
      </div>
    )
  }

  const pricingText = tool.pricing === 'free' 
    ? '免费' 
    : tool.pricing === 'paid' 
    ? '付费' 
    : '免费增值'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <a href="/" className="text-slate-500 hover:text-primary-600">首页</a>
            <span className="mx-2 text-slate-400">/</span>
            <a href="/categories" className="text-slate-500 hover:text-primary-600">分类</a>
            <span className="mx-2 text-slate-400">/</span>
            <a href={`/category/${tool.category?.name}`} className="text-slate-500 hover:text-primary-600">{tool.category?.name}</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">{tool.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool Info Card */}
            <div className="card overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <span className="text-8xl">{tool.icon}</span>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{tool.name}</h1>
                    <p className="text-slate-600">{tool.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <a 
                      href={tool.website || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>访问官网</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {Array.isArray(tool.tags) ? tool.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  )) : (
                    tool.tags ? (tool.tags as string).split(',').map((tag: string) => (
                      <span 
                        key={tag.trim()}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {tag.trim()}
                      </span>
                    )) : []
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center space-x-1">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-slate-900">{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-500">({tool.reviewCount.toLocaleString()} 条评价)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                      tool.pricing === 'paid' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {pricingText}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">主要功能</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '💬', title: '智能对话', desc: '支持自然语言交互' },
                  { icon: '📝', title: '内容生成', desc: '快速生成高质量内容' },
                  { icon: '💻', title: '代码辅助', desc: '智能编程建议和补全' },
                  { icon: '🌍', title: '多语言支持', desc: '支持多种语言交流' },
                  { icon: '⚡', title: '快速响应', desc: '实时生成结果' },
                  { icon: '🔒', title: '安全隐私', desc: '保护用户数据安全' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-medium text-slate-900">{feature.title}</h3>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">定价方案</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-slate-200 rounded-2xl">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">免费版</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-4">¥0<span className="text-sm font-normal text-slate-500">/月</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      基础功能
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      有限使用次数
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      标准响应速度
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-primary-600 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors">
                    免费使用
                  </button>
                </div>
                
                <div className="p-6 border-2 border-primary-500 rounded-2xl relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary-500 text-white rounded-full text-sm font-medium">
                    推荐
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">专业版</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-4">¥99<span className="text-sm font-normal text-slate-500">/月</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      全部功能
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      无限使用次数
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      优先响应速度
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      高级支持
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                    立即升级
                  </button>
                </div>
                
                <div className="p-6 border border-slate-200 rounded-2xl">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">企业版</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-4">定制</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      专属定制
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      私有化部署
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      24/7 支持
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      SLA 保障
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-slate-300 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                    联系销售
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">数据统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">今日访问</span>
                  <span className="font-semibold text-slate-900">12,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">本周下载</span>
                  <span className="font-semibold text-slate-900">89,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">收藏人数</span>
                  <span className="font-semibold text-slate-900">23,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">用户评分</span>
                  <span className="font-semibold text-slate-900">4.9/5.0</span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">工具信息</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 text-sm">分类</span>
                  <p className="font-medium text-slate-900">{tool.category?.name}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">定价模式</span>
                  <p className="font-medium text-slate-900">{pricingText}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">发布时间</span>
                  <p className="font-medium text-slate-900">2024年1月</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">开发商</span>
                  <p className="font-medium text-slate-900">OpenAI</p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">平台支持</span>
                  <p className="font-medium text-slate-900">Web, iOS, Android, API</p>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-4">相关工具</h3>
              <div className="space-y-4">
                {[
                  { name: 'Claude', icon: '🧠', rating: 4.9 },
                  { name: 'Gemini', icon: '✨', rating: 4.8 },
                  { name: 'Perplexity', icon: '🔍', rating: 4.7 },
                ].map((relatedTool) => (
                  <a 
                    key={relatedTool.name}
                    href="#" 
                    className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-2xl">{relatedTool.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{relatedTool.name}</h4>
                      <div className="flex items-center text-sm text-slate-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {relatedTool.rating}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
