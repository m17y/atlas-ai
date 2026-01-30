import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

    return NextResponse.json({ tutorials })
  } catch (error) {
    console.error('Failed to fetch tutorials:', error)
    return NextResponse.json({ error: 'Failed to fetch tutorials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, description, content, icon, level, duration, tools, published } = body

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

    return NextResponse.json({ tutorial })
  } catch (error) {
    console.error('Failed to create tutorial:', error)
    return NextResponse.json({ error: 'Failed to create tutorial' }, { status: 500 })
  }
}
