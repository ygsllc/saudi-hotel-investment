import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Brain, TrendingUp, Users, Shield, MapPin, Calculator, BarChart3, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Powered by AI & Local Expertise
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              The Smartest Way to Invest in <span className="text-emerald-600">Saudi Hotels</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empower your investments with precision AI, transparent data, and guided human expertise. Make data-driven
              hotel investment decisions in Saudi Arabia's booming tourism market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/investments">
                  Start Your Free AI Scan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
            {/* New microcopy */}
            <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
              Powered by real-time property data from Bayut.sa and enhanced by AI investment scoring.
            </p>
          </div>
        </div>
      </section>

      {/* Value Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining cutting-edge AI technology with local market expertise to deliver unparalleled investment
              insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>AI Valuation Engine</CardTitle>
                <CardDescription>
                  Get hotel price precision with 30+ real-time data points and advanced machine learning models.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Yield Forecasting</CardTitle>
                <CardDescription>
                  Understand revenue potential, seasonality patterns, and investment risks with predictive analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Saudi Expertise</CardTitle>
                <CardDescription>
                  Work with verified local partners, advisors, and legal experts who understand the Saudi market.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Investors Worldwide</h2>
            <p className="text-lg text-gray-600">Backed by official data from Saudi Tourism & local registries</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">3B+</div>
              <div className="text-gray-600">Data Points Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-gray-600">Valuation Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100M</div>
              <div className="text-gray-600">Tourist Goal (Vision 2030)</div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <div className="font-semibold">Secure & Private</div>
                <div className="text-sm text-gray-600">Your data is never sold or reused</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">Local Insights</div>
                <div className="text-sm text-gray-600">NEOM, Red Sea, AlUla opportunities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">ROI Calculator</div>
                <div className="text-sm text-gray-600">Interactive investment simulation</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold">Real-time Data</div>
                <div className="text-sm text-gray-600">Live market updates & trends</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Hotel Investment Journey?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of investors who trust our AI-powered platform for their Saudi Arabia hotel investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/investments">
                Explore Investments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-emerald-600"
              asChild
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
