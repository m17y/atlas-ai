import { cookies } from 'next/headers'
import { successResponse } from '@/lib/api'

export async function POST() {
  cookies().delete('admin_token')
  return successResponse({ success: true })
}
