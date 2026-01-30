'use client'

import { Star, ExternalLink, Heart, Zap } from 'lucide-react'

const featuredTools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'OpenAI 推出的对话式AI助手，能够进行自然语言对话、写作、编程等多种任务',
    icon: '🤖',
    tags: ['对话AI', '写作', '编程'],
    rating: 4.9,
    reviews: 12500,
    category: 'text'
  },
  {
    id: 2,
    name: 'Midjourney',
    description: '强大的AI图像生成工具，支持多种艺术风格，快速生成高质量图片',
    icon: '🎨',
    tags: ['图像生成', '艺术创作', '设计'],
    rating: 4.8,
    reviews: 8900,
    category: 'image'
  },
  {
    id: 3,
    name: 'Claude',
    description: 'Anthropic开发的AI助手，专注于安全、有帮助的对话和任务处理',
    icon: '🧠',
    tags: ['对话AI', '分析', '写作'],
    rating: 4.9,
    reviews: 7600,
    category: 'text'
  },
  {
    id: 4,
    name: 'GitHub Copilot',
    description: 'AI驱动的代码助手，帮助开发者更快更好地编写代码',
    icon: '💻',
    tags: ['代码辅助', '编程', '开发工具'],
    rating: 4.7,
    reviews: 11200,
    category: 'code'
  },
  {
    id: 5,
    name: 'Stable Diffusion',
    description: '开源的AI图像生成模型，支持本地部署和自定义训练',
    icon: '🖼️',
    tags: ['图像生成', '开源', 'AI模型'],
    rating: 4.8,
    reviews: 9800,
    category: 'image'
  },
  {
    id: 6,
    name: 'Runway',
    description: 'AI视频生成和编辑平台，支持文本到视频、图像生成等多种功能',
    icon: '🎬',
    tags: ['视频生成', '视频编辑', '创意'],
    rating: 4.7,
    reviews: 5400,
    category: 'video'
  },
  {
    id: 7,
    name: 'Notion AI',
    description: '集成在Notion中的AI助手，帮助提升文档写作和项目管理效率',
    icon: '📝',
    tags: ['写作辅助', '文档', '项目管理'],
    rating: 4.6,
    reviews: 6700,
    category: 'productivity'
  },
  {
    id: 8,
    name: 'Gamma',
    description: 'AI驱动的演示文稿制作工具，快速生成专业的PPT和幻灯片',
    icon: '📊',
    tags: ['演示文稿', 'AI工具', '设计'],
    rating: 4.8,
    reviews: 4300,
    category: 'productivity'
  }
]

export default function Featured() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">精选推荐</h2>
          </div>
          <Link href="/featured" className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
            <span>查看全部</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="card card-hover group"
            >
              {/* Icon */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-6xl group-hover:from-primary-50 group-hover:to-purple-50 transition-colors">
                {tool.icon}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>
                  <button
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{tool.rating}</span>
                    <span className="text-xs text-slate-400">({tool.reviews.toLocaleString()})</span>
                  </div>
                  <span className="text-xs text-primary-600 font-medium">
                    查看详情 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}</a>
}
