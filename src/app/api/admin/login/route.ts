import { cookies } from 'next/headers'
import {
  successResponse,
  validationError,
  unauthorizedError,
  handleApiError,
} from '@/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return validationError('Username and password are required')
    }

    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'password'

    if (username !== adminUsername || password !== adminPassword) {
      return unauthorizedError('Invalid username or password')
    }

    const token = Buffer.from(`${username}:${password}`).toString('base64')

    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    })

    return successResponse({ success: true })
  } catch (error) {
    return handleApiError(error, 'POST /api/admin/login')
  }
}
