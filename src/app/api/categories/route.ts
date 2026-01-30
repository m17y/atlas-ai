import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        tools: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(
      categories.map(category => ({
        ...category,
        count: category.tools.length,
      }))
    )
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, description, icon } = body

    const category = await prisma.category.create({
      data: {
        name,
        description,
        icon,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
