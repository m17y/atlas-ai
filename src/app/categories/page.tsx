import { Metadata } from 'next'
import CategoriesClient from './CategoriesClient'

export const metadata: Metadata = {
  title: '分类浏览 - One-Coin AI',
  description: '按类别浏览最新的人工智能工具和技术',
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  rating: number
  reviewCount: number
  category: any
  categoryId: string
  pricing: 'free' | 'paid' | 'freemium'
}

async function getData(searchParams: { search?: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  
  try {
    const [categoriesRes, toolsRes] = await Promise.all([
      fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/tools`, { cache: 'no-store' }),
    ])

    const categories: Category[] = await categoriesRes.json()
    const toolsData = await toolsRes.json()
    let tools: Tool[] = toolsData.tools

    return { categories, tools }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return { categories: [], tools: [] }
  }
}

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const params = await searchParams
  const { categories, tools } = await getData(params)

  return (
    <CategoriesClient 
      initialCategories={categories} 
      initialTools={tools}
      searchQuery={params.search}
    />
  )
}
