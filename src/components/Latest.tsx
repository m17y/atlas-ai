'use client'

import { Clock, ChevronRight, Sparkles } from 'lucide-react'

const newTools = [
  {
    id: 1,
    name: 'Gemini Ultra',
    description: 'Google 最新发布的超大规模AI模型，性能超越GPT-4',
    icon: '💎',
    tags: ['大语言模型', 'Google', '最新发布'],
    time: '2小时前',
    category: 'text'
  },
  {
    id: 2,
    name: 'Sora',
    description: 'OpenAI 推出的文本到视频AI模型，能够生成高质量视频',
    icon: '🎬',
    tags: ['视频生成', 'OpenAI', '多模态'],
    time: '1天前',
    category: 'video'
  },
  {
    id: 3,
    name: 'Llama 3',
    description: 'Meta 开源的新一代大语言模型，性能大幅提升',
    icon: '🦙',
    tags: ['开源', '大语言模型', 'Meta'],
    time: '3天前',
    category: 'text'
  },
  {
    id: 4,
    name: 'DALL-E 3',
    description: 'OpenAI 最新图像生成模型，理解复杂提示词',
    icon: '🎨',
    tags: ['图像生成', 'OpenAI', '最新发布'],
    time: '5天前',
    category: 'image'
  },
  {
    id: 5,
    name: 'Mistral Large',
    description: 'Mistral AI 推出的旗舰模型，性能对标GPT-4',
    icon: '🌪️',
    tags: ['大语言模型', '开源', '欧洲AI'],
    time: '1周前',
    category: 'text'
  },
  {
    id: 6,
    name: 'ComfyUI',
    description: '强大的AI图像生成界面，支持自定义工作流',
    icon: '🎛️',
    tags: ['图像生成', '开源', '界面工具'],
    time: '1周前',
    category: 'image'
  }
]

export default function Latest() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">最新发布</h2>
          </div>
          <a href="/latest" className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
            <span>查看更多</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block"></div>

          {/* This Week */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">本周</h3>
                <p className="text-sm text-slate-500">12 个新工具发布</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pl-20">
              {newTools.slice(0, 3).map((tool) => (
                <a
                  key={tool.id}
                  href={`/tool/${tool.id}`}
                  className="bg-slate-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-primary-100"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900 hover:text-primary-600 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-xs text-slate-400">{tool.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Last Week */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">上周</h3>
                <p className="text-sm text-slate-500">28 个新工具发布</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:pl-20">
              {newTools.slice(3, 6).map((tool) => (
                <a
                  key={tool.id}
                  href={`/tool/${tool.id}`}
                  className="bg-slate-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-primary-100"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900 hover:text-primary-600 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-xs text-slate-400">{tool.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
