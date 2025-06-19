"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Star, Download, Calendar, Filter, Search } from "lucide-react"

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Riyadh Business Hotel",
    location: "Riyadh, King Fahd District",
    score: 92,
    irr: "18.5%",
    yield: "12.3%",
    price: "SAR 45,000,000",
    priceUSD: "$12,000,000",
    type: "Business Hotel",
    stars: 4,
    rooms: 180,
    occupancy: "78%",
    adr: "SAR 450",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "NEOM Luxury Resort",
    location: "NEOM, Tabuk Province",
    score: 96,
    irr: "22.1%",
    yield: "15.7%",
    price: "SAR 120,000,000",
    priceUSD: "$32,000,000",
    type: "Luxury Resort",
    stars: 5,
    rooms: 250,
    occupancy: "85%",
    adr: "SAR 1,200",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Jeddah Boutique Hotel",
    location: "Jeddah, Al Balad Historic District",
    score: 88,
    irr: "16.8%",
    yield: "11.2%",
    price: "SAR 28,000,000",
    priceUSD: "$7,500,000",
    type: "Boutique Hotel",
    stars: 4,
    rooms: 85,
    occupancy: "72%",
    adr: "SAR 380",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Red Sea Beachfront Resort",
    location: "Red Sea Project, Tabuk",
    score: 94,
    irr: "20.3%",
    yield: "14.1%",
    price: "SAR 85,000,000",
    priceUSD: "$22,700,000",
    type: "Beach Resort",
    stars: 5,
    rooms: 200,
    occupancy: "82%",
    adr: "SAR 950",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "AlUla Heritage Hotel",
    location: "AlUla, Medina Province",
    score: 90,
    irr: "19.2%",
    yield: "13.5%",
    price: "SAR 65,000,000",
    priceUSD: "$17,300,000",
    type: "Heritage Hotel",
    stars: 4,
    rooms: 120,
    occupancy: "76%",
    adr: "SAR 680",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Dammam Executive Suites",
    location: "Dammam, Eastern Province",
    score: 85,
    irr: "15.4%",
    yield: "10.8%",
    price: "SAR 35,000,000",
    priceUSD: "$9,300,000",
    type: "Executive Suites",
    stars: 4,
    rooms: 150,
    occupancy: "70%",
    adr: "SAR 420",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function InvestmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 150000000])
  const [minIRR, setMinIRR] = useState([0])

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === "all" || hotel.location.includes(selectedCity)
    const matchesType = selectedType === "all" || hotel.type === selectedType
    const priceInSAR = Number.parseInt(hotel.price.replace(/[^\d]/g, ""))
    const matchesPrice = priceInSAR >= priceRange[0] && priceInSAR <= priceRange[1]
    const irrValue = Number.parseFloat(hotel.irr.replace("%", ""))
    const matchesIRR = irrValue >= minIRR[0]

    return matchesSearch && matchesCity && matchesType && matchesPrice && matchesIRR
  })

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hotel Investment Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover AI-scored hotel investments across Saudi Arabia's most promising markets. Each property is analyzed
            using 30+ data points for maximum investment confidence.
          </p>
        </div>

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
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="NEOM">NEOM</SelectItem>
                    <SelectItem value="AlUla">AlUla</SelectItem>
                    <SelectItem value="Dammam">Dammam</SelectItem>
                    <SelectItem value="Red Sea">Red Sea Project</SelectItem>
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
                    <SelectItem value="Business Hotel">Business Hotel</SelectItem>
                    <SelectItem value="Luxury Resort">Luxury Resort</SelectItem>
                    <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
                    <SelectItem value="Beach Resort">Beach Resort</SelectItem>
                    <SelectItem value="Heritage Hotel">Heritage Hotel</SelectItem>
                    <SelectItem value="Executive Suites">Executive Suites</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Min IRR: {minIRR[0]}%</label>
                <Slider value={minIRR} onValueChange={setMinIRR} max={25} min={0} step={1} className="mt-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range: SAR {(priceRange[0] / 1000000).toFixed(1)}M - SAR {(priceRange[1] / 1000000).toFixed(1)}M
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={150000000}
                min={0}
                step={5000000}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredHotels.length} of {hotels.length} properties
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600">AI Score: {hotel.score}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">
                    {Array.from({ length: hotel.stars }, (_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{hotel.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {hotel.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{hotel.type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{hotel.irr}</div>
                    <div className="text-sm text-gray-600">IRR</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{hotel.yield}</div>
                    <div className="text-sm text-gray-600">Yield</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <div className="font-medium">{hotel.rooms}</div>
                    <div className="text-gray-600">Rooms</div>
                  </div>
                  <div>
                    <div className="font-medium">{hotel.occupancy}</div>
                    <div className="text-gray-600">Occupancy</div>
                  </div>
                  <div>
                    <div className="font-medium">{hotel.adr}</div>
                    <div className="text-gray-600">ADR</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{hotel.price}</div>
                    <div className="text-sm text-gray-600">{hotel.priceUSD}</div>
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
