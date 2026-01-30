'use client'

import { Sparkles, Github, Twitter, Mail, ArrowRight } from 'lucide-react'

const footerLinks = {
  product: [
    { name: '首页', href: '/' },
    { name: '分类浏览', href: '/categories' },
    { name: '排行榜', href: '/trending' },
    { name: '趋势分析', href: '/insights' },
    { name: '最新发布', href: '/latest' }
  ],
  resources: [
    { name: 'AI新闻', href: '/news' },
    { name: '教程指南', href: '/tutorials' },
    { name: 'API文档', href: '/docs' },
    { name: '开源项目', href: '/open-source' },
    { name: '社区', href: '/community' }
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '联系我们', href: '/contact' },
    { name: '加入我们', href: '/careers' },
    { name: '新闻动态', href: '/blog' }
  ],
  legal: [
    { name: '隐私政策', href: '/privacy' },
    { name: '使用条款', href: '/terms' },
    { name: 'Cookie政策', href: '/cookies' }
  ]
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/m17y/atlas-ai' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/atlasai' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@atlas-ai.com' }
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Atlas AI</span>
            </a>
            <p className="text-slate-400 mb-6 max-w-sm">
              发现、探索、体验最新的人工智能工具和技术。Atlas AI 是您了解AI世界的最佳窗口。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">产品</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">资源</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">公司</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">订阅我们的Newsletter</h3>
              <p className="text-slate-400">获取最新的AI工具资讯和技术趋势</p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="输入你的邮箱"
                className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-medium flex items-center space-x-2 transition-colors">
                <span>订阅</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              © 2025 Atlas AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
