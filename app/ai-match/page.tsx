"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, User, Settings, Search } from "lucide-react"
import { InvestorMatch } from "@/components/ai-match/investor-match"
import { AmenityScoring } from "@/components/ai-match/amenity-scoring"
import { NaturalLanguageSearch } from "@/components/ai-match/natural-language-search"

export default function AIMatchPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Brain className="h-4 w-4 mr-2" />
            AI-Powered Matching
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">🔍 AI Match</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your perfect hotel investment using advanced AI matching. Get personalized recommendations based on
            your investor profile, preferred amenities, or natural language descriptions.
          </p>
        </div>

        {/* AI Match Tabs */}
        <Tabs defaultValue="investor-match" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="investor-match" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Investor Match
            </TabsTrigger>
            <TabsTrigger value="amenity-scoring" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Amenity Scoring
            </TabsTrigger>
            <TabsTrigger value="natural-search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Natural Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="investor-match">
            <InvestorMatch />
          </TabsContent>

          <TabsContent value="amenity-scoring">
            <AmenityScoring />
          </TabsContent>

          <TabsContent value="natural-search">
            <NaturalLanguageSearch />
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <section className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Invest with AI Confidence?</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our AI matching system helps you find the perfect hotel investment tailored to your specific needs and
                preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="text-sm">
                  🚀 MVP Feature - More AI capabilities coming soon!
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
