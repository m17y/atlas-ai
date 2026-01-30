import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const trending = searchParams.get('trending')
    const latest = searchParams.get('latest')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = {}

    if (category) {
      where.categoryId = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (trending === 'true') {
      where.trending = true
    }

    if (latest === 'true') {
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

    return NextResponse.json({
      tools: tools.map(tool => ({
        ...tool,
        tags: JSON.parse(tool.tags),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
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

    return NextResponse.json(tool, { status: 201 })
  } catch (error) {
    console.error('Error creating tool:', error)
    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    )
  }
}
