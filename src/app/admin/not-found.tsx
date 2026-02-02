import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">页面未找到</h2>
        <p className="text-slate-600 mb-6">抱歉，您访问的页面不存在。</p>
        <Link
          href="/admin"
          className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          返回后台首页
        </Link>
      </div>
    </div>
  )
}
