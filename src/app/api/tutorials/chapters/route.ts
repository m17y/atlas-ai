import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tutorialId, title, content, order } = body

    const chapter = await prisma.tutorialChapter.create({
      data: {
        tutorialId,
        title,
        content: content || '',
        order: order || 0
      }
    })

    // Update tutorial chapter count
    const chapterCount = await prisma.tutorialChapter.count({
      where: { tutorialId }
    })

    await prisma.tutorial.update({
      where: { id: tutorialId },
      data: { chapterCount }
    })

    return NextResponse.json({ chapter })
  } catch (error) {
    console.error('Failed to create chapter:', error)
    return NextResponse.json({ error: 'Failed to create chapter' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, tutorialId, title, content, order } = body

    const chapter = await prisma.tutorialChapter.update({
      where: { id },
      data: {
        title,
        content: content || '',
        order: order || 0
      }
    })

    return NextResponse.json({ chapter })
  } catch (error) {
    console.error('Failed to update chapter:', error)
    return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Chapter ID required' }, { status: 400 })
    }

    const chapter = await prisma.tutorialChapter.findUnique({
      where: { id }
    })

    if (chapter) {
      await prisma.tutorialChapter.delete({
        where: { id }
      })

      // Update tutorial chapter count
      const chapterCount = await prisma.tutorialChapter.count({
        where: { tutorialId: chapter.tutorialId }
      })

      await prisma.tutorial.update({
        where: { id: chapter.tutorialId },
        data: { chapterCount }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete chapter:', error)
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 })
  }
}
