import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, MapPin, Users, Building2, Globe, Shield, CheckCircle, ArrowRight, Target } from "lucide-react"

export default function SaudiMarketPage() {
  const opportunities = [
    {
      name: "NEOM",
      description: "Futuristic megacity project with $500B investment",
      investment: "$500B",
      timeline: "2025-2030",
      focus: "Luxury tourism, tech innovation",
      icon: Globe,
      color: "text-blue-600",
    },
    {
      name: "Red Sea Project",
      description: "Luxury tourism destination on pristine coastline",
      investment: "$28B",
      timeline: "2023-2030",
      focus: "Ultra-luxury resorts, eco-tourism",
      icon: MapPin,
      color: "text-emerald-600",
    },
    {
      name: "AlUla",
      description: "UNESCO World Heritage site development",
      investment: "$15B",
      timeline: "2020-2035",
      focus: "Cultural tourism, heritage hotels",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      name: "Qiddiya",
      description: "Entertainment and sports mega-project",
      investment: "$58B",
      timeline: "2023-2030",
      focus: "Entertainment tourism, family resorts",
      icon: Target,
      color: "text-orange-600",
    },
  ]

  const investmentRules = [
    {
      category: "Foreign Ownership",
      rules: [
        "100% foreign ownership allowed in tourism sector",
        "No minimum capital requirements for hotel investments",
        "Streamlined licensing process through SAGIA",
      ],
    },
    {
      category: "Investment Models",
      rules: [
        "Full ownership of hotel properties",
        "Joint ventures with local partners",
        "Management contracts and leasing arrangements",
        "Franchise agreements with international brands",
      ],
    },
    {
      category: "Incentives",
      rules: [
        "10-year tax holidays for qualifying projects",
        "Reduced corporate tax rates (20%)",
        "Fast-track visa processing for investors",
        "Access to government funding programs",
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Vision 2030 Opportunity
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Saudi Arabia Hotel Market</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why Saudi Arabia is becoming the world's fastest-growing tourism destination and how Vision 2030 is
            creating unprecedented investment opportunities.
          </p>
        </div>

        {/* Why Saudi Arabia */}
        <section className="mb-20">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-0">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest in Saudi Hotels Now?</h2>
                <p className="text-lg text-gray-600">The Kingdom is transforming into a global tourism powerhouse</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">100M Tourist Goal</h3>
                  <p className="text-gray-600">
                    Vision 2030 targets 100 million annual visitors, up from 15 million in 2019
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">$1.6T Investment</h3>
                  <p className="text-gray-600">Massive infrastructure and tourism development investments planned</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Young Demographics</h3>
                  <p className="text-gray-600">70% of population under 35, driving domestic tourism growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Major Opportunities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Major Development Projects</h2>
            <p className="text-lg text-gray-600">Unprecedented mega-projects creating new tourism destinations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <opportunity.icon className={`h-6 w-6 ${opportunity.color}`} />
                    </div>
                    <div>
                      <CardTitle>{opportunity.name}</CardTitle>
                      <CardDescription>{opportunity.timeline}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Investment</div>
                      <div className="font-semibold">{opportunity.investment}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Focus</div>
                      <div className="font-semibold">{opportunity.focus}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    High Investment Potential
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Rules */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Foreign Investment Framework</h2>
            <p className="text-lg text-gray-600">
              Understanding the legal and regulatory landscape for hotel investments
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {investmentRules.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Statistics */}
        <section className="mb-20">
          <Card className="bg-gray-50">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Performance & Growth</h2>
                <p className="text-lg text-gray-600">Key statistics driving Saudi Arabia's tourism transformation</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">+127%</div>
                  <div className="text-gray-600">Tourism Growth (2019-2023)</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500K</div>
                  <div className="text-gray-600">New Hotel Rooms Needed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
                  <div className="text-gray-600">Average Occupancy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">SAR 850</div>
                  <div className="text-gray-600">Average Daily Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Regional Breakdown */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Regional Investment Hotspots</h2>
            <p className="text-lg text-gray-600">Strategic locations offering the highest investment potential</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Riyadh
                </CardTitle>
                <CardDescription>Capital & Business Hub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Size:</span>
                    <span className="font-semibold">Large</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-semibold text-emerald-600">+18% YoY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Focus:</span>
                    <span className="font-semibold">Business Hotels</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Jeddah
                </CardTitle>
                <CardDescription>Gateway to Mecca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Size:</span>
                    <span className="font-semibold">Large</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-semibold text-blue-600">+22% YoY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Focus:</span>
                    <span className="font-semibold">Religious Tourism</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Eastern Province
                </CardTitle>
                <CardDescription>Oil & Business Center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Size:</span>
                    <span className="font-semibold">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-semibold text-purple-600">+15% YoY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Focus:</span>
                    <span className="font-semibold">Corporate Travel</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
            <CardContent>
              <h2 className="text-3xl font-bold mb-4">Ready to Invest in Saudi Arabia's Tourism Boom?</h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Our AI-powered platform and local expertise can help you identify the best hotel investment
                opportunities in this rapidly growing market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/investments">
                    Explore Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-emerald-600"
                  asChild
                >
                  <Link href="/contact">Get Expert Consultation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
