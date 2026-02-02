import { prisma } from '@/lib/prisma'
import {
  successResponse,
  notFoundError,
  handleApiError,
  parseJsonArray,
} from '@/lib/api'

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
      return notFoundError(`Tool with id '${id}' not found`)
    }

    return successResponse({
      ...tool,
      tags: parseJsonArray(tool.tags),
    })
  } catch (error) {
    return handleApiError(error, 'GET /api/tools/[id]')
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

    return successResponse(tool)
  } catch (error) {
    return handleApiError(error, 'PUT /api/tools/[id]')
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

    return successResponse({ message: 'Tool deleted successfully' })
  } catch (error) {
    return handleApiError(error, 'DELETE /api/tools/[id]')
  }
}
