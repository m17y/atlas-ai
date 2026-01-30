import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Filter, Search, Grid, List, Star, Heart, ExternalLink, X } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  rating: number
  reviewCount: number
  category: any
  categoryId: string
  pricing: 'free' | 'paid' | 'freemium'
}

interface CategoriesClientProps {
  initialCategories: Category[]
  initialTools: Tool[]
  searchQuery?: string
}

type ViewMode = 'grid' | 'list'
type SortOption = 'default' | 'trending' | 'newest' | 'rating' | 'price'

export default function CategoriesClient({ initialCategories, initialTools, searchQuery }: CategoriesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [searchInput, setSearchInput] = useState(searchQuery || '')
  const [filteredTools, setFilteredTools] = useState<Tool[]>(initialTools)

  useEffect(() => {
    let result = [...initialTools]

    if (selectedCategory) {
      result = result.filter(tool => 
        (tool.category as any)?.name === selectedCategory || 
        tool.category === selectedCategory
      )
    }

    if (searchInput) {
      const searchLower = searchInput.toLowerCase()
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    switch (sortBy) {
      case 'trending':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'newest':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price':
        const priceOrder = { free: 0, freemium: 1, paid: 2 }
        result.sort((a, b) => priceOrder[a.pricing] - priceOrder[b.pricing])
        break
    }

    setFilteredTools(result)
  }, [selectedCategory, searchInput, sortBy, initialTools])

  const clearCategory = () => {
    setSelectedCategory(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

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
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                分类筛选
              </h3>

              <div className="space-y-2">
                <button
                  onClick={clearCategory}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>全部</span>
                  <span className={`text-xs ${!selectedCategory ? 'text-primary-600' : 'text-slate-400'}`}>
                    {initialTools.length}
                  </span>
                </button>

                {initialCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs ${selectedCategory === category.name ? 'text-primary-600' : 'text-slate-400'}`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">价格筛选</h4>
                <div className="space-y-2">
                  {[
                    { label: '全部', value: 'all' },
                    { label: '免费', value: 'free' },
                    { label: '付费', value: 'paid' },
                    { label: 'Freemium', value: 'freemium' }
                  ].map((price) => (
                    <label key={price.value} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" 
                      />
                      <span className="ml-2 text-sm text-slate-600">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-4">评分筛选</h4>
                <div className="space-y-2">
                  {[
                    { label: '全部', value: 'all' },
                    { label: '4.5分以上', value: '4.5' },
                    { label: '4.0分以上', value: '4.0' },
                    { label: '3.5分以上', value: '3.5' }
                  ].map((rating) => (
                    <label key={rating.value} className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500" 
                      />
                      <span className="ml-2 text-sm text-slate-600">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="搜索工具..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="default">综合排序</option>
                      <option value="trending">热度最高</option>
                      <option value="newest">最新发布</option>
                      <option value="rating">评分最高</option>
                      <option value="price">价格最低</option>
                    </select>
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {(selectedCategory || searchInput) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">当前筛选：</span>
                  
                  {selectedCategory && (
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center">
                      {selectedCategory}
                      <button 
                        onClick={clearCategory}
                        className="ml-1 hover:text-primary-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  
                  {searchInput && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm flex items-center">
                      搜索: {searchInput}
                      <button 
                        onClick={() => setSearchInput('')}
                        className="ml-1 hover:text-slate-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  
                  <button 
                    onClick={() => {
                      clearCategory()
                      setSearchInput('')
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    清除全部
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                共找到 <span className="font-medium text-slate-900">{filteredTools.length}</span> 个工具
                {selectedCategory && (
                  <span className="text-slate-400">（{selectedCategory}）</span>
                )}
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
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
                          <span className="text-xs text-slate-400">{(tool.category as any)?.name || tool.category || '未分类'}</span>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {tool.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-slate-700">{tool.rating}</span>
                          <span className="text-xs text-slate-400">({tool.reviewCount.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-medium ${
                            tool.pricing === 'free' ? 'text-green-600' :
                            tool.pricing === 'paid' ? 'text-slate-600' :
                            'text-slate-600'
                          }`}>
                            {tool.pricing === 'free' ? '免费' : tool.pricing === 'paid' ? '付费' : 'Freemium'}
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
            ) : (
              <div className="space-y-4">
                {filteredTools.map((tool) => (
                  <div key={tool.id} className="card p-4 group">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center text-3xl mr-4 group-hover:from-primary-50 group-hover:to-purple-50 transition-colors">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-1">
                          <Link href={`/tool/${tool.id}`}>{tool.name}</Link>
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">{tool.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-slate-500">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            {tool.rating} ({tool.reviewCount.toLocaleString()})
                          </span>
                          <span className="text-slate-500">
                            {(tool.category as any)?.name || tool.category || '未分类'}
                          </span>
                          <span className={`${
                            tool.pricing === 'free' ? 'text-green-600' :
                            tool.pricing === 'paid' ? 'text-slate-600' :
                            'text-slate-600'
                          }`}>
                            {tool.pricing === 'free' ? '免费' : tool.pricing === 'paid' ? '付费' : 'Freemium'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <Link href={`/tool/${tool.id}`} className="btn-primary">
                          查看详情
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">没有找到符合条件的工具</p>
                <button 
                  onClick={() => {
                    clearCategory()
                    setSearchInput('')
                  }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
