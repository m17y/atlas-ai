import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    return NextResponse.json({
      totalTools,
      totalCategories,
      featuredTools,
      trendingTools,
      latestTools,
      toolsByCategory,
      toolsByPricing,
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
