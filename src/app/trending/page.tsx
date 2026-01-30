import type { Metadata } from 'next'
import { PrismaClient } from '@prisma/client'
import TrendingClient from './TrendingClient'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: '排行榜 - Atlas AI',
  description: '查看最热门的人工智能工具排行榜',
}

interface TrendingTool {
  id: string
  name: string
  description: string
  icon: string
  category: any
  rating: number
  reviewCount: number
}

async function getTrendingTools(): Promise<TrendingTool[]> {
  const tools = await prisma.tool.findMany({
    include: {
      category: true
    }
  })
  
  return tools.map(tool => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    icon: tool.icon,
    category: tool.category,
    rating: tool.rating,
    reviewCount: tool.reviewCount
  }))
}

async function getCategories() {
  const categories = await prisma.category.findMany()
  return categories
}

export default async function TrendingPage() {
  const [tools, categories] = await Promise.all([
    getTrendingTools(),
    getCategories()
  ])

  return <TrendingClient initialTools={tools} initialCategories={categories} />
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
