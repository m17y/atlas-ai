'use client'

import { TrendingUp, ArrowRight, BarChart3, Zap, Bot, Layers } from 'lucide-react'

const insights = [
  {
    title: '多模态AI工具发布量增长 150%',
    description: '2024年多模态AI技术快速发展，支持文本、图像、视频等多种模态的工具数量显著增加',
    icon: Layers,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'AI Agent 相关工具搜索量上升 85%',
    description: 'AI Agent 和自动化助手成为新热点，用户对能够自主执行任务的AI工具需求激增',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: '开源AI框架下载量突破历史记录',
    description: 'Hugging Face、LangChain等开源框架下载量持续增长，开发者对开源AI工具兴趣浓厚',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  }
]

const chartData = [
  { month: '8月', value: 120 },
  { month: '9月', value: 150 },
  { month: '10月', value: 180 },
  { month: '11月', value: 240 },
  { month: '12月', value: 320 },
  { month: '1月', value: 450 }
]

export default function Insights() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">AI技术趋势分析</h2>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            基于数据分析，为你呈现最新的AI技术发展趋势和行业洞察
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Chart Section */}
          <div className="bg-slate-800/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">近6个月AI工具发布数量趋势</h3>

            {/* Simple Chart */}
            <div className="relative h-64 flex items-end justify-between space-x-2">
              {chartData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-primary-600 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-primary-500 hover:to-purple-400"
                    style={{
                      height: `${(data.value / 450) * 100}%`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <span className="text-xs text-slate-400 mt-2">{data.month}</span>
                  <span className="text-xs text-white font-medium">{data.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">增长率</span>
                <span className="text-2xl font-bold text-green-400">+275%</span>
              </div>
            </div>
          </div>

          {/* Insights List */}
          <div className="space-y-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-2xl p-6 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-slate-400">{insight.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/insights"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl"
          >
            <span>查看完整趋势报告</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
