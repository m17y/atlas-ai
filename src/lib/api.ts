export interface Tool {
  id: string
  name: string
  description: string
  categoryId: string
  category?: Category
  pricing: 'free' | 'paid' | 'freemium'
  rating: number
  reviewCount: number
  tags: string[]
  icon: string
  website?: string
  featured: boolean
  trending: boolean
  latest: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export interface ToolResponse {
  tools: Tool[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const API_BASE = '/api'

export async function getTools(params?: {
  category?: string
  featured?: boolean
  trending?: boolean
  latest?: boolean
  search?: string
  page?: number
  limit?: number
}): Promise<Tool[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.category) searchParams.set('category', params.category)
  if (params?.featured) searchParams.set('featured', 'true')
  if (params?.trending) searchParams.set('trending', 'true')
  if (params?.latest) searchParams.set('latest', 'true')
  if (params?.search) searchParams.set('search', params.search)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())

  const response = await fetch(`${API_BASE}/tools?${searchParams.toString()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tools')
  }

  const data: ToolResponse = await response.json()
  return data.tools
}

export async function getTool(id: string): Promise<Tool> {
  const response = await fetch(`${API_BASE}/tools/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tool')
  }

  return response.json()
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }

  return response.json()
}

export async function getStatistics() {
  const response = await fetch(`${API_BASE}/statistics`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch statistics')
  }

  return response.json()
}
