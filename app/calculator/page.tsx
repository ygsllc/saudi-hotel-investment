"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Download, BarChart3, Target } from "lucide-react"

export default function CalculatorPage() {
  const [city, setCity] = useState("riyadh")
  const [hotelType, setHotelType] = useState("business")
  const [budget, setBudget] = useState("50000000")
  const [occupancy, setOccupancy] = useState([75])
  const [adr, setAdr] = useState("500")
  const [rooms, setRooms] = useState("150")
  const [managementFee, setManagementFee] = useState([8])
  const [capex, setCapex] = useState([15])

  // Calculations
  const budgetNum = Number.parseInt(budget) || 0
  const roomsNum = Number.parseInt(rooms) || 0
  const adrNum = Number.parseInt(adr) || 0
  const occupancyRate = occupancy[0] / 100
  const managementFeeRate = managementFee[0] / 100
  const capexRate = capex[0] / 100

  const annualRevenue = roomsNum * adrNum * 365 * occupancyRate
  const managementCost = annualRevenue * managementFeeRate
  const capexCost = budgetNum * capexRate
  const netOperatingIncome = annualRevenue - managementCost - capexCost
  const grossYield = (netOperatingIncome / budgetNum) * 100
  const irr = grossYield * 1.2 // Simplified IRR calculation
  const breakEvenYears = budgetNum / netOperatingIncome

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hotel Investment Calculator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate potential returns for your Saudi Arabia hotel investment. Adjust parameters to see real-time IRR,
            yield, and break-even analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Investment Parameters
              </CardTitle>
              <CardDescription>Enter your investment criteria to calculate potential returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">Riyadh</SelectItem>
                      <SelectItem value="jeddah">Jeddah</SelectItem>
                      <SelectItem value="neom">NEOM</SelectItem>
                      <SelectItem value="alula">AlUla</SelectItem>
                      <SelectItem value="dammam">Dammam</SelectItem>
                      <SelectItem value="red-sea">Red Sea Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hotel-type">Hotel Type</Label>
                  <Select value={hotelType} onValueChange={setHotelType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Hotel</SelectItem>
                      <SelectItem value="luxury">Luxury Resort</SelectItem>
                      <SelectItem value="boutique">Boutique Hotel</SelectItem>
                      <SelectItem value="beach">Beach Resort</SelectItem>
                      <SelectItem value="heritage">Heritage Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Financial Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Investment Budget (SAR)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="50,000,000"
                  />
                </div>
                <div>
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Input
                    id="rooms"
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adr">Average Daily Rate (SAR)</Label>
                <Input id="adr" type="number" value={adr} onChange={(e) => setAdr(e.target.value)} placeholder="500" />
              </div>

              {/* Sliders */}
              <div>
                <Label>Occupancy Rate: {occupancy[0]}%</Label>
                <Slider value={occupancy} onValueChange={setOccupancy} max={95} min={40} step={1} className="mt-2" />
              </div>

              <div>
                <Label>Management Fee: {managementFee[0]}%</Label>
                <Slider
                  value={managementFee}
                  onValueChange={setManagementFee}
                  max={15}
                  min={3}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Annual CapEx: {capex[0]}%</Label>
                <Slider value={capex} onValueChange={setCapex} max={25} min={5} step={1} className="mt-2" />
              </div>

              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600">{irr.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 mt-1">IRR</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{grossYield.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 mt-1">Gross Yield</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{breakEvenYears.toFixed(1)}</div>
                    <div className="text-sm text-gray-600 mt-1">Break-even (Years)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Annual Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Revenue</span>
                    <span className="font-semibold">SAR {annualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Management Fees</span>
                    <span className="font-semibold text-red-600">-SAR {managementCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CapEx</span>
                    <span className="font-semibold text-red-600">-SAR {capexCost.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Net Operating Income</span>
                    <span className="text-emerald-600">SAR {netOperatingIncome.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Performance</span>
                    <Badge variant="secondary">Above Average</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tourism Growth</span>
                    <Badge className="bg-emerald-600">+15% YoY</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Competition Level</span>
                    <Badge variant="outline">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Investment Risk</span>
                    <Badge className="bg-yellow-500">Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Hotel Data */}
            <Card>
              <CardHeader>
                <CardTitle>Try Example Data</CardTitle>
                <CardDescription>Load pre-configured examples to see different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBudget("45000000")
                      setRooms("180")
                      setAdr("450")
                      setOccupancy([78])
                      setCity("riyadh")
                      setHotelType("business")
                    }}
                  >
                    Riyadh Business
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBudget("120000000")
                      setRooms("250")
                      setAdr("1200")
                      setOccupancy([85])
                      setCity("neom")
                      setHotelType("luxury")
                    }}
                  >
                    NEOM Luxury
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBudget("28000000")
                      setRooms("85")
                      setAdr("380")
                      setOccupancy([72])
                      setCity("jeddah")
                      setHotelType("boutique")
                    }}
                  >
                    Jeddah Boutique
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBudget("85000000")
                      setRooms("200")
                      setAdr("950")
                      setOccupancy([82])
                      setCity("red-sea")
                      setHotelType("beach")
                    }}
                  >
                    Red Sea Resort
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-12 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Investment Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              This calculator provides estimates based on the parameters you input and should not be considered as
              investment advice. Actual returns may vary significantly based on market conditions, property management,
              economic factors, and other variables. Please consult with qualified financial advisors and conduct
              thorough due diligence before making any investment decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
