import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  handleApiError,
  parseIntParam,
  parseBooleanParam,
  parseJsonArray,
  buildPaginationMeta,
} from '@/lib/api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const trending = searchParams.get('trending')
    const latest = searchParams.get('latest')
    const search = searchParams.get('search')
    const page = parseIntParam(searchParams.get('page'), 1, 1)
    const limit = parseIntParam(searchParams.get('limit'), 12, 1, 100)

    const where: Record<string, unknown> = {}

    if (category) {
      where.categoryId = category
    }

    if (parseBooleanParam(featured, false)) {
      where.featured = true
    }

    if (parseBooleanParam(trending, false)) {
      where.trending = true
    }

    if (parseBooleanParam(latest, false)) {
      where.latest = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    const [tools, total] = await Promise.all([
      prisma.tool.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: [
          { featured: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.tool.count({ where }),
    ])

    const pagination = buildPaginationMeta(page, limit, total)

    return successResponse({
      tools: tools.map(tool => ({
        ...tool,
        tags: parseJsonArray(tool.tags),
      })),
      pagination,
    })
  } catch (error) {
    return handleApiError(error, 'GET /api/tools')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      name,
      description,
      categoryId,
      pricing,
      rating,
      reviewCount,
      tags,
      icon,
      website,
      featured,
      trending,
      latest,
    } = body

    if (!name || !description || !categoryId || !pricing || !icon) {
      return errorResponse('Missing required fields: name, description, categoryId, pricing, icon', 400, 'VALIDATION_ERROR')
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        categoryId,
        pricing,
        rating: rating || 0,
        reviewCount: reviewCount || 0,
        tags: JSON.stringify(tags || []),
        icon,
        website,
        featured: featured || false,
        trending: trending || false,
        latest: latest || false,
      },
    })

    return successResponse(tool, 201)
  } catch (error) {
    return handleApiError(error, 'POST /api/tools')
  }
}
