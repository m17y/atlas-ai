import { prisma } from '@/lib/prisma'
import {
  successResponse,
  notFoundError,
  handleApiError,
} from '@/lib/api'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const news = await prisma.news.findUnique({
      where: { id }
    })

    if (!news) {
      return notFoundError(`News with id '${id}' not found`)
    }

    return successResponse(news)
  } catch (error) {
    return handleApiError(error, 'GET /api/news/[id]')
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, date, category, summary, content, image, tags, published } = body

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        date,
        category,
        summary,
        content,
        image,
        tags: JSON.stringify(tags || []),
        published
      }
    })

    return successResponse(news)
  } catch (error) {
    return handleApiError(error, 'PUT /api/news/[id]')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.news.delete({
      where: { id }
    })
    return successResponse({ success: true })
  } catch (error) {
    return handleApiError(error, 'DELETE /api/news/[id]')
  }
}
