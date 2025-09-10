'use client'

import { useState, useEffect } from 'react'
import { Search, Zap, Wifi, Cpu, X, Shield, ShieldOff, AlertTriangle, Sparkles, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [blockedCount, setBlockedCount] = useState<number>(0)
  const [originalCount, setOriginalCount] = useState<number>(0)
  const [isGlitching, setIsGlitching] = useState(false)

  // Glitch effect for cyberpunk feel
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setError(null)
    setSearchResults([])
    setBlockedCount(0)
    setOriginalCount(0)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSearchResults(data.results || [])
        setBlockedCount(data.blockedCount || 0)
        setOriginalCount(data.originalResults || 0)
      } else {
        setError(data.error || 'Search failed')
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('Network error - please try again')
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setError(null)
    setBlockedCount(0)
    setOriginalCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 text-slate-800 relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'gridMove 30s linear infinite'
          }} />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 px-4">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="relative">
              <Zap className="w-6 h-6 md:w-10 md:h-10 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 w-6 h-6 md:w-10 md:h-10 bg-blue-500 rounded-full animate-ping opacity-40"></div>
            </div>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter ${
              isGlitching ? 'animate-glitch' : ''
            }`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                NEXUS
              </span>
            </h1>
            <div className="relative">
              <Cpu className="w-6 h-6 md:w-10 md:h-10 text-purple-500 animate-pulse" />
              <div className="absolute inset-0 w-6 h-6 md:w-10 md:h-10 bg-purple-500 rounded-full animate-ping opacity-40"></div>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3">
            <p className="text-lg md:text-2xl lg:text-3xl text-slate-700 font-bold tracking-wider uppercase">
              Cybernetic Search Engine
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/60 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <Wifi className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-green-600 font-mono text-xs md:text-sm">ONLINE</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/60 border border-purple-400/30 rounded-full backdrop-blur-sm">
                <span className="text-purple-600 font-mono text-xs">PENULIS4D</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/60 border border-green-400/30 rounded-full backdrop-blur-sm">
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <span className="text-green-600 font-mono text-xs">SAFE FILTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Container */}
        <div className="w-full max-w-3xl px-4">
          <Card className="bg-white/90 border-0 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
            <CardContent className="relative p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search the cybernetic realm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-white/80 border-blue-400/30 text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-400/20 font-mono text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 py-2.5 md:py-3 lg:py-4 rounded-lg md:rounded-xl backdrop-blur-sm"
                  />
                  <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2">
                    <Terminal className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold border-none shadow-xl shadow-blue-400/30 transition-all duration-300 hover:shadow-blue-400/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none px-4 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 rounded-lg md:rounded-xl flex-shrink-0"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="animate-spin w-3 h-3 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span className="font-mono text-xs md:text-sm">SCAN</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 md:gap-2">
                        <Search className="w-3 h-3 md:w-5 md:h-5" />
                        <span className="font-mono text-xs md:text-sm">SEARCH</span>
                      </div>
                    )}
                  </Button>
                  {(searchQuery || searchResults.length > 0 || error) && (
                    <Button 
                      onClick={clearSearch}
                      variant="outline"
                      className="bg-white/80 border-red-400/30 text-red-500 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-300 px-2 md:px-4 py-2.5 md:py-3 lg:py-4 rounded-lg md:rounded-xl flex-shrink-0"
                    >
                      <X className="w-3 h-3 md:w-5 md:h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="w-full max-w-5xl mt-6 md:mt-8 px-4">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="animate-spin w-4 h-4 md:w-6 md:h-6 border-2 border-blue-400 border-t-transparent rounded-full"></div>
              <div className="text-slate-700 font-bold text-base md:text-lg">INITIATING SEARCH PROTOCOL...</div>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="bg-white/80 border-blue-300/20 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1 space-y-3 md:space-y-4">
                        <div className="h-4 md:h-6 bg-gradient-to-r from-blue-200/50 to-purple-200/50 rounded animate-pulse w-3/4"></div>
                        <div className="h-3 md:h-4 bg-blue-100/40 rounded animate-pulse w-1/2"></div>
                        <div className="space-y-2 md:space-y-3">
                          <div className="h-3 md:h-4 bg-blue-100/40 rounded animate-pulse w-full"></div>
                          <div className="h-3 md:h-4 bg-blue-100/40 rounded animate-pulse w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="w-full max-w-3xl mt-6 md:mt-8 px-4">
            <Card className="bg-red-100/80 border-red-400/30 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-red-600">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="font-mono text-sm md:text-lg font-bold text-center sm:text-left">
                    SYSTEM ERROR: {error}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="w-full max-w-5xl mt-6 md:mt-8 px-4">
            {/* Results Header */}
            <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-slate-700 font-bold text-xl md:text-2xl">
                    SEARCH RESULTS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-100/50 border border-blue-400/30 rounded-full">
                      <span className="text-blue-600 font-mono text-sm md:text-base">{searchResults.length}</span>
                      <span className="text-blue-500 text-xs md:text-sm">FOUND</span>
                    </div>
                    {blockedCount > 0 && (
                      <div className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-100/50 border border-red-400/30 rounded-full">
                        <span className="text-red-600 font-mono text-sm md:text-base">{blockedCount}</span>
                        <span className="text-red-500 text-xs md:text-sm">BLOCKED</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-slate-500 text-xs md:text-sm">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-mono">FILTERED BY TRUSTPOSITIF</span>
                </div>
              </div>
              
              {blockedCount > 0 && (
                <Card className="bg-orange-100/80 border-orange-400/30 backdrop-blur-sm">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 text-orange-600">
                      <ShieldOff className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <div className="font-mono text-sm text-center sm:text-left">
                        <span className="font-bold">SECURITY ALERT:</span> {blockedCount} domains have been filtered for your protection
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {searchResults.map((result, index) => (
                <Card 
                  key={index} 
                  className={`bg-white/80 backdrop-blur-sm hover:transform hover:scale-[1.02] transition-all duration-300 overflow-hidden ${
                    result.safetyStatus === 'blocked' 
                      ? 'border-red-400/30 hover:border-red-400/40' 
                      : 'border-blue-300/20 hover:border-blue-400/30'
                  }`}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Status Indicator */}
                      <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full mt-2 animate-pulse flex-shrink-0 ${
                        result.safetyStatus === 'blocked' 
                          ? 'bg-red-500 shadow-lg shadow-red-400/50' 
                          : result.safetyStatus === 'unknown'
                          ? 'bg-yellow-500 shadow-lg shadow-yellow-400/50'
                          : 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/50'
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        {/* Title with Status */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                          <h3 
                            className={`text-base md:text-xl font-bold cursor-pointer transition-all duration-300 break-words ${
                              result.safetyStatus === 'blocked'
                                ? 'text-red-600 line-through hover:text-red-500'
                                : 'text-slate-700 hover:text-slate-600 hover:underline'
                            }`}
                            onClick={() => {
                              if (result.safetyStatus !== 'blocked') {
                                window.open(result.url, '_blank')
                              }
                            }}
                          >
                            {result.name}
                          </h3>
                          
                          {/* Safety Status Badge */}
                          {result.safetyStatus === 'blocked' && (
                            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-red-100/50 border border-red-400/30 rounded-full flex-shrink-0">
                              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                              <span className="text-red-600 font-mono text-xs uppercase">Blocked</span>
                            </div>
                          )}
                          {result.safetyStatus === 'safe' && (
                            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-green-100/50 border border-green-400/30 rounded-full flex-shrink-0">
                              <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                              <span className="text-green-600 font-mono text-xs uppercase">Safe</span>
                            </div>
                          )}
                        </div>
                        
                        {/* URL */}
                        <div className="text-slate-500 font-mono text-xs md:text-sm mb-2 md:mb-3 break-all">
                          {result.host_name}
                        </div>
                        
                        {/* Blocked Reason */}
                        {result.safetyStatus === 'blocked' && result.blockReason && (
                          <div className="mb-2 md:mb-3 p-2 md:p-3 bg-red-100/50 border border-red-400/30 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 md:gap-2 text-red-600 text-xs md:text-sm font-mono">
                              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
                              <span className="break-words">BLOCKED: {result.blockReason}</span>
                              {result.blockCategory && (
                                <span className="text-red-500 flex-shrink-0">({result.blockCategory})</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Description */}
                        <p className={`text-sm md:text-base leading-relaxed mb-2 md:mb-3 ${
                          result.safetyStatus === 'blocked'
                            ? 'text-red-500 line-through'
                            : 'text-slate-600'
                        }`}>
                          {result.snippet}
                        </p>
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs text-slate-500 font-mono">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">RANK:</span>
                            <span className="text-slate-600">{result.rank}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">DATE:</span>
                            <span className="text-slate-600">{result.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center px-4">
          <div className="text-slate-500 font-mono text-xs md:text-sm tracking-wider break-words">
            NEXUS v2.0 • PENULIS4D POWERED • TRUSTPOSITIF FILTER • SECURE CONNECTION
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 1; 
          }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }
        
        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: #1e293b;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #a855f7);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #9333ea);
        }
      `}</style>
    </div>
  )
}