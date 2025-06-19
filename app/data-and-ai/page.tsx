import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Database,
  Brain,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
  AlertTriangle,
  Zap,
  Target,
  Clock,
} from "lucide-react"

export default function DataAndAIPage() {
  const dataSources = [
    {
      category: "Government & Official Data",
      icon: Shield,
      color: "text-emerald-600",
      sources: [
        "Saudi Tourism Ministry - Visitor statistics and forecasts",
        "GASTAT - Economic indicators and demographic data",
        "SAGIA - Foreign investment tracking and approvals",
        "Ministry of Municipal Affairs - Development permits",
        "Saudi Central Bank - Economic and financial data",
        "Vision 2030 Office - Project timelines and impacts",
      ],
    },
    {
      category: "Tourism & Hospitality Data",
      icon: Globe,
      color: "text-blue-600",
      sources: [
        "Booking.com - Pricing, availability, and demand patterns",
        "Expedia Group - Market penetration and booking trends",
        "Airbnb - Alternative accommodation competition",
        "TripAdvisor - Guest satisfaction and review analytics",
        "STR Global - Hotel performance benchmarking",
        "Religious Tourism Authority - Hajj and Umrah data",
      ],
    },
    {
      category: "Economic & Market Intelligence",
      icon: TrendingUp,
      color: "text-purple-600",
      sources: [
        "Bloomberg Terminal - Real-time financial data",
        "Reuters Economic Data - Market indicators",
        "Oxford Economics - GDP and growth forecasts",
        "IMF Saudi Arabia Reports - Economic outlook",
        "Local Real Estate Platforms - Property transactions",
        "Construction Industry Data - New supply pipeline",
      ],
    },
  ]

  const aiModels = [
    {
      name: "Fair Market Value (FMV) Engine",
      description: "Advanced valuation model specifically calibrated for Saudi hotel assets",
      accuracy: "92%",
      features: [
        "Comparable sales analysis with Saudi market adjustments",
        "Revenue multiple calculations by hotel category",
        "Location premium/discount factors",
        "Brand value impact assessment",
        "Regulatory compliance cost integration",
      ],
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      name: "Revenue Forecasting Model",
      description: "Predictive analytics for hotel revenue performance over 5-10 year horizons",
      accuracy: "87%",
      features: [
        "Seasonal demand pattern recognition",
        "Economic cycle impact modeling",
        "Tourism growth trajectory analysis",
        "Competitive supply impact assessment",
        "Vision 2030 project influence calculation",
      ],
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Risk Assessment Algorithm",
      description: "Comprehensive risk scoring system for Saudi hotel investments",
      accuracy: "94%",
      features: [
        "Market volatility analysis",
        "Regulatory change impact prediction",
        "Economic sensitivity modeling",
        "Competition threat assessment",
        "Operational risk evaluation",
      ],
      color: "bg-purple-50 border-purple-200",
    },
    {
      name: "Fraud Detection System",
      description: "Advanced anomaly detection to identify fraudulent listings and data",
      accuracy: "98.5%",
      features: [
        "Image hash comparison for duplicate listings",
        "Price anomaly detection algorithms",
        "Listing pattern analysis",
        "Document authenticity verification",
        "Seller credibility scoring",
      ],
      color: "bg-orange-50 border-orange-200",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Powered by Advanced AI
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Data Sources & AI Models</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the comprehensive data infrastructure and sophisticated AI models that power our Saudi hotel
            investment platform. Built on 3B+ data points with 92% valuation accuracy.
          </p>
        </div>

        {/* Key Stats */}
        <section className="mb-20">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-0">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">3B+</div>
                  <div className="text-gray-600">Data Points Processed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                  <div className="text-gray-600">Real-time Data Sources</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
                  <div className="text-gray-600">Valuation Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Real-time Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Sources */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Data Sources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform integrates with official Saudi government databases, international hospitality platforms, and
              economic data providers to ensure complete market coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {dataSources.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.sources.map((source, sourceIndex) => (
                      <li key={sourceIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{source}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Models */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Model Architecture</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four specialized AI models work together to provide comprehensive analysis of Saudi hotel investments,
              each optimized for specific aspects of the investment decision process.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {aiModels.map((model, index) => (
              <Card key={index} className={`${model.color} border-2`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{model.name}</CardTitle>
                    <Badge variant="secondary" className="bg-white">
                      {model.accuracy} Accuracy
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {model.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Processing Pipeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-time Data Processing Pipeline</h2>
            <p className="text-lg text-gray-600">
              Our advanced data infrastructure processes millions of data points daily to keep investment insights
              current
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Database className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Data Ingestion</h3>
                <p className="text-sm text-gray-600">Real-time APIs and scheduled data pulls from 30+ sources</p>
                <div className="mt-3 text-xs text-emerald-600 font-medium">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Every 15 minutes
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">AI Processing</h3>
                <p className="text-sm text-gray-600">Machine learning models analyze and score new data</p>
                <div className="mt-3 text-xs text-blue-600 font-medium">
                  <Zap className="h-3 w-3 inline mr-1" />
                  Sub-second response
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Control</h3>
                <p className="text-sm text-gray-600">Automated validation and fraud detection systems</p>
                <div className="mt-3 text-xs text-purple-600 font-medium">
                  <Target className="h-3 w-3 inline mr-1" />
                  99.2% accuracy
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Insights Delivery</h3>
                <p className="text-sm text-gray-600">Updated investment scores and recommendations</p>
                <div className="mt-3 text-xs text-orange-600 font-medium">
                  <ArrowRight className="h-3 w-3 inline mr-1" />
                  Instant updates
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accuracy Metrics */}
        <section className="mb-20">
          <Card className="bg-gray-50">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Accuracy Metrics</h2>
                <p className="text-lg text-gray-600">
                  Our AI models are continuously validated against real market outcomes in Saudi Arabia
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600 mb-1">Valuation Accuracy</div>
                  <div className="text-xs text-gray-500">vs. actual transaction prices</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600 mb-1">Revenue Forecast</div>
                  <div className="text-xs text-gray-500">12-month prediction accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600 mb-1">Risk Assessment</div>
                  <div className="text-xs text-gray-500">Correlation with actual outcomes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">98.5%</div>
                  <div className="text-sm text-gray-600 mb-1">Fraud Detection</div>
                  <div className="text-xs text-gray-500">False positive rate &lt; 1.5%</div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Badge variant="outline" className="text-sm">
                  Benchmarked against Dubai Land Department (DLD) transaction data
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Security & Privacy */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security & Privacy</h2>
            <p className="text-lg text-gray-600">
              Enterprise-grade security measures protect your data and investment information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>Your investment data is never sold, shared, or reused</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">GDPR compliant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Saudi data residency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Fraud Prevention</CardTitle>
                <CardDescription>Advanced systems to protect against fraudulent listings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Image verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Document authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Seller verification</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Infrastructure</CardTitle>
                <CardDescription>Secure, scalable cloud infrastructure with 99.9% uptime</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">AWS enterprise hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Automated backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">24/7 monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
            <CardContent>
              <h2 className="text-3xl font-bold mb-4">Experience Our AI-Powered Platform</h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                See how our advanced data and AI capabilities can help you make smarter hotel investment decisions in
                Saudi Arabia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/investments">
                    Try Our AI Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-emerald-600"
                  asChild
                >
                  <Link href="/contact">Schedule Technical Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
