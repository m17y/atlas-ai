import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  validationError,
  handleApiError,
} from '@/lib/api'

export async function GET() {
  try {
    const tutorials = await prisma.tutorial.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        chapters: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    return successResponse({ tutorials })
  } catch (error) {
    return handleApiError(error, 'GET /api/tutorials')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, description, content, icon, level, duration, tools, published } = body

    if (!slug || !title || !description) {
      return validationError('Slug, title and description are required')
    }

    const tutorial = await prisma.tutorial.create({
      data: {
        slug,
        title,
        description,
        content: content || '',
        icon,
        level,
        duration,
        tools: JSON.stringify(tools || []),
        published: published !== false,
        chapterCount: 0
      }
    })

    return successResponse({ tutorial }, 201)
  } catch (error) {
    return handleApiError(error, 'POST /api/tutorials')
  }
}
