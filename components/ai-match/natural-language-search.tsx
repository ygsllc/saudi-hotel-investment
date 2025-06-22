"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Search, Zap, Target } from "lucide-react"
import { loadHotelData, type HotelListing } from "@/lib/hotel-data"

interface SearchResult extends HotelListing {
  matchedCriteria: string[]
  relevanceScore: number
}

// Enhanced NLP function using real hotel data
function parseNaturalLanguageQuery(query: string, hotels: HotelListing[]): SearchResult[] {
  const lowerQuery = query.toLowerCase()

  // Extract criteria from query
  const criteria: { [key: string]: any } = {}
  const matchedCriteria: string[] = []

  // Price extraction - more flexible patterns
  const pricePatterns = [
    /under (\d+)m/i,
    /below (\d+)m/i,
    /less than (\d+)m/i,
    /(\d+)m or less/i,
    /under (\d+) million/i,
    /below (\d+) million/i,
    /budget.*?(\d+)m/i,
  ]

  for (const pattern of pricePatterns) {
    const match = lowerQuery.match(pattern)
    if (match) {
      const amount = Number.parseInt(match[1])
      criteria.maxPrice = amount * 1000000
      matchedCriteria.push("Budget")
      break
    }
  }

  // Location extraction - check against actual cities in data
  const availableCities = Array.from(new Set(hotels.map((h) => h.city.toLowerCase())))
  const mentionedCity = availableCities.find((city) => lowerQuery.includes(city))
  if (mentionedCity) {
    criteria.city = mentionedCity
    matchedCriteria.push("Location")
  }

  // Yield/IRR extraction
  const irrPatterns = [
    /high yield/i,
    /high return/i,
    /good return/i,
    /(\d+(?:\.\d+)?)%.*?irr/i,
    /irr.*?(\d+(?:\.\d+)?)%/i,
    /return.*?(\d+(?:\.\d+)?)%/i,
  ]

  for (const pattern of irrPatterns) {
    const match = lowerQuery.match(pattern)
    if (match) {
      if (match[1]) {
        criteria.minIRR = Number.parseFloat(match[1])
      } else {
        criteria.minIRR = 8.0 // Default for "high" yield
      }
      matchedCriteria.push("Yield")
      break
    }
  }

  // Tourism potential
  if (lowerQuery.includes("tourism") || lowerQuery.includes("tourist")) {
    criteria.tourismPotential = true
    matchedCriteria.push("Tourism Potential")
  }

  // Hotel type - check against actual types in data
  const availableTypes = Array.from(new Set(hotels.map((h) => h.hotelType.toLowerCase())))
  const typeKeywords = {
    business: ["business", "corporate", "commercial"],
    boutique: ["boutique", "unique", "specialty"],
    luxury: ["luxury", "premium", "upscale", "high-end"],
    furnished: ["furnished", "serviced"],
  }

  for (const [category, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      const matchingType = availableTypes.find((type) => type.includes(category))
      if (matchingType) {
        criteria.hotelType = matchingType
        matchedCriteria.push("Hotel Type")
        break
      }
    }
  }

  // Star rating extraction
  const starMatch = lowerQuery.match(/(\d+)\s*star/i)
  if (starMatch) {
    criteria.minStars = Number.parseInt(starMatch[1])
    matchedCriteria.push("Star Rating")
  }

  // AI Score requirements
  if (lowerQuery.includes("high quality") || lowerQuery.includes("top rated") || lowerQuery.includes("best")) {
    criteria.minAIScore = 70
    matchedCriteria.push("Quality Score")
  }

  // Filter and score hotels
  let results = hotels.map((hotel) => {
    let relevanceScore = 0
    const hotelMatchedCriteria: string[] = []

    // Price matching (30 points)
    if (criteria.maxPrice && hotel.price <= criteria.maxPrice) {
      relevanceScore += 30
      hotelMatchedCriteria.push("Budget")
    }

    // Location matching (40 points)
    if (criteria.city) {
      const cityMatch =
        hotel.city.toLowerCase().includes(criteria.city) || hotel.title.toLowerCase().includes(criteria.city)
      if (cityMatch) {
        relevanceScore += 40
        hotelMatchedCriteria.push("Location")
      }
    }

    // IRR matching (25 points)
    if (criteria.minIRR && hotel.irr >= criteria.minIRR) {
      relevanceScore += 25
      hotelMatchedCriteria.push("Yield")
    }

    // Tourism potential (20 points)
    if (criteria.tourismPotential) {
      const touristCities = ["jeddah", "riyadh", "mecca", "medina"]
      if (touristCities.some((city) => hotel.city.toLowerCase().includes(city))) {
        relevanceScore += 20
        hotelMatchedCriteria.push("Tourism Potential")
      }
    }

    // Hotel type matching (25 points)
    if (criteria.hotelType) {
      const typeMatch = hotel.hotelType.toLowerCase().includes(criteria.hotelType)
      if (typeMatch) {
        relevanceScore += 25
        hotelMatchedCriteria.push("Hotel Type")
      }
    }

    // Star rating matching (15 points)
    if (criteria.minStars && hotel.stars >= criteria.minStars) {
      relevanceScore += 15
      hotelMatchedCriteria.push("Star Rating")
    }

    // AI Score matching (10 points)
    if (criteria.minAIScore && hotel.aiScore >= criteria.minAIScore) {
      relevanceScore += 10
      hotelMatchedCriteria.push("Quality Score")
    }

    // Keyword matching in title (bonus points)
    const titleWords = hotel.title.toLowerCase().split(" ")
    const queryWords = lowerQuery.split(" ")
    const commonWords = titleWords.filter((word) => queryWords.includes(word))
    if (commonWords.length > 0) {
      relevanceScore += commonWords.length * 2
      if (commonWords.length > 2) hotelMatchedCriteria.push("Title Match")
    }

    // Base relevance for any hotel
    if (relevanceScore === 0) {
      relevanceScore = 10
    }

    return {
      ...hotel,
      matchedCriteria: hotelMatchedCriteria,
      relevanceScore,
    }
  })

  // Filter out hotels with very low relevance and sort by score
  results = results
    .filter((hotel) => hotel.relevanceScore > 15)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5) // Top 5 results

  return results
}

export function NaturalLanguageSearch() {
  const [query, setQuery] = useState("")
  const [hotels, setHotels] = useState<HotelListing[]>([])
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHotelData().then((data) => {
      setHotels(data)
      setLoading(false)
    })
  }, [])

  const handleSearch = async () => {
    if (!query.trim() || hotels.length === 0) return

    setIsSearching(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const searchResults = parseNaturalLanguageQuery(query, hotels)
    setResults(searchResults)
    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const exampleQueries = [
    "I want a high-yield hotel under 10M SAR in Jeddah with strong tourism potential",
    "Looking for a boutique hotel investment with good returns above 8% IRR",
    "Find me a business hotel under 15M SAR with stable income potential",
    "Show me 4-star hotels in major cities with high AI scores",
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-pulse">Loading hotel data...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Describe Your Ideal Hotel Investment
          </CardTitle>
          <CardDescription>
            Use natural language to describe what you're looking for from our {hotels.length} available properties. Our
            AI will understand your requirements and find matching hotels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="I want a high-yield hotel under 10M SAR in Jeddah with strong tourism potential..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={!query.trim() || isSearching} className="min-w-[120px]">
                {isSearching ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Find Match
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              Try mentioning: location, budget, hotel type, yield expectations, star rating, or quality requirements
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Found {results.length} hotels matching your criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.map((hotel, index) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <div className="aspect-video lg:aspect-square relative">
                        <img
                          src={hotel.images[0] || "/placeholder.svg"}
                          alt={hotel.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(hotel.title)}`
                          }}
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          <Badge className="bg-blue-600">#{index + 1}</Badge>
                          <Badge variant="secondary">{hotel.relevanceScore}% match</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">
                            {Array.from({ length: hotel.stars }, (_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{hotel.title}</h3>
                          <p className="text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {hotel.city}, Saudi Arabia
                          </p>
                        </div>
                        <Badge variant="outline">{hotel.hotelType}</Badge>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{hotel.relevanceScore}%</div>
                          <div className="text-sm text-gray-600">Match Score</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{hotel.irr}%</div>
                          <div className="text-sm text-gray-600">IRR</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{hotel.aiScore}</div>
                          <div className="text-sm text-gray-600">AI Score</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">
                            {hotel.currency} {(hotel.price / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-sm text-gray-600">Price</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Matched on:</div>
                        <div className="flex flex-wrap gap-1">
                          {hotel.matchedCriteria.length > 0 ? (
                            hotel.matchedCriteria.map((criterion, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                ✓ {criterion}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              General match
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">View Details</Button>
                        <Button variant="outline" size="icon">
                          <Target className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {results.length === 0 && query && !isSearching && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-800 mb-2">No matches found</h3>
            <p className="text-yellow-700 mb-4">Try adjusting your search criteria or using different keywords.</p>
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Example Queries */}
      {!query && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Example Searches</CardTitle>
            <CardDescription>Try these sample queries to see how natural language search works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {exampleQueries.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => setQuery(example)}
                >
                  <div className="flex items-start gap-3">
                    <Search className="h-4 w-4 mt-0.5 text-gray-400" />
                    <span className="text-sm">{example}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
