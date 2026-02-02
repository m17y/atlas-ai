import { NextResponse } from 'next/server'

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  timestamp: string
}

export function successResponse<T>(data: T, status: number = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  }, { status })
}

export function errorResponse(
  message: string,
  status: number = 500,
  code: string = 'INTERNAL_ERROR',
  details?: Record<string, unknown>
): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  }, { status })
}

export function validationError(message: string, details?: Record<string, unknown>): NextResponse<ApiResponse> {
  return errorResponse(message, 400, 'VALIDATION_ERROR', details)
}

export function notFoundError(message: string): NextResponse<ApiResponse> {
  return errorResponse(message, 404, 'NOT_FOUND')
}

export function unauthorizedError(message: string = 'Unauthorized'): NextResponse<ApiResponse> {
  return errorResponse(message, 401, 'UNAUTHORIZED')
}

export function forbiddenError(message: string = 'Forbidden'): NextResponse<ApiResponse> {
  return errorResponse(message, 403, 'FORBIDDEN')
}

export function conflictError(message: string): NextResponse<ApiResponse> {
  return errorResponse(message, 409, 'CONFLICT')
}

export function handleApiError(error: unknown, context: string): NextResponse<ApiResponse> {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
  const errorStack = error instanceof Error ? error.stack : undefined

  console.error(`[API Error] ${context}:`, {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
  })

  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    return validationError('Invalid JSON in request body')
  }

  return errorResponse('An error occurred while processing your request', 500, 'INTERNAL_ERROR')
}

export function parseIntParam(value: string | null, defaultValue: number, min?: number, max?: number): number {
  const parsed = parseInt(value || String(defaultValue), 10)
  if (isNaN(parsed)) return defaultValue
  if (min !== undefined && parsed < min) return min
  if (max !== undefined && parsed > max) return max
  return parsed
}

export function parseBooleanParam(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue
  return value === 'true' || value === '1'
}

export function sanitizeString(value: unknown, defaultValue: string = ''): string {
  if (typeof value !== 'string') return defaultValue
  return value.trim() || defaultValue
}

export function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function buildPaginationMeta(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit)
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}
