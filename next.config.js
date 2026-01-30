/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发时禁用静态导出，使用动态渲染
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
