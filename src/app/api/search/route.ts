import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { filterBlockedUrls } from '@/lib/trustpositif'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const searchResult = await zai.functions.invoke("web_search", {
      query: `site:bing.com ${query}`,
      num: 10
    })

    // Filter blocked URLs
    const { filteredResults, blockedCount } = await filterBlockedUrls(searchResult)

    return NextResponse.json({
      success: true,
      results: filteredResults,
      originalResults: searchResult.length,
      filteredResults: filteredResults.length,
      blockedCount: blockedCount,
      query: query,
      engine: 'Penulis4D'
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}