"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

// Hardcoded test hotel from your JSON structure
const testHotel = {
  id: "test-hotel-1",
  title: "Test Luxury Hotel in Riyadh",
  city: "Riyadh",
  price: 5500000,
  currency: "SAR",
  aiScore: 95,
  irr: 12.5,
  stars: 5,
  hotelType: "Luxury Resort",
  images: ["https://cdn.bayut.sa/test-image.webp"],
}

export function TestHotelCard() {
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <Card className="mb-8 border-2 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">🧪 Test: Hardcoded Hotel Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 border">
          <div className="aspect-video relative mb-4">
            <img
              src={testHotel.images[0] || "/placeholder.svg"}
              alt={testHotel.title}
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(testHotel.title)}`
              }}
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge className="bg-emerald-600">AI Score: {testHotel.aiScore}</Badge>
            </div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary">
                {Array.from({ length: testHotel.stars }, (_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </Badge>
            </div>
          </div>

          <h3 className="text-xl font-bold">{testHotel.title}</h3>
          <p className="text-gray-600">
            {testHotel.city} • {testHotel.hotelType}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">SAR {testHotel.price.toLocaleString()}</p>
          <p className="text-emerald-600 font-semibold">IRR: {testHotel.irr}%</p>
        </div>
      </CardContent>
    </Card>
  )
}
