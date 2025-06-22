"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, TrendingUp, Shield, Zap, Target } from "lucide-react"
import { loadHotelData, scoreHotelMatch, type HotelListing } from "@/lib/hotel-data"

interface InvestmentRecommendation {
  type: string
  description: string
  riskLevel: "Low" | "Medium" | "High"
  expectedReturn: string
  icon: React.ComponentType<any>
  color: string
}

interface PropertyMatch extends HotelListing {
  matchScore: number
  matchReasons: string[]
}

// Enhanced AI function using real hotel data
function analyzeInvestorProfile(
  description: string,
  hotels: HotelListing[],
): {
  recommendations: InvestmentRecommendation[]
  properties: PropertyMatch[]
} {
  const lowerDesc = description.toLowerCase()

  // Analyze investor profile
  const isFirstTime = lowerDesc.includes("first-time") || lowerDesc.includes("new") || lowerDesc.includes("beginner")
  const wantsLowRisk = lowerDesc.includes("low risk") || lowerDesc.includes("stable") || lowerDesc.includes("safe")
  const wantsHighReturn =
    lowerDesc.includes("high return") || lowerDesc.includes("aggressive") || lowerDesc.includes("growth")
  const isInternational = lowerDesc.includes("international") || lowerDesc.includes("foreign")
  const mentionsLuxury = lowerDesc.includes("luxury") || lowerDesc.includes("premium") || lowerDesc.includes("upscale")
  const mentionsBudget = lowerDesc.match(/(\d+)m|(\d+) million/i)
  const mentionsCity = ["jeddah", "riyadh", "sakaka", "jazan", "abha", "al rass"].find((city) =>
    lowerDesc.includes(city),
  )

  // Generate recommendations based on available hotel types
  const availableTypes = Array.from(new Set(hotels.map((h) => h.hotelType)))
  const recommendations: InvestmentRecommendation[] = []

  if (isFirstTime || wantsLowRisk) {
    const businessHotels = availableTypes.filter(
      (type) => type.toLowerCase().includes("business") || type.toLowerCase().includes("furnished"),
    )
    if (businessHotels.length > 0) {
      recommendations.push({
        type: businessHotels[0],
        description: "Stable income with established operations and lower management complexity",
        riskLevel: "Low",
        expectedReturn: "7-9%",
        icon: Shield,
        color: "text-green-600",
      })
    }
  }

  if (wantsHighReturn || !wantsLowRisk) {
    const boutiqueHotels = availableTypes.filter((type) => type.toLowerCase().includes("boutique"))
    if (boutiqueHotels.length > 0) {
      recommendations.push({
        type: boutiqueHotels[0],
        description: "Higher margins with unique positioning and premium pricing potential",
        riskLevel: "Medium",
        expectedReturn: "9-12%",
        icon: TrendingUp,
        color: "text-blue-600",
      })
    }
  }

  if (mentionsLuxury || wantsHighReturn) {
    const luxuryTypes = availableTypes.filter(
      (type) => type.toLowerCase().includes("luxury") || type.toLowerCase().includes("resort"),
    )
    if (luxuryTypes.length > 0) {
      recommendations.push({
        type: luxuryTypes[0],
        description: "Premium market positioning with high ADR and strong brand value",
        riskLevel: "High",
        expectedReturn: "10-15%",
        icon: Star,
        color: "text-purple-600",
      })
    }
  }

  // Fallback recommendations
  if (recommendations.length === 0) {
    recommendations.push({
      type: availableTypes[0] || "Business Hotel",
      description: "Balanced risk-return profile suitable for most investors",
      riskLevel: "Medium",
      expectedReturn: "8-10%",
      icon: Target,
      color: "text-emerald-600",
    })
  }

  // Score and match properties
  const budget = mentionsBudget ? Number.parseInt(mentionsBudget[1] || mentionsBudget[2]) * 1000000 : undefined
  const riskTolerance = wantsLowRisk ? "low" : wantsHighReturn ? "high" : "medium"

  const scoredProperties = hotels.map((hotel) => {
    const { score, reasons } = scoreHotelMatch(hotel, {
      preferredCity: mentionsCity,
      budgetRange: budget ? [0, budget] : undefined,
      targetIRR: wantsHighReturn ? 8.5 : 7.5,
      riskTolerance,
    })

    return {
      ...hotel,
      matchScore: score,
      matchReasons: reasons,
    }
  })

  // Sort by match score and take top 3
  const topProperties = scoredProperties.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)

  return { recommendations, properties: topProperties }
}

export function InvestorMatch() {
  const [description, setDescription] = useState("")
  const [hotels, setHotels] = useState<HotelListing[]>([])
  const [analysis, setAnalysis] = useState<{
    recommendations: InvestmentRecommendation[]
    properties: PropertyMatch[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHotelData().then((data) => {
      setHotels(data)
      setLoading(false)
    })
  }, [])

  const handleAnalyze = async () => {
    if (!description.trim() || hotels.length === 0) return

    setIsAnalyzing(true)
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = analyzeInvestorProfile(description, hotels)
    setAnalysis(result)
    setIsAnalyzing(false)
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
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-600" />
            Describe Yourself as an Investor
          </CardTitle>
          <CardDescription>
            Tell us about your investment goals, risk tolerance, and preferences. Our AI will analyze your profile and
            recommend the best hotel investment types and properties from our {hotels.length} available listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="I'm a first-time international investor looking for stable returns with low risk. I prefer established properties in major cities with proven track records..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="min-h-[120px]"
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">{description.length}/500 characters</div>
              <Button onClick={handleAnalyze} disabled={!description.trim() || isAnalyzing} className="min-w-[120px]">
                {isAnalyzing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Analyze Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-8">
          {/* Investment Type Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Investment Types</CardTitle>
              <CardDescription>
                Based on your investor profile, here are the hotel types that best match your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {analysis.recommendations.map((rec, index) => (
                  <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <rec.icon className={`h-5 w-5 ${rec.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rec.type}</CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge
                              variant={
                                rec.riskLevel === "Low"
                                  ? "secondary"
                                  : rec.riskLevel === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {rec.riskLevel} Risk
                            </Badge>
                            <Badge variant="outline">{rec.expectedReturn} IRR</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Property Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Matched Properties</CardTitle>
              <CardDescription>Specific hotel investments that align with your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {analysis.properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(property.title)}`
                        }}
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        <Badge className="bg-emerald-600">AI Score: {property.aiScore}</Badge>
                        <Badge className="bg-blue-600">{property.matchScore}% Match</Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">
                          {Array.from({ length: property.stars }, (_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {property.city}, Saudi Arabia
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {property.currency} {property.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">${(property.price / 3.75).toLocaleString()}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">{property.irr}%</div>
                            <div className="text-sm text-gray-600">IRR</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-2">Why this matches you:</div>
                          <div className="flex flex-wrap gap-1">
                            {property.matchReasons.map((reason, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Example Prompts */}
      {!analysis && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Example Investor Profiles</CardTitle>
            <CardDescription>Try these sample descriptions to see how our AI matching works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() =>
                  setDescription(
                    "I'm a first-time international investor looking for stable returns with low risk. I prefer established properties in Jeddah under 35M SAR.",
                  )
                }
              >
                <div>
                  <div className="font-medium">Conservative First-Timer</div>
                  <div className="text-sm text-gray-600">Low risk, stable returns, established properties</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() =>
                  setDescription(
                    "I'm an experienced investor seeking high-growth opportunities. I'm comfortable with higher risk for premium returns above 8.5% IRR.",
                  )
                }
              >
                <div>
                  <div className="font-medium">Growth-Focused Investor</div>
                  <div className="text-sm text-gray-600">High growth, premium returns, emerging markets</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() =>
                  setDescription(
                    "I want to invest in boutique hospitality with strong brand recognition. Budget is flexible for the right opportunity in prime locations.",
                  )
                }
              >
                <div>
                  <div className="font-medium">Boutique-Focused</div>
                  <div className="text-sm text-gray-600">Boutique hospitality, brand recognition, prime locations</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() =>
                  setDescription(
                    "I'm looking for a balanced portfolio approach with moderate risk. Interested in both business hotels and boutique properties under 10M SAR.",
                  )
                }
              >
                <div>
                  <div className="font-medium">Balanced Portfolio</div>
                  <div className="text-sm text-gray-600">Moderate risk, diversified, business + boutique</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
