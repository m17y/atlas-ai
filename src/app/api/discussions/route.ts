import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const owner = 'm17y'
    const repo = 'atlas-ai'
    
    // Fetch issues from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=open&sort=updated&per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'One-Coin-AI'
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const issues = await response.json()

    // Transform issues to our format
    const discussions = issues.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      author: issue.user?.login || 'Anonymous',
      replies: issue.comments,
      views: issue.reactions?.total_count || 0,
      lastActive: new Date(issue.updated_at).toLocaleDateString('zh-CN'),
      tags: issue.labels?.map((label: any) => label.name) || [],
      url: issue.html_url
    }))

    return NextResponse.json({ discussions })
  } catch (error) {
    console.error('Failed to fetch GitHub issues:', error)
    return NextResponse.json({ 
      discussions: [],
      error: 'Failed to fetch discussions' 
    }, { status: 500 })
  }
}
