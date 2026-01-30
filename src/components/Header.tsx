'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, User, Sparkles } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Atlas AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary-600 font-medium">首页</Link>
            <Link href="/categories" className="text-slate-600 hover:text-primary-600 transition-colors">分类</Link>
            <Link href="/trending" className="text-slate-600 hover:text-primary-600 transition-colors">排行榜</Link>
            <Link href="/insights" className="text-slate-600 hover:text-primary-600 transition-colors">趋势</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索AI工具、技术、框架..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-primary-600 transition-colors font-medium">
              登录
            </Link>
            <Link href="/register" className="btn-primary">
              注册
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索AI工具..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-primary-600 font-medium py-2">首页</Link>
              <Link href="/categories" className="text-slate-600 py-2">分类</Link>
              <Link href="/trending" className="text-slate-600 py-2">排行榜</Link>
              <Link href="/insights" className="text-slate-600 py-2">趋势</Link>
              <div className="pt-4 border-t border-slate-200">
                <Link href="/login" className="text-slate-600 py-2 block">登录</Link>
                <Link href="/register" className="text-primary-600 py-2 block font-medium">注册</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
