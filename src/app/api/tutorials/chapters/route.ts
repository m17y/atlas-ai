import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  validationError,
  handleApiError,
} from '@/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tutorialId, title, content, order } = body

    if (!tutorialId || !title) {
      return validationError('Tutorial ID and title are required')
    }

    const chapter = await prisma.tutorialChapter.create({
      data: {
        tutorialId,
        title,
        content: content || '',
        order: order || 0
      }
    })

    const chapterCount = await prisma.tutorialChapter.count({
      where: { tutorialId }
    })

    await prisma.tutorial.update({
      where: { id: tutorialId },
      data: { chapterCount }
    })

    return successResponse({ chapter }, 201)
  } catch (error) {
    return handleApiError(error, 'POST /api/tutorials/chapters')
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, tutorialId, title, content, order } = body

    if (!id || !title) {
      return validationError('Chapter ID and title are required')
    }

    const chapter = await prisma.tutorialChapter.update({
      where: { id },
      data: {
        title,
        content: content || '',
        order: order || 0
      }
    })

    return successResponse({ chapter })
  } catch (error) {
    return handleApiError(error, 'PUT /api/tutorials/chapters')
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return validationError('Chapter ID is required')
    }

    const chapter = await prisma.tutorialChapter.findUnique({
      where: { id }
    })

    if (chapter) {
      await prisma.tutorialChapter.delete({
        where: { id }
      })

      const chapterCount = await prisma.tutorialChapter.count({
        where: { tutorialId: chapter.tutorialId }
      })

      await prisma.tutorial.update({
        where: { id: chapter.tutorialId },
        data: { chapterCount }
      })
    }

    return successResponse({ success: true })
  } catch (error) {
    return handleApiError(error, 'DELETE /api/tutorials/chapters')
  }
}
