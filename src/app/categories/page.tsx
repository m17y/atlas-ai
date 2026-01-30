import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Filter, Search, Grid, List, Star, Heart, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '分类浏览 - One-Coin AI',
  description: '按类别浏览最新的人工智能工具和技术',
}

const categories = [
  { name: '全部', count: 2000, active: true },
  { name: '文本对话', count: 450, active: false },
  { name: '图像生成', count: 380, active: false },
  { name: '视频生成', count: 220, active: false },
  { name: '音频处理', count: 180, active: false },
  { name: '代码辅助', count: 320, active: false },
  { name: '数据分析', count: 200, active: false },
  { name: 'AI代理', count: 280, active: false },
  { name: '自动化', count: 240, active: false },
  { name: '研究工具', count: 160, active: false },
  { name: '多模态', count: 190, active: false },
  { name: '移动应用', count: 350, active: false },
  { name: '安全合规', count: 120, active: false }
]

const tools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'OpenAI 推出的对话式AI助手，能够进行自然语言对话、写作、编程等多种任务',
    icon: '🤖',
    tags: ['对话AI', '写作', '编程'],
    rating: 4.9,
    reviews: 12500,
    category: '文本对话',
    isFree: false,
    price: '$20/月'
  },
  {
    id: 2,
    name: 'Midjourney',
    description: '强大的AI图像生成工具，支持多种艺术风格，快速生成高质量图片',
    icon: '🎨',
    tags: ['图像生成', '艺术创作', '设计'],
    rating: 4.8,
    reviews: 8900,
    category: '图像生成',
    isFree: false,
    price: '$10/月'
  },
  {
    id: 3,
    name: 'Claude',
    description: 'Anthropic开发的AI助手，专注于安全、有帮助的对话和任务处理',
    icon: '🧠',
    tags: ['对话AI', '分析', '写作'],
    rating: 4.9,
    reviews: 7600,
    category: '文本对话',
    isFree: true,
    price: '免费'
  },
  {
    id: 4,
    name: 'GitHub Copilot',
    description: 'AI驱动的代码助手，帮助开发者更快更好地编写代码',
    icon: '💻',
    tags: ['代码辅助', '编程', '开发工具'],
    rating: 4.7,
    reviews: 11200,
    category: '代码辅助',
    isFree: false,
    price: '$10/月'
  },
  {
    id: 5,
    name: 'Stable Diffusion',
    description: '开源的AI图像生成模型，支持本地部署和自定义训练',
    icon: '🖼️',
    tags: ['图像生成', '开源', 'AI模型'],
    rating: 4.8,
    reviews: 9800,
    category: '图像生成',
    isFree: true,
    price: '免费'
  },
  {
    id: 6,
    name: 'Runway',
    description: 'AI视频生成和编辑平台，支持文本到视频、图像生成等多种功能',
    icon: '🎬',
    tags: ['视频生成', '视频编辑', '创意'],
    rating: 4.7,
    reviews: 5400,
    category: '视频生成',
    isFree: false,
    price: '$12/月'
  },
  {
    id: 7,
    name: 'Notion AI',
    description: '集成在Notion中的AI助手，帮助提升文档写作和项目管理效率',
    icon: '📝',
    tags: ['写作辅助', '文档', '项目管理'],
    rating: 4.6,
    reviews: 6700,
    category: '文本对话',
    isFree: false,
    price: '$10/月'
  },
  {
    id: 8,
    name: 'Gamma',
    description: 'AI驱动的演示文稿制作工具，快速生成专业的PPT和幻灯片',
    icon: '📊',
    tags: ['演示文稿', 'AI工具', '设计'],
    rating: 4.8,
    reviews: 4300,
    category: '自动化',
    isFree: false,
    price: '$15/月'
  }
]

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary-600">首页</Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">分类浏览</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                分类筛选
              </h3>

              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/category/${category.name}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      category.active
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs ${
                      category.active ? 'text-primary-600' : 'text-slate-400'
                    }`}>
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">价格筛选</h4>
                <div className="space-y-2">
                  {['全部', '免费', '付费', 'Freemium'].map((price) => (
                    <label key={price} className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-slate-600">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">评分筛选</h4>
                <div className="space-y-2">
                  {['全部', '4.5分以上', '4.0分以上', '3.5分以上'].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="radio" name="rating" className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-slate-600">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索工具..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>综合排序</option>
                    <option>热度最高</option>
                    <option>最新发布</option>
                    <option>评分最高</option>
                    <option>价格最低</option>
                  </select>
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <button className="p-2 bg-white rounded shadow text-primary-600">
                      <Grid className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">当前筛选：</span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center">
                  全部
                  <button className="ml-1 hover:text-primary-900">×</button>
                </span>
                <button className="text-sm text-primary-600 hover:text-primary-700">清除全部</button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                共找到 <span className="font-medium text-slate-900">2000</span> 个工具
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div key={tool.id} className="card card-hover group">
                  <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-6xl group-hover:from-primary-50 group-hover:to-purple-50 transition-colors">
                    {tool.icon}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                          <Link href={`/tool/${tool.id}`}>{tool.name}</Link>
                        </h3>
                        <span className="text-xs text-slate-400">{tool.category}</span>
                      </div>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-slate-700">{tool.rating}</span>
                        <span className="text-xs text-slate-400">({tool.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${tool.isFree ? 'text-green-600' : 'text-slate-600'}`}>
                          {tool.price}
                        </span>
                        <Link href={`/tool/${tool.id}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                          查看 <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                  上一页
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                  下一页
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
