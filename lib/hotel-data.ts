export interface HotelListing {
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

let hotelDataCache: HotelListing[] | null = null

export async function loadHotelData(): Promise<HotelListing[]> {
  if (hotelDataCache) {
    return hotelDataCache
  }

  try {
    const response = await fetch("/hotels.demo.json")
    if (!response.ok) {
      throw new Error(`Failed to load hotel data: ${response.status}`)
    }
    const data: HotelListing[] = await response.json()
    hotelDataCache = data
    return data
  } catch (error) {
    console.error("Error loading hotel data:", error)
    return []
  }
}

export function getUniqueValues<K extends keyof HotelListing>(hotels: HotelListing[], field: K): HotelListing[K][] {
  const values = hotels.map((hotel) => hotel[field])
  return Array.from(new Set(values)).sort()
}

export function filterHotels(
  hotels: HotelListing[],
  filters: {
    city?: string
    hotelType?: string
    minPrice?: number
    maxPrice?: number
    minIRR?: number
    maxIRR?: number
    minAIScore?: number
    maxAIScore?: number
    minStars?: number
    maxStars?: number
    searchQuery?: string
  },
): HotelListing[] {
  return hotels.filter((hotel) => {
    // City filter
    if (filters.city && filters.city !== "all" && hotel.city !== filters.city) {
      return false
    }

    // Hotel type filter
    if (filters.hotelType && filters.hotelType !== "all" && hotel.hotelType !== filters.hotelType) {
      return false
    }

    // Price range
    if (filters.minPrice !== undefined && hotel.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && hotel.price > filters.maxPrice) {
      return false
    }

    // IRR range
    if (filters.minIRR !== undefined && hotel.irr < filters.minIRR) {
      return false
    }
    if (filters.maxIRR !== undefined && hotel.irr > filters.maxIRR) {
      return false
    }

    // AI Score range
    if (filters.minAIScore !== undefined && hotel.aiScore < filters.minAIScore) {
      return false
    }
    if (filters.maxAIScore !== undefined && hotel.aiScore > filters.maxAIScore) {
      return false
    }

    // Stars range
    if (filters.minStars !== undefined && hotel.stars < filters.minStars) {
      return false
    }
    if (filters.maxStars !== undefined && hotel.stars > filters.maxStars) {
      return false
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = `${hotel.title} ${hotel.city} ${hotel.hotelType}`.toLowerCase()
      if (!searchableText.includes(query)) {
        return false
      }
    }

    return true
  })
}

export function scoreHotelMatch(
  hotel: HotelListing,
  criteria: {
    preferredCity?: string
    preferredType?: string
    budgetRange?: [number, number]
    targetIRR?: number
    riskTolerance?: "low" | "medium" | "high"
  },
): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // City preference
  if (criteria.preferredCity && hotel.city.toLowerCase().includes(criteria.preferredCity.toLowerCase())) {
    score += 25
    reasons.push("Preferred location")
  }

  // Hotel type preference
  if (criteria.preferredType && hotel.hotelType.toLowerCase().includes(criteria.preferredType.toLowerCase())) {
    score += 20
    reasons.push("Matching hotel type")
  }

  // Budget fit
  if (criteria.budgetRange) {
    const [minBudget, maxBudget] = criteria.budgetRange
    if (hotel.price >= minBudget && hotel.price <= maxBudget) {
      score += 30
      reasons.push("Within budget")
    }
  }

  // IRR target
  if (criteria.targetIRR && hotel.irr >= criteria.targetIRR) {
    score += 25
    reasons.push("Meets IRR target")
  }

  // Risk tolerance alignment
  if (criteria.riskTolerance) {
    if (criteria.riskTolerance === "low" && hotel.aiScore >= 70) {
      score += 15
      reasons.push("Low risk profile")
    } else if (criteria.riskTolerance === "medium" && hotel.aiScore >= 60) {
      score += 10
      reasons.push("Moderate risk profile")
    } else if (criteria.riskTolerance === "high") {
      score += 5
      reasons.push("High growth potential")
    }
  }

  // Base score for any hotel
  if (score === 0) {
    score = 10
    reasons.push("General match")
  }

  return { score, reasons }
}
