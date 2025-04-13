"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Search, Send, Zap, RefreshCw, Settings, ArrowRight, Plus } from "lucide-react"

export default function EmailServicesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("available-services")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      id: "verification",
      name: "Email Verification",
      icon: CheckCircle,
      iconColor: "text-green-500",
      description: "Verify email addresses for validity and deliverability",
      availableCredits: 8500,
      usedCredits: 1500,
      totalCredits: 10000,
      active: true,
      detailedDescription: "Verify email addresses for validity, deliverability, and detect risky emails.",
      plan: "Professional Plan",
    },
    {
      id: "finder",
      name: "Email Finder",
      icon: Search,
      iconColor: "text-blue-500",
      description: "Find professional email addresses based on criteria",
      availableCredits: 5200,
      usedCredits: 4800,
      totalCredits: 10000,
      active: true,
      detailedDescription: "Find professional email addresses based on names, companies, and other criteria.",
      plan: "Professional Plan",
    },
    {
      id: "sender",
      name: "Email Sender",
      icon: Send,
      iconColor: "text-purple-500",
      description: "Send personalized cold emails with tracking",
      availableCredits: 3800,
      usedCredits: 6200,
      totalCredits: 10000,
      active: true,
      detailedDescription: "Send personalized cold emails with tracking and automated follow-ups.",
      plan: "Professional Plan",
    },
    {
      id: "all-in-one",
      name: "All-in-One Campaign",
      icon: Zap,
      iconColor: "text-amber-500",
      description: "Find, verify, and send emails in one workflow",
      availableCredits: 2500,
      usedCredits: 7500,
      totalCredits: 10000,
      active: true,
      detailedDescription: "Find, verify, and send emails in one automated workflow for maximum efficiency.",
      plan: "Professional Plan",
    },
  ]

  const additionalServices = [
    {
      id: "warmup",
      name: "Email Warmup Service",
      icon: CheckCircle,
      description: "Gradually build your sender reputation to improve deliverability.",
      plan: "Enterprise Plan",
      needsUpgrade: true,
    },
    {
      id: "enrichment",
      name: "Email Enrichment Service",
      icon: Search,
      description: "Enrich your contact data with additional information like job titles, social profiles, etc.",
      plan: "Enterprise Plan",
      needsUpgrade: true,
    },
  ]

  const getActionButton = (service) => {
    switch (service.id) {
      case "verification":
        return (
          <Button variant="outline" onClick={() => router.push("/dashboard/verify")}>
            Verify Emails
          </Button>
        )
      case "finder":
        return (
          <Button variant="outline" onClick={() => router.push("/dashboard/finder")}>
            Find Emails
          </Button>
        )
      case "sender":
        return (
          <Button variant="outline" onClick={() => router.push("/dashboard/sender")}>
            Send Emails
          </Button>
        )
      case "all-in-one":
        return (
          <Button variant="outline" onClick={() => router.push("/dashboard/campaign")}>
            Create Campaign
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Email Services</h1>
          <p className="text-gray-500">Manage your email marketing services and credits</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh Credits
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Credits
          </Button>
        </div>
      </div>

      {/* Service Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service) => (
            <Card key={service.id} className="border rounded-lg overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <service.icon className={`h-5 w-5 mr-2 ${service.iconColor}`} />
                    <h3 className="font-bold">{service.name}</h3>
                  </div>
                  {service.active && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Active</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Available Credits</span>
                    <span className="font-medium">{service.availableCredits.toLocaleString()}</span>
                  </div>
                  <Progress value={(service.usedCredits / service.totalCredits) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Used: {service.usedCredits.toLocaleString()}</span>
                    <span>Total: {service.totalCredits.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Plan Limit</span>
                  <span className="font-medium">{service.totalCredits.toLocaleString()} credits/month</span>
                </div>

                <div className="flex justify-between gap-2">
                  {getActionButton(service)}
                  <Button>Add Credits</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="mb-6 bg-gray-100 p-1 rounded-md">
          <TabsTrigger
            value="available-services"
            className="rounded data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Available Services
          </TabsTrigger>
          <TabsTrigger
            value="add-new-service"
            className="rounded data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Add New Service
          </TabsTrigger>
          <TabsTrigger
            value="credit-history"
            className="rounded data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Credit History
          </TabsTrigger>
        </TabsList>

        {activeTab === "available-services" && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Your Active Services</h2>
            <p className="text-gray-500 mb-6">Overview of your current email marketing services</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-5">
                  <div className="flex items-center mb-2">
                    <service.icon className={`h-5 w-5 mr-2 ${service.iconColor}`} />
                    <h3 className="font-medium">{service.name} Service</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.detailedDescription}</p>
                  <div className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full inline-block mb-4">
                    {service.plan}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-sm flex items-center">
                      Use Service
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "add-new-service" && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-2">Add New Service</h2>
            <p className="text-gray-500 mb-6">Expand your email marketing capabilities with additional services</p>

            <div className="bg-gray-50 border rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Professional Plan</h3>
              </div>
              <p className="text-sm ml-7">
                You already have access to all services with your Professional plan.
                <span className="text-primary font-medium"> Upgrade to Enterprise</span> for additional features and
                higher limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalServices.map((service) => (
                <div key={service.id} className="border rounded-lg p-5">
                  <div className="flex items-center mb-2">
                    <service.icon className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">{service.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full inline-block mb-4">
                    {service.plan}
                  </div>
                  <Button variant="outline" className="w-full">
                    Upgrade to Access
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Enterprise
              </Button>
            </div>
          </div>
        )}

        {activeTab === "credit-history" && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Credit History</h2>
            <p className="text-gray-500 mb-6">View your credit usage and purchase history</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 border-b">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 border-b">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 border-b">Transaction</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 border-b">Credits</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 border-b">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Jun 15, 2023</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Email Verification</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Credit Purchase</td>
                    <td className="py-3 px-4 text-green-600">+5,000</td>
                    <td className="py-3 px-4">8,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Jun 12, 2023</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-blue-500 mr-2" />
                        <span>Email Finder</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Usage</td>
                    <td className="py-3 px-4 text-red-600">-1,200</td>
                    <td className="py-3 px-4">3,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Jun 10, 2023</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Send className="h-4 w-4 text-purple-500 mr-2" />
                        <span>Email Sender</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Usage</td>
                    <td className="py-3 px-4 text-red-600">-800</td>
                    <td className="py-3 px-4">4,700</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Jun 5, 2023</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-amber-500 mr-2" />
                        <span>All-in-One Campaign</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Credit Purchase</td>
                    <td className="py-3 px-4 text-green-600">+2,000</td>
                    <td className="py-3 px-4">5,500</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Jun 1, 2023</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Email Verification</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Monthly Renewal</td>
                    <td className="py-3 px-4 text-green-600">+10,000</td>
                    <td className="py-3 px-4">3,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  )
}
