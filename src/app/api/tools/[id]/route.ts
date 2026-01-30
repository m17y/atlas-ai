import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const tool = await prisma.tool.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...tool,
      tags: JSON.parse(tool.tags),
    })
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tool' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const tool = await prisma.tool.update({
      where: { id },
      data: {
        name,
        description,
        categoryId,
        pricing,
        rating,
        reviewCount,
        tags: JSON.stringify(tags),
        icon,
        website,
        featured,
        trending,
        latest,
      },
    })

    return NextResponse.json(tool)
  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json(
      { error: 'Failed to update tool' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.tool.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Tool deleted successfully' })
  } catch (error) {
    console.error('Error deleting tool:', error)
    return NextResponse.json(
      { error: 'Failed to delete tool' },
      { status: 500 }
    )
  }
}
