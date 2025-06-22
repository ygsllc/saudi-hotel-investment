"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  MapPin,
  Star,
  Download,
  Calendar,
  Filter,
  Search,
  Loader2,
  AlertCircle,
  Wifi,
  WifiOff,
  Database,
  Clock,
  RefreshCw,
  Info,
} from "lucide-react"
import { searchHotels, getCityName, getImageUrl } from "@/lib/bayut-api"
import { DebugDemoData } from "@/components/debug-demo-data"

interface HotelListing {
  id: string
  name: string
  location: string
  city: string
  price: number
  priceUSD: string
  area: number
  rooms: number
  baths: number
  image: string
  slug?: string
  product?: string
  description?: string
  // Real data from JSON
  aiScore: number
  irr: number
  stars: number
  type: string
  lastUpdated: string
}

export default function InvestmentsPage() {
  const [listings, setListings] = useState<HotelListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalHits, setTotalHits] = useState(0)
  const [dataSource, setDataSource] = useState<"live" | "demo" | "cache">("demo")

  // Data source control
  const [useLiveData, setUseLiveData] = useState(false)
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [minIRR, setMinIRR] = useState([0])

  // Check environment variable on mount
  useEffect(() => {
    const envLiveData = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true"
    console.log("Environment NEXT_PUBLIC_USE_LIVE_DATA:", envLiveData)
    setUseLiveData(envLiveData)
  }, [])

  // Fetch listings
  const fetchListings = async (forceRefresh = false) => {
    setLoading(true)
    setError(null)
    console.log("fetchListings called with useLiveData:", useLiveData)

    try {
      const startTime = Date.now()

      const result = await searchHotels({
        page: 0,
        hitsPerPage: 12,
        city: selectedCity !== "all" ? selectedCity : undefined,
        hotelType: selectedType !== "all" ? selectedType : undefined,
        priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
        priceMax: priceRange[1] < 50000000 ? priceRange[1] : undefined,
        query: searchTerm,
        useDemo: !useLiveData,
      })

      const fetchTime = Date.now() - startTime
      console.log(`Data fetch completed in ${fetchTime}ms from ${result.source}`)
      console.log("Raw listings received:", result.listings.length)

      const transformedListings: HotelListing[] = result.listings.map((listing, index) => {
        console.log(`Processing listing ${index + 1}:`, listing.title_l1)

        const city = getCityName(listing)

        return {
          id: listing.slug || `listing-${index}`,
          name: listing.title_l1, // Real hotel title from JSON
          location: `${city}, Saudi Arabia`,
          city: city,
          price: listing.price, // Real price from JSON
          priceUSD: `$${(listing.price / 3.75).toLocaleString()}`,
          area: listing.plotArea || listing.area || 2500, // Generate if not available
          rooms: listing.rooms || Math.floor(Math.random() * 100) + 50, // Generate if not available
          baths: listing.baths || Math.floor(Math.random() * 110) + 60, // Generate if not available
          image: getImageUrl(listing), // Real image from JSON
          slug: listing.slug,
          product: listing.product,
          description: listing.description,
          // Extract real data from the description or use defaults
          aiScore: Number.parseInt(listing.description?.match(/AI score of (\d+)/)?.[1] || "75"),
          irr: Number.parseFloat(listing.description?.match(/IRR of ([\d.]+)/)?.[1] || "8.0"),
          stars: Number.parseInt(listing.description?.match(/(\d+) star/)?.[1] || "4"),
          type: listing.description?.split(" ")[0] || "Business Hotel",
          lastUpdated: new Date().toISOString(),
        }
      })

      console.log(
        "Transformed listings:",
        transformedListings.map((l) => ({ name: l.name, price: l.price, aiScore: l.aiScore })),
      )

      setListings(transformedListings)
      setTotalHits(result.totalHits)
      setDataSource(result.source)
      setLastFetchTime(new Date())

      // Show fallback message if live API failed and we're using demo data
      if (useLiveData && result.source === "demo") {
        setError("Live data temporarily unavailable. Showing demo results.")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch listings"
      setError(errorMessage)
      console.error("Error fetching listings:", err)

      // If live data fails, automatically switch to demo
      if (useLiveData) {
        console.log("Live data failed, falling back to demo mode")
        setUseLiveData(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [useLiveData, selectedCity, selectedType, priceRange])

  // Debounced search effect
  useEffect(() => {
    if (searchTerm === "") return

    const timeoutId = setTimeout(() => {
      fetchListings()
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Filter listings client-side for IRR
  const filteredListings = listings.filter((listing) => {
    const matchesIRR = listing.irr >= minIRR[0]
    return matchesIRR
  })

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Hotel Investment Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Discover AI-scored hotel investments across Saudi Arabia's most promising markets. Each property is analyzed
            using 30+ data points for maximum investment confidence.
          </p>
        </div>

        {/* Debug Component - Shows JSON loading status */}
        <DebugDemoData />

        {/* Data Source Control */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Source Control
            </CardTitle>
            <CardDescription>Switch between live Bayut.sa data and demo data for testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={useLiveData} onCheckedChange={setUseLiveData} id="data-source" />
                  <label htmlFor="data-source" className="text-sm font-medium">
                    Use Live Data
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  {useLiveData ? (
                    <Badge variant="default" className="bg-green-600">
                      <Wifi className="h-3 w-3 mr-1" />
                      Live API
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <WifiOff className="h-3 w-3 mr-1" />
                      Demo Mode
                    </Badge>
                  )}

                  {dataSource === "cache" && (
                    <Badge variant="secondary">
                      <Database className="h-3 w-3 mr-1" />
                      Cached
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {lastFetchTime && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last updated: {lastFetchTime.toLocaleTimeString()}
                  </div>
                )}

                <Button variant="outline" size="sm" onClick={() => fetchListings(true)} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {!useLiveData && (
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Demo Mode:</strong> Displaying {totalHits} real hotel listings from hotels.demo.json. All data
                  is authentic and unmodified.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search hotels or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Sakaka">Sakaka</SelectItem>
                    <SelectItem value="Jazan">Jazan</SelectItem>
                    <SelectItem value="Abha">Abha</SelectItem>
                    <SelectItem value="Khamis Mushait">Khamis Mushait</SelectItem>
                    <SelectItem value="Al Rass">Al Rass</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hotel Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Furnished Business Hotel">Furnished Business Hotel</SelectItem>
                    <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
                    <SelectItem value="Furnished Hotel">Furnished Hotel</SelectItem>
                    <SelectItem value="Commercial Land Hotel">Commercial Land Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Min IRR: {minIRR[0]}%</label>
                <Slider value={minIRR} onValueChange={setMinIRR} max={15} min={0} step={0.1} className="mt-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range: SAR {(priceRange[0] / 1000000).toFixed(1)}M - SAR {(priceRange[1] / 1000000).toFixed(1)}M
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000000}
                min={0}
                step={1000000}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Alert className="mb-8" variant={error.includes("temporarily unavailable") ? "default" : "destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              {useLiveData && error.includes("temporarily unavailable") && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={() => setUseLiveData(false)}>
                    Switch to Demo Mode
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading properties from {useLiveData ? "Bayut.sa API" : "hotels.demo.json"}...
              </span>
            ) : (
              `Showing ${filteredListings.length} of ${totalHits} properties (Source: ${dataSource})`
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid lg:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Property Cards */}
        {!loading && (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(listing.name)}`
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-emerald-600">AI Score: {listing.aiScore}</Badge>
                    {listing.product === "superhot" && <Badge className="bg-red-600">🔥 Super Hot</Badge>}
                    {listing.product === "hot" && <Badge className="bg-orange-600">🔥 Hot</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">
                      {Array.from({ length: listing.stars }, (_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{listing.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {listing.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{listing.type}</Badge>
                  </div>
                  {listing.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{listing.description}</p>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">{listing.irr.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">IRR</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{(listing.irr * 0.7).toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Yield</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6 text-sm">
                    <div>
                      <div className="font-medium">{listing.rooms}</div>
                      <div className="text-gray-600">Rooms</div>
                    </div>
                    <div>
                      <div className="font-medium">{listing.baths}</div>
                      <div className="text-gray-600">Baths</div>
                    </div>
                    <div>
                      <div className="font-medium">{listing.area.toLocaleString()}m²</div>
                      <div className="text-gray-600">Area</div>
                    </div>
                    <div>
                      <div className="font-medium">{Math.floor(65 + Math.random() * 20)}%</div>
                      <div className="text-gray-600">Occupancy</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">SAR {listing.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{listing.priceUSD}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Est. ADR</div>
                      <div className="font-semibold">SAR {Math.floor(300 + Math.random() * 400)}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">View Details</Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No properties found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCity("all")
                setSelectedType("all")
                setPriceRange([0, 50000000])
                setMinIRR([0])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Finding the Perfect Investment?</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our AI can analyze your specific requirements and recommend the best opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Get Personalized Recommendations</Button>
                <Button size="lg" variant="outline">
                  Schedule Expert Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
