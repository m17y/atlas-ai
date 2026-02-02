import { prisma } from '@/lib/prisma'
import {
  successResponse,
  notFoundError,
  validationError,
  handleApiError,
} from '@/lib/api'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const tutorial = await prisma.tutorial.findUnique({
      where: { slug },
      include: {
        chapters: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!tutorial) {
      return notFoundError(`Tutorial with slug '${slug}' not found`)
    }

    return successResponse({ tutorial })
  } catch (error) {
    return handleApiError(error, 'GET /api/tutorials/[slug]')
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    
    const tutorial = await prisma.tutorial.update({
      where: { slug },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        icon: body.icon,
        level: body.level,
        duration: body.duration,
        tools: body.tools ? JSON.stringify(body.tools) : undefined,
        published: body.published,
        chapterCount: body.chapterCount
      }
    })

    return successResponse({ tutorial })
  } catch (error) {
    return handleApiError(error, 'PUT /api/tutorials/[slug]')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await prisma.tutorial.delete({
      where: { slug }
    })

    return successResponse({ success: true })
  } catch (error) {
    return handleApiError(error, 'DELETE /api/tutorials/[slug]')
  }
}
