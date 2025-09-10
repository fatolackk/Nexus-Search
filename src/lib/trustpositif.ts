// Utility for checking blocked domains using trustpositif.app
export interface BlockedStatus {
  isBlocked: boolean
  reason?: string
  category?: string
}

export async function checkDomainStatus(domain: string): Promise<BlockedStatus> {
  try {
    // Remove protocol and path, get domain only
    const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0]
    
    // Try multiple approaches to check trustpositif.app
    // Approach 1: Direct API call (if available)
    try {
      const response = await fetch(`https://trustpositif.app/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NexusSearch/1.0'
        },
        body: JSON.stringify({ domain: cleanDomain }),
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })

      if (response.ok) {
        const data = await response.json()
        
        // Handle different possible response formats
        if (data.status === 'blocked' || data.blocked === true) {
          return {
            isBlocked: true,
            reason: data.reason || data.message || 'Domain diblokir',
            category: data.category || 'Konten Negatif'
          }
        }
        
        if (data.status === 'safe' || data.blocked === false) {
          return { isBlocked: false }
        }
      }
    } catch (apiError) {
      console.log('API call failed, trying alternative method')
    }

    // Approach 2: Check via web scraping (fallback)
    try {
      const response = await fetch(`https://trustpositif.app/check?domain=${encodeURIComponent(cleanDomain)}`, {
        headers: {
          'User-Agent': 'NexusSearch/1.0'
        },
        signal: AbortSignal.timeout(5000)
      })

      if (response.ok) {
        const html = await response.text()
        
        // Check for common indicators of blocked status in HTML
        const blockedIndicators = [
          'domain telah diblokir',
          'domain diblokir',
          'situs diblokir',
          'blocked',
          'konten negatif',
          'domain tidak dapat diakses'
        ]
        
        const isBlocked = blockedIndicators.some(indicator => 
          html.toLowerCase().includes(indicator.toLowerCase())
        )
        
        if (isBlocked) {
          return {
            isBlocked: true,
            reason: 'Domain diblokir oleh TrustPositif',
            category: 'Konten Negatif'
          }
        }
      }
    } catch (scrapeError) {
      console.log('Web scraping failed')
    }

    // Approach 3: Check common blocked categories and patterns
    const blockedPatterns = [
      /gambling/i,
      /casino/i,
      /poker/i,
      /toto/i,
      /slot/i,
      /judi/i,
      /betting/i,
      /adult/i,
      /porn/i,
      /xxx/i
    ]
    
    const isBlockedByPattern = blockedPatterns.some(pattern => 
      pattern.test(cleanDomain)
    )
    
    if (isBlockedByPattern) {
      return {
        isBlocked: true,
        reason: 'Domain mengandung kata kunci yang diblokir',
        category: 'Konten Negatif'
      }
    }

    return { isBlocked: false }
    
  } catch (error) {
    console.error('Error checking domain status:', error)
    // On error, assume not blocked to avoid false positives
    return { isBlocked: false }
  }
}

export function extractDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    return urlObj.hostname
  } catch {
    // If URL parsing fails, return the original string cleaned
    return url.replace(/^https?:\/\//, '').split('/')[0]
  }
}

export async function filterBlockedUrls(results: any[]): Promise<{
  filteredResults: any[]
  blockedCount: number
}> {
  const filteredResults: any[] = []
  let blockedCount = 0

  for (const result of results) {
    try {
      const domain = extractDomainFromUrl(result.url || result.host_name)
      const status = await checkDomainStatus(domain)
      
      if (!status.isBlocked) {
        filteredResults.push({
          ...result,
          safetyStatus: 'safe'
        })
      } else {
        blockedCount++
        // Include blocked results with marking for transparency
        filteredResults.push({
          ...result,
          safetyStatus: 'blocked',
          blockReason: status.reason,
          blockCategory: status.category
        })
      }
    } catch (error) {
      // If checking fails, include as unknown
      filteredResults.push({
        ...result,
        safetyStatus: 'unknown'
      })
    }
  }

  return { filteredResults, blockedCount }
}