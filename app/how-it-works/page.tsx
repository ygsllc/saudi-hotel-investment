import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Brain, Users, HandshakeIcon, ArrowRight, Database, Shield, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "AI-Powered Investment Profiling",
      description:
        "Our intelligent questionnaire goes beyond basic filters. We analyze your risk tolerance, investment timeline, preferred ROI targets, and market preferences using machine learning to create a comprehensive investor profile that matches you with optimal Saudi hotel opportunities.",
      icon: Search,
      color: "text-emerald-600",
      details: [
        "Smart questionnaire adapts based on your responses",
        "Risk assessment using behavioral finance models",
        "Investment timeline optimization for Saudi market cycles",
        "Preference learning from similar investor profiles",
      ],
    },
    {
      number: "02",
      title: "Advanced AI Market Analysis",
      description:
        "Our proprietary AI engine processes 30+ real-time data points specific to Saudi Arabia's hotel market, including Vision 2030 project impacts, religious tourism patterns, business travel trends, and regional economic indicators to generate precise investment scores.",
      icon: Brain,
      color: "text-blue-600",
      details: [
        "Saudi Tourism Ministry visitor data & forecasts",
        "NEOM, Red Sea, AlUla development impact analysis",
        "Hajj & Umrah seasonal demand modeling",
        "Oil price correlation with business travel patterns",
        "Regional GDP growth and infrastructure development",
        "Competitive hotel supply analysis by city",
        "Average Daily Rate (ADR) trend prediction",
        "Occupancy rate forecasting using economic indicators",
      ],
    },
    {
      number: "03",
      title: "Local Expert Validation & Guidance",
      description:
        "Our AI recommendations are validated by Saudi market experts who provide legal compliance checks, cultural insights, and negotiation strategies. This human-AI collaboration ensures your investment aligns with local regulations and market realities.",
      icon: Users,
      color: "text-purple-600",
      details: [
        "SAGIA licensing and compliance verification",
        "Local partnership and JV structuring advice",
        "Cultural and religious considerations for hotel operations",
        "Government incentive program eligibility assessment",
      ],
    },
    {
      number: "04",
      title: "Success-Based Deal Execution",
      description:
        "Our platform tracks your investment through completion with AI-powered due diligence alerts, market condition updates, and performance monitoring. We only succeed when your deal closes successfully with optimal terms.",
      icon: HandshakeIcon,
      color: "text-orange-600",
      details: [
        "Automated due diligence checklist and alerts",
        "Real-time market condition impact assessment",
        "Performance benchmarking against similar investments",
        "Post-investment monitoring and optimization recommendations",
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            AI + Human Expertise
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Our Platform Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial screening to deal closure, our AI-powered platform combined with local expertise guides you
            through every step of your hotel investment journey in Saudi Arabia.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-start gap-12 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <Badge variant="outline">{step.number}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{step.description}</p>

                {/* Detailed breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index === 0 && (
                  <Button asChild>
                    <Link href="/investments">Start Your AI Analysis</Link>
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <Card className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                    <step.icon className={`h-16 w-16 ${step.color}`} />
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* AI Deep Dive Section */}
        <section className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Analyzes Saudi Hotel Investments</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI models process over 30 data points specific to Saudi Arabia's unique hotel market,
              combining government data, economic indicators, and tourism patterns to deliver unprecedented investment
              accuracy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-emerald-600" />
                  Saudi-Specific Data Sources
                </CardTitle>
                <CardDescription>Real-time integration with official Saudi government and tourism data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Government & Tourism Data</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Saudi Tourism Ministry visitor statistics & forecasts</li>
                      <li>• GASTAT economic indicators and population data</li>
                      <li>• SAGIA foreign investment tracking</li>
                      <li>• Vision 2030 project timeline and impact assessments</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Religious Tourism Intelligence</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Hajj and Umrah visitor patterns and growth trends</li>
                      <li>• Seasonal demand fluctuations in Mecca and Medina</li>
                      <li>• Religious event calendar impact on hotel demand</li>
                      <li>• Pilgrimage route hotel performance analytics</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Economic & Business Indicators</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Oil price correlation with business travel demand</li>
                      <li>• Regional GDP growth and corporate activity</li>
                      <li>• Infrastructure development project impacts</li>
                      <li>• Foreign direct investment flow patterns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                  AI Model Architecture
                </CardTitle>
                <CardDescription>
                  Multiple specialized AI models working together for comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Fair Market Value (FMV) Engine</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Analyzes comparable sales, revenue multiples, and Saudi-specific valuation factors
                    </p>
                    <div className="text-xs text-blue-600">Accuracy: 92% match with actual transaction values</div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-900 mb-2">Revenue Forecasting Model</h4>
                    <p className="text-sm text-emerald-700 mb-2">
                      Predicts ADR, occupancy rates, and seasonal patterns using economic indicators
                    </p>
                    <div className="text-xs text-emerald-600">
                      Forecasting horizon: 5-10 years with quarterly updates
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Risk Assessment Algorithm</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      Evaluates market volatility, regulatory changes, and competition risks
                    </p>
                    <div className="text-xs text-purple-600">
                      Risk scoring: 1-100 scale with Saudi market benchmarks
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Fraud Detection System</h4>
                    <p className="text-sm text-orange-700 mb-2">
                      Identifies listing anomalies, price manipulation, and duplicate properties
                    </p>
                    <div className="text-xs text-orange-600">
                      Detection rate: 98.5% accuracy in identifying fraudulent listings
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Points Visualization */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  30+ Data Points Analyzed in Real-Time
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Market Fundamentals</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Hotel occupancy rates by region</li>
                      <li>• Average Daily Rate (ADR) trends</li>
                      <li>• Revenue per Available Room (RevPAR)</li>
                      <li>• Competitive supply analysis</li>
                      <li>• Tourism arrival statistics</li>
                      <li>• Seasonal demand patterns</li>
                      <li>• Hotel star rating performance</li>
                      <li>• Brand vs independent performance</li>
                      <li>• New hotel supply pipeline</li>
                      <li>• Market penetration rates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Economic Indicators</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• GDP growth by region</li>
                      <li>• Oil price impact coefficients</li>
                      <li>• Foreign investment flows</li>
                      <li>• Infrastructure spending</li>
                      <li>• Employment rates</li>
                      <li>• Consumer spending patterns</li>
                      <li>• Currency exchange rates</li>
                      <li>• Inflation impact on operations</li>
                      <li>• Government budget allocations</li>
                      <li>• Business confidence indices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Saudi-Specific Factors</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Vision 2030 project impacts</li>
                      <li>• NEOM development progress</li>
                      <li>• Red Sea project milestones</li>
                      <li>• AlUla tourism development</li>
                      <li>• Hajj and Umrah visitor trends</li>
                      <li>• Entertainment sector growth</li>
                      <li>• Women's participation in tourism</li>
                      <li>• Cultural event calendar impacts</li>
                      <li>• Regulatory environment changes</li>
                      <li>• International airline connectivity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced Technology</h2>
            <p className="text-lg text-gray-600">
              Our platform combines multiple AI models and data sources for maximum accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Data Integration</CardTitle>
                <CardDescription>
                  Real-time data from Saudi Tourism Ministry, GASTAT, and major OTA platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Official government registries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">OTA booking data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">Market trend analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI Models</CardTitle>
                <CardDescription>
                  Multiple specialized models for valuation, forecasting, and fraud detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">FMV estimation engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Revenue forecasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Risk assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Security & Trust</CardTitle>
                <CardDescription>
                  Enterprise-grade security with transparent processes and data protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Data never sold or reused</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Secure cloud hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Fraud detection systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <Card className="p-12 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Our Platform?</h3>
              <p className="text-lg text-gray-600 mb-8">
                Start your free AI scan today and discover the best hotel investment opportunities in Saudi Arabia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/investments">
                    Start Free Scan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Schedule Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
