import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
      return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 })
    }

    return NextResponse.json({ tutorial })
  } catch (error) {
    console.error('Failed to fetch tutorial:', error)
    return NextResponse.json({ error: 'Failed to fetch tutorial' }, { status: 500 })
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

    return NextResponse.json({ tutorial })
  } catch (error) {
    console.error('Failed to update tutorial:', error)
    return NextResponse.json({ error: 'Failed to update tutorial' }, { status: 500 })
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete tutorial:', error)
    return NextResponse.json({ error: 'Failed to delete tutorial' }, { status: 500 })
  }
}
