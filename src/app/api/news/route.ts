import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  validationError,
  handleApiError,
  parseJsonArray,
} from '@/lib/api'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' }
    })
    return successResponse(news)
  } catch (error) {
    return handleApiError(error, 'GET /api/news')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, date, category, summary, content, image, tags, published } = body

    if (!title || !summary || !content) {
      return validationError('Title, summary and content are required')
    }

    const news = await prisma.news.create({
      data: {
        title,
        date: date || new Date().toISOString().split('T')[0],
        category: category || '未分类',
        summary,
        content,
        image: image || '📰',
        tags: JSON.stringify(tags || []),
        published: published !== false
      }
    })

    return successResponse(news, 201)
  } catch (error) {
    return handleApiError(error, 'POST /api/news')
  }
}
