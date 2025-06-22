"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DemoHotelListing {
  id: string
  title: string
  city: string
  price: number
  currency: string
  aiScore: number
  irr: number
  stars: number
  hotelType: string
  images: string[]
  lastUpdated: string
}

export function DebugDemoData() {
  const [demoData, setDemoData] = useState<DemoHotelListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/hotels.demo.json")
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setDemoData(data)
        console.log("Demo data loaded successfully:", data)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error"
        setError(errorMsg)
        console.error("Failed to load demo data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (process.env.NODE_ENV === "production") {
    return null // Don't show in production
  }

  return (
    <Card className="mb-8 border-2 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-yellow-800">🐛 Debug: Demo Data Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading demo data...</p>}
        {error && (
          <div className="text-red-600">
            <p>
              <strong>Error loading hotels.demo.json:</strong> {error}
            </p>
            <p className="text-sm mt-2">Check that the file exists at /public/hotels.demo.json</p>
          </div>
        )}
        {demoData.length > 0 && (
          <div>
            <p className="text-green-600 font-semibold mb-4">
              ✅ Successfully loaded {demoData.length} hotels from hotels.demo.json
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoData.slice(0, 2).map((hotel) => (
                <div key={hotel.id} className="border rounded p-3 bg-white">
                  <h4 className="font-semibold">{hotel.title}</h4>
                  <p className="text-sm text-gray-600">
                    {hotel.city} • {hotel.hotelType}
                  </p>
                  <p className="text-sm">Price: SAR {hotel.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">AI Score: {hotel.aiScore}</Badge>
                    <Badge variant="outline">IRR: {hotel.irr}%</Badge>
                    <Badge variant="outline">{hotel.stars} Stars</Badge>
                  </div>
                  {hotel.images[0] && (
                    <img
                      src={hotel.images[0] || "/placeholder.svg"}
                      alt={hotel.title}
                      className="w-full h-24 object-cover rounded mt-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(hotel.title)}`
                      }}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
