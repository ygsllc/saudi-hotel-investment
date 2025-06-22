"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, MapPin, Building2, Target } from "lucide-react"
import { loadHotelData, getUniqueValues, filterHotels, type HotelListing } from "@/lib/hotel-data"

interface ScoredHotel extends HotelListing {
  totalScore: number
  matchedCriteria: string[]
}

interface FilterCriteria {
  hotelType: string
  city: string
  minStars: number
  maxStars: number
  minIRR: number
  maxIRR: number
  minAIScore: number
  maxAIScore: number
  minPrice: number
  maxPrice: number
}

export function AmenityScoring() {
  const [hotels, setHotels] = useState<HotelListing[]>([])
  const [loading, setLoading] = useState(true)
  const [scoredHotels, setScoredHotels] = useState<ScoredHotel[]>([])

  // Filter states
  const [filters, setFilters] = useState<FilterCriteria>({
    hotelType: "all",
    city: "all",
    minStars: 1,
    maxStars: 5,
    minIRR: 0,
    maxIRR: 15,
    minAIScore: 0,
    maxAIScore: 100,
    minPrice: 0,
    maxPrice: 50000000,
  })

  // Unique values for dropdowns
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([])
  const [uniqueCities, setUniqueCities] = useState<string[]>([])

  useEffect(() => {
    loadHotelData().then((data) => {
      setHotels(data)
      setUniqueTypes(getUniqueValues(data, "hotelType"))
      setUniqueCities(getUniqueValues(data, "city"))
      setLoading(false)
    })
  }, [])

  const calculateScores = () => {
    if (hotels.length === 0) return

    // Filter hotels based on criteria
    const filteredHotels = filterHotels(hotels, {
      city: filters.city !== "all" ? filters.city : undefined,
      hotelType: filters.hotelType !== "all" ? filters.hotelType : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minIRR: filters.minIRR,
      maxIRR: filters.maxIRR,
      minAIScore: filters.minAIScore,
      maxAIScore: filters.maxAIScore,
      minStars: filters.minStars,
      maxStars: filters.maxStars,
    })

    // Score each hotel based on how well it matches the criteria
    const scored = filteredHotels
      .map((hotel) => {
        let totalScore = 0
        const matchedCriteria: string[] = []

        // Hotel Type Score (25 points)
        if (filters.hotelType === "all" || hotel.hotelType === filters.hotelType) {
          totalScore += 25
          if (filters.hotelType !== "all") matchedCriteria.push("Hotel Type")
        }

        // City Score (20 points)
        if (filters.city === "all" || hotel.city === filters.city) {
          totalScore += 20
          if (filters.city !== "all") matchedCriteria.push("Location")
        }

        // Star Rating Score (15 points)
        if (hotel.stars >= filters.minStars && hotel.stars <= filters.maxStars) {
          totalScore += 15
          if (filters.minStars > 1 || filters.maxStars < 5) matchedCriteria.push("Star Rating")
        }

        // IRR Score (20 points)
        if (hotel.irr >= filters.minIRR && hotel.irr <= filters.maxIRR) {
          totalScore += 20
          if (filters.minIRR > 0 || filters.maxIRR < 15) matchedCriteria.push("IRR Range")
        }

        // AI Score (10 points)
        if (hotel.aiScore >= filters.minAIScore && hotel.aiScore <= filters.maxAIScore) {
          totalScore += 10
          if (filters.minAIScore > 0 || filters.maxAIScore < 100) matchedCriteria.push("AI Score")
        }

        // Price Score (10 points)
        if (hotel.price >= filters.minPrice && hotel.price <= filters.maxPrice) {
          totalScore += 10
          if (filters.minPrice > 0 || filters.maxPrice < 50000000) matchedCriteria.push("Price Range")
        }

        return {
          ...hotel,
          totalScore,
          matchedCriteria,
        }
      })
      .sort((a, b) => b.totalScore - a.totalScore)

    setScoredHotels(scored)
  }

  useEffect(() => {
    calculateScores()
  }, [filters, hotels])

  const updateFilter = (key: keyof FilterCriteria, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      hotelType: "all",
      city: "all",
      minStars: 1,
      maxStars: 5,
      minIRR: 0,
      maxIRR: 15,
      minAIScore: 0,
      maxAIScore: 100,
      minPrice: 0,
      maxPrice: 50000000,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-blue-600"
    if (score >= 40) return "text-yellow-600"
    return "text-gray-600"
  }

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
      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Investment Criteria Filters
          </CardTitle>
          <CardDescription>
            Set your investment preferences to score and rank hotels from our {hotels.length} available properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Dropdown Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hotel Type</label>
                <Select value={filters.hotelType} onValueChange={(value) => updateFilter("hotelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hotel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {uniqueCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Range Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Star Rating: {filters.minStars} - {filters.maxStars} stars
                </label>
                <div className="px-2">
                  <Slider
                    value={[filters.minStars, filters.maxStars]}
                    onValueChange={([min, max]) => {
                      updateFilter("minStars", min)
                      updateFilter("maxStars", max)
                    }}
                    max={5}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Investment IRR: {filters.minIRR}% - {filters.maxIRR}%
                </label>
                <div className="px-2">
                  <Slider
                    value={[filters.minIRR, filters.maxIRR]}
                    onValueChange={([min, max]) => {
                      updateFilter("minIRR", min)
                      updateFilter("maxIRR", max)
                    }}
                    max={15}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  AI Score: {filters.minAIScore} - {filters.maxAIScore}
                </label>
                <div className="px-2">
                  <Slider
                    value={[filters.minAIScore, filters.maxAIScore]}
                    onValueChange={([min, max]) => {
                      updateFilter("minAIScore", min)
                      updateFilter("maxAIScore", max)
                    }}
                    max={100}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range: SAR {(filters.minPrice / 1000000).toFixed(1)}M - SAR{" "}
                  {(filters.maxPrice / 1000000).toFixed(1)}M
                </label>
                <div className="px-2">
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => {
                      updateFilter("minPrice", min)
                      updateFilter("maxPrice", max)
                    }}
                    max={50000000}
                    min={0}
                    step={1000000}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">{scoredHotels.length} hotels match your criteria</div>
              <Button variant="outline" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scored Results */}
      {scoredHotels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Investment-Based Hotel Rankings</CardTitle>
            <CardDescription>Hotels ranked by how well they match your investment criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scoredHotels.map((hotel, index) => (
                <Card key={hotel.id} className="overflow-hidden">
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
                          <Badge className="bg-emerald-600">#{index + 1}</Badge>
                          <Badge className="bg-blue-600">{hotel.totalScore}% Match</Badge>
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
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold ${getScoreColor(hotel.totalScore)}`}>
                            {hotel.totalScore}
                          </div>
                          <div className="text-sm text-gray-600">Match Score</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{hotel.irr}%</div>
                          <div className="text-sm text-gray-600">IRR</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{hotel.aiScore}</div>
                          <div className="text-sm text-gray-600">AI Score</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">
                            {hotel.currency} {(hotel.price / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-sm text-gray-600">Price</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          Matched Criteria ({hotel.matchedCriteria.length}):
                        </div>
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

                      <Button className="w-full lg:w-auto">View Hotel Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {scoredHotels.length === 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-800 mb-2">No hotels match your criteria</h3>
            <p className="text-yellow-700 mb-6">
              Try adjusting your filters to see more results. You can reset all filters to start over.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Reset All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Filter Presets */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Filter Presets</CardTitle>
          <CardDescription>Try these common investment criteria combinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() =>
                setFilters({
                  hotelType: "all",
                  city: "all",
                  minStars: 4,
                  maxStars: 5,
                  minIRR: 8,
                  maxIRR: 15,
                  minAIScore: 70,
                  maxAIScore: 100,
                  minPrice: 0,
                  maxPrice: 50000000,
                })
              }
            >
              <div>
                <div className="font-medium">High-Quality Focus</div>
                <div className="text-sm text-gray-600">4-5 stars, 8%+ IRR, 70+ AI score</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() =>
                setFilters({
                  hotelType: "all",
                  city: "all",
                  minStars: 1,
                  maxStars: 5,
                  minIRR: 0,
                  maxIRR: 15,
                  minAIScore: 0,
                  maxAIScore: 100,
                  minPrice: 0,
                  maxPrice: 10000000,
                })
              }
            >
              <div>
                <div className="font-medium">Budget-Friendly</div>
                <div className="text-sm text-gray-600">Under 10M SAR, all quality levels</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 text-left justify-start"
              onClick={() =>
                setFilters({
                  hotelType: "Boutique Hotel",
                  city: "all",
                  minStars: 3,
                  maxStars: 5,
                  minIRR: 7.5,
                  maxIRR: 15,
                  minAIScore: 65,
                  maxAIScore: 100,
                  minPrice: 0,
                  maxPrice: 50000000,
                })
              }
            >
              <div>
                <div className="font-medium">Boutique Specialist</div>
                <div className="text-sm text-gray-600">Boutique hotels, 3+ stars, 7.5%+ IRR</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
