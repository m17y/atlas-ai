import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
      return NextResponse.json(
        { error: '新闻未找到' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: '获取新闻失败' },
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

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: '更新新闻失败' },
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
    await prisma.news.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: '删除新闻失败' },
      { status: 500 }
    )
  }
}
