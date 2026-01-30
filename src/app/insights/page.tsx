import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TrendingUp, BarChart3, ArrowRight, Zap, Bot, Layers, Image, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: '趋势分析 - AI Tech Hub',
  description: '了解最新的AI技术发展趋势和行业洞察',
}

const trendData = [
  {
    category: '多模态AI',
    change: '+150%',
    trend: 'up',
    description: '多模态AI工具发布量增长',
    details: '支持文本、图像、视频等多种模态的AI工具正在成为主流，2024年相关工具发布量同比增长150%。',
    icon: Layers,
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'AI Agent',
    change: '+85%',
    trend: 'up',
    description: 'AI Agent相关工具搜索量上升',
    details: '能够自主执行任务的AI Agent成为新热点，用户对自动化AI助手的需求增长了85%。',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: '开源框架',
    change: '+200%',
    trend: 'up',
    description: '开源AI框架下载量突破记录',
    details: 'Hugging Face、LangChain等开源框架下载量持续增长，开发者对开源AI工具兴趣浓厚。',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    category: '图像生成',
    change: '+95%',
    trend: 'up',
    description: 'AI图像生成工具持续火热',
    details: '从DALL-E到Midjourney，AI图像生成工具的多样化和质量提升推动了95%的增长。',
    icon: Image,
    color: 'from-pink-500 to-rose-500'
  },
  {
    category: '代码辅助',
    change: '+120%',
    trend: 'up',
    description: 'AI编程助手需求激增',
    details: 'GitHub Copilot的成功带动了整个AI编程助手市场，需求同比增长120%。',
    icon: Code,
    color: 'from-indigo-500 to-blue-500'
  }
]

const monthlyData = [
  { month: '7月', tools: 180, frameworks: 45, agents: 20 },
  { month: '8月', tools: 210, frameworks: 52, agents: 28 },
  { month: '9月', tools: 245, frameworks: 58, agents: 35 },
  { month: '10月', tools: 290, frameworks: 68, agents: 45 },
  { month: '11月', tools: 340, frameworks: 78, agents: 58 },
  { month: '12月', tools: 420, frameworks: 92, agents: 75 },
  { month: '1月', tools: 520, frameworks: 115, agents: 95 }
]

const hotKeywords = [
  { keyword: 'GPT-4', trend: 'up', count: 125000 },
  { keyword: 'AI Agent', trend: 'up', count: 89000 },
  { keyword: '多模态', trend: 'up', count: 76000 },
  { keyword: 'Stable Diffusion', trend: 'up', count: 68000 },
  { keyword: 'LangChain', trend: 'up', count: 54000 },
  { keyword: 'Claude', trend: 'up', count: 48000 },
  { keyword: 'AI视频生成', trend: 'up', count: 42000 },
  { keyword: 'Llama 2', trend: 'down', count: 38000 }
]

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <a href="/" className="text-slate-500 hover:text-primary-600">首页</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">趋势分析</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">AI技术趋势分析</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            基于数据分析，为你呈现最新的AI技术发展趋势和行业洞察
          </p>
        </div>

        {/* Trend Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trendData.map((trend, index) => {
            const Icon = trend.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${trend.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">{trend.change}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{trend.category}</h3>
                <p className="text-slate-600 mb-4">{trend.description}</p>
                <p className="text-sm text-slate-500">{trend.details}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">近7个月AI工具发布趋势</h2>
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-sm text-slate-400">
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>

              {/* Chart area */}
              <div className="absolute left-12 right-0 bottom-0 top-0">
                <svg className="w-full h-full" viewBox="0 0 700 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="700"
                      y2={i * 50}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Tools line */}
                  <path
                    d="M0,183 M100,166 M200,144 M300,120 M400,93 M500,60 M600,23"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Frameworks line */}
                  <path
                    d="M0,178 M100,170 M200,160 M300,148 M400,133 M500,115 M600,85"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Agents line */}
                  <path
                    d="M0,190 M100,183 M200,172 M300,155 M400,133 M500,105 M600,70"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {monthlyData.map((data, i) => (
                    <g key={i}>
                      <circle cx={i * 100} cy={200 - (data.tools / 600) * 200} r="4" fill="#6366f1" />
                      <circle cx={i * 100} cy={200 - (data.frameworks / 600) * 200} r="4" fill="#8b5cf6" />
                      <circle cx={i * 100} cy={200 - (data.agents / 600) * 200} r="4" fill="#ec4899" />
                    </g>
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 text-sm text-slate-400">
                  {monthlyData.map((data, i) => (
                    <span key={i} className="w-16 text-center">{data.month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                <span className="text-sm text-slate-600">AI工具</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-sm text-slate-600">开发框架</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-sm text-slate-600">AI Agent</span>
              </div>
            </div>
          </div>

          {/* Hot Keywords */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">热门搜索关键词</h2>
            <div className="space-y-4">
              {hotKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-900">{keyword.keyword}</h4>
                      <span className="text-xs text-slate-400">
                        {(keyword.count / 1000).toFixed(0)}K 次搜索
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          keyword.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(keyword.count / 125000) * 100}%` }}
                      ></div>
                    </div>
                    <TrendingUp className={`w-4 h-4 ${keyword.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">订阅趋势分析报告</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            每周获取最新的AI技术趋势报告，洞察行业动向，把握发展机遇
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="输入你的邮箱"
              className="px-6 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-80"
            />
            <button className="px-8 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2">
              <span>订阅</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
