import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' }
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: '获取新闻列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, date, category, summary, content, image, tags, published } = body

    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: '标题、摘要和内容不能为空' },
        { status: 400 }
      )
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

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Create news error:', error)
    return NextResponse.json(
      { error: '创建新闻失败' },
      { status: 500 }
    )
  }
}
