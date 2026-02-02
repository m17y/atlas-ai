import { prisma } from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  notFoundError,
  handleApiError,
} from '@/lib/api'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const toolCount = await prisma.tool.count({
      where: { categoryId: id },
    })

    if (toolCount > 0) {
      return errorResponse('Cannot delete category with associated tools', 400, 'CONFLICT')
    }

    await prisma.category.delete({
      where: { id },
    })

    return successResponse({ message: 'Category deleted successfully' })
  } catch (error) {
    return handleApiError(error, 'DELETE /api/categories/[id]')
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { name, description, icon } = body

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        icon,
      },
    })

    return successResponse(category)
  } catch (error) {
    return handleApiError(error, 'PUT /api/categories/[id]')
  }
}
