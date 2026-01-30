'use client'

import { MessageSquare, Image, Video, Music, Code, BarChart, Bot, Zap, Target, Layers, Smartphone, Shield } from 'lucide-react'

const categories = [
  { name: '文本对话', icon: MessageSquare, color: 'from-blue-500 to-cyan-500', count: 450, description: 'ChatGPT、Claude等对话AI' },
  { name: '图像生成', icon: Image, color: 'from-purple-500 to-pink-500', count: 380, description: 'Midjourney、Stable Diffusion' },
  { name: '视频生成', icon: Video, color: 'from-orange-500 to-red-500', count: 220, description: 'Runway、Pika等视频工具' },
  { name: '音频处理', icon: Music, color: 'from-green-500 to-emerald-500', count: 180, description: '语音合成、音乐生成' },
  { name: '代码辅助', icon: Code, color: 'from-indigo-500 to-blue-500', count: 320, description: 'Copilot、AI编程助手' },
  { name: '数据分析', icon: BarChart, color: 'from-teal-500 to-cyan-500', count: 200, description: '数据可视化、洞察分析' },
  { name: 'AI代理', icon: Bot, color: 'from-violet-500 to-purple-500', count: 280, description: '自动化、AI Agent工具' },
  { name: '自动化', icon: Zap, color: 'from-yellow-500 to-orange-500', count: 240, description: '工作流自动化' },
  { name: '研究工具', icon: Target, color: 'from-rose-500 to-pink-500', count: 160, description: 'AI研究、学术工具' },
  { name: '多模态', icon: Layers, color: 'from-amber-500 to-yellow-500', count: 190, description: '多种AI能力集成' },
  { name: '移动应用', icon: Smartphone, color: 'from-slate-500 to-slate-700', count: 350, description: '移动端AI应用' },
  { name: '安全合规', icon: Shield, color: 'from-red-500 to-rose-500', count: 120, description: 'AI安全、隐私保护' }
]

export default function Categories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">分类浏览</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            按类别探索最新的人工智能工具和技术，找到最适合你需求的AI解决方案
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <a
                key={category.name}
                href={`/category/${category.name}`}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{category.count} 个工具</p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/categories"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            <span>查看全部分类</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
