import type { Metadata } from 'next'
import { PrismaClient } from '@prisma/client'
import TutorialClient from './TutorialClient'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tutorial = await prisma.tutorial.findUnique({
    where: { slug }
  })
  
  return {
    title: tutorial ? `${tutorial.title} - 教程指南` : '教程未找到',
    description: tutorial?.description || 'One-Coin AI 教程指南'
  }
}

async function getTutorial(slug: string) {
  const tutorial = await prisma.tutorial.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { order: 'asc' }
      }
    }
  })
  return tutorial
}

export default async function TutorialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutorial = await getTutorial(slug)

  if (!tutorial) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">教程未找到</h1>
            <p className="text-slate-600 mb-8">您访问的教程不存在或已被删除</p>
            <Link href="/tutorials" className="btn-primary">
              返回教程列表
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return <TutorialClient tutorial={tutorial} />
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
