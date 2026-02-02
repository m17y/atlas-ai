import { prisma } from '@/lib/prisma'
import { successResponse, handleApiError } from '@/lib/api'

export async function GET() {
  try {
    const [
      totalTools,
      totalCategories,
      featuredTools,
      trendingTools,
      latestTools,
      toolsByCategory,
      toolsByPricing,
    ] = await Promise.all([
      prisma.tool.count(),
      prisma.category.count(),
      prisma.tool.count({ where: { featured: true } }),
      prisma.tool.count({ where: { trending: true } }),
      prisma.tool.count({ where: { latest: true } }),
      prisma.tool.groupBy({
        by: ['categoryId'],
        _count: true,
      }),
      prisma.tool.groupBy({
        by: ['pricing'],
        _count: true,
      }),
    ])

    return successResponse({
      totalTools,
      totalCategories,
      featuredTools,
      trendingTools,
      latestTools,
      toolsByCategory,
      toolsByPricing,
    })
  } catch (error) {
    return handleApiError(error, 'GET /api/statistics')
  }
}
