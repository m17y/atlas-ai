import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Tech Hub - 发现最新的人工智能工具与技术',
  description: 'AI Tech Hub 是一个专注于展示最新人工智能工具、框架和技术的平台。发现、探索、体验前沿的AI产品。',
  keywords: ['AI', '人工智能', 'AI工具', '机器学习', '深度学习', 'AI技术', 'ChatGPT', 'Midjourney', 'Claude'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {children}
      </body>
    </html>
  )
}
