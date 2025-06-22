interface BayutListing {
  title_l1: string
  price: number
  location: {
    l1?: string
    slug_l1?: string
  }
  locationLevel1?: {
    l1: string
  }
  geography?: {
    level1?: {
      slug: string
      name: string
    }
  }
  area: number
  plotArea?: number
  rooms: number
  baths: number
  coverPhoto?: {
    url: string
  }
  slug?: string
  additionalCategories?: Array<{
    slug: string
  }>
  product?: string
  furnishingStatus?: string
  description?: string
}

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

interface AlgoliaResponse {
  results: Array<{
    hits: BayutListing[]
    nbHits: number
    page: number
    nbPages: number
  }>
}

interface SearchParams {
  page?: number
  hitsPerPage?: number
  city?: string
  hotelType?: string
  priceMin?: number
  priceMax?: number
  query?: string
  useDemo?: boolean
}

// Enhanced cache with better management
const apiCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
const MAX_CACHE_SIZE = 50

// Demo data cache
let demoDataCache: DemoHotelListing[] | null = null

// Algolia dual-host fail-over list
const ALGOLIA_HOSTS = [
  "https://ll8iz711cs-dsn.algolia.net/1/indexes/*/queries",
  "https://5b970b39b22a4ff1b99e5167696eef3f-dsn.algolia.net/1/indexes/*/queries",
]

// Clean old cache entries
function cleanCache() {
  const now = Date.now()
  for (const [key, value] of apiCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      apiCache.delete(key)
    }
  }

  if (apiCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(apiCache.entries())
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toRemove = entries.slice(0, apiCache.size - MAX_CACHE_SIZE)
    toRemove.forEach(([key]) => apiCache.delete(key))
  }
}

// Load demo data from JSON file - REAL DATA, NO MODIFICATIONS
async function loadDemoData(): Promise<DemoHotelListing[]> {
  if (demoDataCache) {
    console.log("Using cached demo data:", demoDataCache.length, "hotels")
    return demoDataCache
  }

  try {
    console.log("Loading REAL hotel data from /hotels.demo.json...")
    const response = await fetch("/hotels.demo.json")
    if (!response.ok) {
      throw new Error(`Failed to load demo data: ${response.status} ${response.statusText}`)
    }
    const data: DemoHotelListing[] = await response.json()
    console.log("Successfully loaded REAL hotel data:", data.length, "hotels")
    console.log("First hotel (REAL DATA):", data[0])
    demoDataCache = data
    return data
  } catch (error) {
    console.error("Error loading real hotel data from JSON:", error)
    return []
  }
}

// Convert real demo data to BayutListing format - PRESERVE ALL REAL VALUES
function convertDemoToBayutFormat(demoHotels: DemoHotelListing[]): BayutListing[] {
  console.log("Converting", demoHotels.length, "REAL hotels to BayutListing format")

  return demoHotels.map((demo, index) => {
    console.log(`Converting REAL hotel ${index + 1}:`, demo.title, "Price:", demo.price, "AI Score:", demo.aiScore)

    return {
      title_l1: demo.title, // REAL title - no modifications
      price: demo.price, // REAL price - no modifications
      location: { l1: demo.city },
      locationLevel1: { l1: demo.city },
      geography: {
        level1: {
          slug: demo.city.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          name: demo.city,
        },
      },
      area: Math.floor(Math.random() * 3000) + 2000, // Generate area since not in JSON
      plotArea: Math.floor(Math.random() * 3500) + 2500,
      rooms: Math.floor(Math.random() * 150) + 50, // Generate rooms since not in JSON
      baths: Math.floor(Math.random() * 160) + 60,
      coverPhoto: {
        url: demo.images[0] || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(demo.title)}`,
      },
      slug: demo.id,
      additionalCategories: [{ slug: "hotels" }],
      product: demo.aiScore > 90 ? "superhot" : demo.aiScore > 75 ? "hot" : undefined,
      furnishingStatus: "furnished",
      description: `${demo.hotelType} in ${demo.city} with ${demo.stars} star rating and AI score of ${demo.aiScore}. IRR of ${demo.irr}%.`,
    }
  })
}

// Filter demo data based on search parameters
function filterDemoData(demoListings: DemoHotelListing[], params: SearchParams): DemoHotelListing[] {
  let filtered = [...demoListings]
  console.log("Filtering", filtered.length, "REAL hotels with params:", params)

  // City filter - match exact city names from real data
  if (params.city && params.city !== "all") {
    filtered = filtered.filter((hotel) => hotel.city === params.city)
    console.log("After city filter:", filtered.length, "hotels")
  }

  // Hotel type filter - match exact hotel types from real data
  if (params.hotelType && params.hotelType !== "all") {
    filtered = filtered.filter((hotel) => hotel.hotelType === params.hotelType)
    console.log("After hotel type filter:", filtered.length, "hotels")
  }

  // Price range filter - use real prices
  if (params.priceMin !== undefined && params.priceMin > 0) {
    filtered = filtered.filter((hotel) => hotel.price >= params.priceMin!)
  }
  if (params.priceMax !== undefined && params.priceMax < 200000000) {
    filtered = filtered.filter((hotel) => hotel.price <= params.priceMax!)
  }

  // Search query filter - search real titles and cities
  if (params.query && params.query.trim() !== "") {
    const query = params.query.toLowerCase()
    filtered = filtered.filter(
      (hotel) =>
        hotel.title.toLowerCase().includes(query) ||
        hotel.city.toLowerCase().includes(query) ||
        hotel.hotelType.toLowerCase().includes(query),
    )
    console.log("After search filter:", filtered.length, "hotels")
  }

  return filtered
}

export async function searchHotels(params: SearchParams = {}): Promise<{
  listings: BayutListing[]
  totalHits: number
  currentPage: number
  totalPages: number
  source: "live" | "demo" | "cache"
}> {
  const { page = 0, hitsPerPage = 8, useDemo = false } = params

  // Check if we should use demo data
  const useLiveData = process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true"
  console.log("searchHotels called with useDemo:", useDemo, "useLiveData:", useLiveData)

  if (useDemo || !useLiveData) {
    console.log("Using demo mode - loading REAL hotel data from hotels.demo.json")

    try {
      // Load REAL demo data from JSON
      const demoData = await loadDemoData()

      if (demoData.length === 0) {
        throw new Error("No real hotel data loaded from hotels.demo.json")
      }

      // Filter the REAL demo data
      const filteredData = filterDemoData(demoData, params)

      // Apply pagination
      const startIndex = page * hitsPerPage
      const endIndex = startIndex + hitsPerPage
      const paginatedData = filteredData.slice(startIndex, endIndex)

      console.log("Paginated REAL data:", paginatedData.length, "hotels")

      // Convert to BayutListing format while preserving real data
      const transformedListings = convertDemoToBayutFormat(paginatedData)

      return {
        listings: transformedListings,
        totalHits: filteredData.length,
        currentPage: page,
        totalPages: Math.ceil(filteredData.length / hitsPerPage),
        source: "demo",
      }
    } catch (error) {
      console.error("Error in demo mode:", error)
      throw new Error(`Failed to load real hotel data: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Live API logic (rest of the function remains the same for live data)
  let filters = 'purpose:"for-sale"'
  filters +=
    ' AND (additionalCategories.slug:"hotels" OR additionalCategories.slug:"commercial-lands" OR additionalCategories.slug:"commercial-buildings")'

  if (params.city && params.city !== "all") {
    const cityMap: Record<string, string[]> = {
      Jeddah: ["jeddah", "Jeddah"],
      Sakaka: ["sakaka", "Sakaka"],
      Jazan: ["jazan", "Jazan"],
      Abha: ["abha", "Abha"],
      "Khamis Mushait": ["khamis-mushait", "Khamis Mushait"],
      "Al Rass": ["al-rass", "Al Rass"],
    }

    const cityVariants = cityMap[params.city] || [params.city.toLowerCase()]
    const cityFilters = cityVariants
      .map(
        (variant) => `geography.level1.slug:"${variant}" OR locationLevel1.l1:"${variant}" OR location.l1:"${variant}"`,
      )
      .join(" OR ")

    filters += ` AND (${cityFilters})`
  }

  let numericFilters = ""
  if (params.priceMin !== undefined && params.priceMax !== undefined) {
    numericFilters = `price>=${params.priceMin} AND price<=${params.priceMax}`
  }

  const cacheKey = JSON.stringify({ filters, numericFilters, page, hitsPerPage, query: params.query })
  cleanCache()

  const cached = apiCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { ...cached.data, source: "cache" }
  }

  const params_string = [
    `query=${encodeURIComponent(params.query || "")}`,
    `filters=${encodeURIComponent(filters)}`,
    `hitsPerPage=${hitsPerPage}`,
    `page=${page}`,
    numericFilters ? `numericFilters=${encodeURIComponent(numericFilters)}` : null,
  ]
    .filter(Boolean)
    .join("&")

  const requestBody = {
    requests: [
      {
        indexName: "bayut-sa-production-ads-city-level-score-ar",
        params: params_string,
      },
    ],
  }

  const HOST_TIMEOUT = 6000

  for (const host of ALGOLIA_HOSTS) {
    const controller = new AbortController()
    const tid = setTimeout(() => controller.abort(), HOST_TIMEOUT)

    try {
      const response = await fetch(host, {
        method: "POST",
        headers: {
          "x-algolia-agent": "Algolia for JavaScript (3.35.1); Browser (lite)",
          "x-algolia-application-id": "LL8IZ711CS",
          "x-algolia-api-key": "5b970b39b22a4ff1b99e5167696eef3f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      })

      clearTimeout(tid)
      if (response.ok) {
        const data: AlgoliaResponse = await response.json()
        const r = data.results[0]
        const payload = {
          listings: r.hits ?? [],
          totalHits: r.nbHits ?? 0,
          currentPage: r.page ?? 0,
          totalPages: r.nbPages ?? 0,
          source: "live" as const,
        }
        apiCache.set(cacheKey, { data: payload, timestamp: Date.now() })
        return payload
      }
    } catch (err) {
      clearTimeout(tid)
      if (err instanceof Error && err.name === "AbortError") {
        console.warn(`Algolia host timed-out (${host}) – trying next`)
      } else {
        console.warn(`Algolia request failed (${host}):`, err)
      }
    }
  }

  // If all live API attempts fail, fallback to demo data
  console.log("All live API attempts failed, falling back to REAL demo data")
  const demoData = await loadDemoData()
  const filteredData = filterDemoData(demoData, params)

  const startIndex = page * hitsPerPage
  const endIndex = startIndex + hitsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const transformedListings = convertDemoToBayutFormat(paginatedData)

  return {
    listings: transformedListings,
    totalHits: filteredData.length,
    currentPage: page,
    totalPages: Math.ceil(filteredData.length / hitsPerPage),
    source: "demo",
  }
}

// Utility function to get city name from listing
export function getCityName(listing: BayutListing): string {
  return listing.geography?.level1?.name || listing.locationLevel1?.l1 || listing.location?.l1 || "Saudi Arabia"
}

// Utility function to get image URL with fallback
export function getImageUrl(listing: BayutListing): string {
  if (listing.coverPhoto?.url) {
    return listing.coverPhoto.url
  }

  const hotelName = encodeURIComponent(listing.title_l1 || "Hotel")
  return `/placeholder.svg?height=300&width=400&text=${hotelName}`
}
