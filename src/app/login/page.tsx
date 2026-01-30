import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export const metadata: Metadata = {
  title: '登录 - One-Coin AI',
  description: '登录 One-Coin AI 管理后台',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <span className="text-2xl font-bold text-white">One-Coin AI</span>
        </Link>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">欢迎回来</h1>
          <p className="text-slate-500 text-center mb-8">登录您的账户</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">邮箱地址</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="请输入邮箱"
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="请输入密码"
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-slate-600">记住我</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                忘记密码？
              </Link>
            </div>

            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
              登录
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500">
              还没有账户？{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                立即注册
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <Link href="/" className="flex items-center justify-center mt-6 text-white/80 hover:text-white">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回首页
        </Link>
      </div>
    </div>
  )
}
