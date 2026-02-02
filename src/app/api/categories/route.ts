import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  handleApiError,
} from '@/lib/api'

export async function GET() {
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

    return successResponse(
      categories.map(category => ({
        ...category,
        count: category.tools.length,
      }))
    )
  } catch (error) {
    return handleApiError(error, 'GET /api/categories')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, description, icon } = body

    if (!name || !description || !icon) {
      return errorResponse('Missing required fields: name, description, icon', 400, 'VALIDATION_ERROR')
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        icon,
      },
    })

    return successResponse(category, 201)
  } catch (error) {
    return handleApiError(error, 'POST /api/categories')
  }
}
