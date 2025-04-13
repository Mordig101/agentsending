"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronDown,
  Download,
  FileText,
  LineChart,
  Mail,
  PieChart,
  RefreshCw,
  Search,
  Send,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for charts
// In a real application, you would use a charting library like recharts, chart.js, etc.
// For this example, we'll create placeholder components

const LineChartPlaceholder = ({ title, height = 200 }: { title: string; height?: number }) => (
  <div className="w-full" style={{ height: `${height}px` }}>
    <div className="flex items-center justify-center h-full border rounded-md bg-muted/20">
      <div className="text-center">
        <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">Line chart visualization</p>
      </div>
    </div>
  </div>
)

const BarChartPlaceholder = ({ title, height = 200 }: { title: string; height?: number }) => (
  <div className="w-full" style={{ height: `${height}px` }}>
    <div className="flex items-center justify-center h-full border rounded-md bg-muted/20">
      <div className="text-center">
        <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">Bar chart visualization</p>
      </div>
    </div>
  </div>
)

const PieChartPlaceholder = ({ title, height = 200 }: { title: string; height?: number }) => (
  <div className="w-full" style={{ height: `${height}px` }}>
    <div className="flex items-center justify-center h-full border rounded-md bg-muted/20">
      <div className="text-center">
        <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">Pie chart visualization</p>
      </div>
    </div>
  </div>
)

export default function StatisticsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState("last30days")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock statistics data
  const [stats, setStats] = useState({
    overview: {
      totalCreditsUsed: 12450,
      totalEmailsProcessed: 28750,
      successRate: 92.5,
      activeServices: 3,
      creditUsageByService: [
        { service: "finder", credits: 4250, percentage: 34.1 },
        { service: "verifier", credits: 6800, percentage: 54.6 },
        { service: "sender", credits: 1400, percentage: 11.3 },
      ],
      dailyUsage: Array(30)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          finder: Math.floor(Math.random() * 200) + 50,
          verifier: Math.floor(Math.random() * 300) + 100,
          sender: Math.floor(Math.random() * 100) + 20,
        })),
      monthlyTrends: Array(12)
        .fill(0)
        .map((_, i) => ({
          month: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
          credits: Math.floor(Math.random() * 1500) + 500,
        })),
      topCampaigns: [
        { name: "Q2 Newsletter", service: "sender", emails: 1250, openRate: 42.5, clickRate: 12.8 },
        { name: "Product Launch", service: "sender", emails: 850, openRate: 38.2, clickRate: 10.5 },
        { name: "Tech Companies", service: "finder", emails: 1500, successRate: 94.2 },
        { name: "Marketing List", service: "verifier", emails: 2200, validRate: 91.8 },
      ],
    },
    finder: {
      totalSearches: 245,
      totalEmailsFound: 8750,
      averageFoundPerSearch: 35.7,
      successRate: 89.2,
      searchesByType: [
        { type: "Name + Company", count: 120, percentage: 49.0 },
        { type: "Domain Search", count: 85, percentage: 34.7 },
        { type: "LinkedIn Profile", count: 40, percentage: 16.3 },
      ],
      searchesByIndustry: [
        { industry: "Technology", count: 85, percentage: 34.7 },
        { industry: "Healthcare", count: 52, percentage: 21.2 },
        { industry: "Finance", count: 38, percentage: 15.5 },
        { industry: "Education", count: 25, percentage: 10.2 },
        { industry: "Retail", count: 20, percentage: 8.2 },
        { industry: "Other", count: 25, percentage: 10.2 },
      ],
      confidenceDistribution: [
        { range: "90-100%", count: 3250, percentage: 37.1 },
        { range: "80-89%", count: 2800, percentage: 32.0 },
        { range: "70-79%", count: 1500, percentage: 17.1 },
        { range: "60-69%", count: 850, percentage: 9.7 },
        { range: "Below 60%", count: 350, percentage: 4.0 },
      ],
      dailySearches: Array(30)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          searches: Math.floor(Math.random() * 15) + 5,
          emailsFound: Math.floor(Math.random() * 400) + 100,
        })),
      topSearches: [
        { query: "Tech Companies in California", emails: 450, date: "2023-06-10" },
        { query: "Healthcare Executives", emails: 320, date: "2023-06-05" },
        { query: "Marketing Directors", emails: 280, date: "2023-05-28" },
        { query: "Financial Advisors", emails: 210, date: "2023-05-20" },
        { query: "University Professors", emails: 180, date: "2023-05-15" },
      ],
    },
    verifier: {
      totalVerifications: 320,
      totalEmailsVerified: 15200,
      validEmails: 13950,
      invalidEmails: 1250,
      validRate: 91.8,
      verificationsByType: [
        { type: "Bulk Upload", count: 180, percentage: 56.3 },
        { type: "API Integration", count: 95, percentage: 29.7 },
        { type: "Single Verification", count: 45, percentage: 14.1 },
      ],
      errorBreakdown: [
        { type: "Invalid Syntax", count: 120, percentage: 9.6 },
        { type: "Domain Not Found", count: 350, percentage: 28.0 },
        { type: "Mailbox Not Found", count: 580, percentage: 46.4 },
        { type: "Catch-All Domain", count: 150, percentage: 12.0 },
        { type: "Other Errors", count: 50, percentage: 4.0 },
      ],
      dailyVerifications: Array(30)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          emails: Math.floor(Math.random() * 800) + 200,
          valid: Math.floor(Math.random() * 700) + 180,
          invalid: Math.floor(Math.random() * 100) + 20,
        })),
      topVerifications: [
        { name: "Marketing List June 2023", emails: 2500, validRate: 93.2, date: "2023-06-12" },
        { name: "Newsletter Subscribers", emails: 1800, validRate: 89.5, date: "2023-06-05" },
        { name: "Sales Prospects Q2", emails: 1500, validRate: 92.1, date: "2023-05-28" },
        { name: "Event Attendees", emails: 1200, validRate: 94.8, date: "2023-05-20" },
        { name: "Webinar Registrants", emails: 950, validRate: 90.5, date: "2023-05-15" },
      ],
    },
    sender: {
      totalCampaigns: 28,
      totalEmailsSent: 4800,
      deliveredEmails: 4650,
      openedEmails: 2050,
      clickedEmails: 580,
      repliedEmails: 320,
      deliveryRate: 96.9,
      openRate: 44.1,
      clickRate: 12.5,
      replyRate: 6.9,
      campaignsByType: [
        { type: "Newsletter", count: 12, percentage: 42.9 },
        { type: "Cold Outreach", count: 8, percentage: 28.6 },
        { type: "Follow-up", count: 5, percentage: 17.9 },
        { type: "Event Invitation", count: 3, percentage: 10.7 },
      ],
      deviceBreakdown: [
        { device: "Desktop", opens: 1230, percentage: 60.0 },
        { device: "Mobile", opens: 720, percentage: 35.1 },
        { device: "Tablet", opens: 100, percentage: 4.9 },
      ],
      dailySends: Array(30)
        .fill(0)
        .map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          sent: Math.floor(Math.random() * 300) + 50,
          opened: Math.floor(Math.random() * 150) + 20,
          clicked: Math.floor(Math.random() * 50) + 5,
        })),
      topCampaigns: [
        { name: "Q2 Newsletter", emails: 1250, openRate: 42.5, clickRate: 12.8, date: "2023-06-10" },
        { name: "Product Launch", emails: 850, openRate: 38.2, clickRate: 10.5, date: "2023-06-05" },
        { name: "Follow-up Sequence", emails: 650, openRate: 51.2, clickRate: 15.4, date: "2023-05-28" },
        { name: "Webinar Invitation", emails: 550, openRate: 46.8, clickRate: 14.2, date: "2023-05-20" },
        { name: "Customer Feedback", emails: 450, openRate: 39.5, clickRate: 8.7, date: "2023-05-15" },
      ],
      sendingTimeAnalysis: [
        { day: "Monday", openRate: 42.5 },
        { day: "Tuesday", openRate: 45.8 },
        { day: "Wednesday", openRate: 47.2 },
        { day: "Thursday", openRate: 43.1 },
        { day: "Friday", openRate: 38.5 },
        { day: "Saturday", openRate: 32.4 },
        { day: "Sunday", openRate: 35.7 },
      ],
      sendingHourAnalysis: Array(24)
        .fill(0)
        .map((_, i) => ({
          hour: i,
          openRate: 30 + Math.sin((i - 8) * 0.5) * 20,
        })),
    },
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    // In a real application, you would fetch new data based on the date range
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case "finder":
        return <Search className="h-5 w-5 text-blue-500" />
      case "verifier":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "sender":
        return <Send className="h-5 w-5 text-purple-500" />
      default:
        return <Mail className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Statistics & Analytics</h1>
          <p className="text-gray-500">Detailed insights into your email marketing performance</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-[180px] justify-between">
                {dateRange === "last7days" && "Last 7 Days"}
                {dateRange === "last30days" && "Last 30 Days"}
                {dateRange === "last90days" && "Last 90 Days"}
                {dateRange === "thisyear" && "This Year"}
                {dateRange === "custom" && "Custom Range"}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0" align="end">
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handleDateRangeChange("last7days")}
                >
                  Last 7 Days
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handleDateRangeChange("last30days")}
                >
                  Last 30 Days
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handleDateRangeChange("last90days")}
                >
                  Last 90 Days
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handleDateRangeChange("thisyear")}
                >
                  This Year
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-normal"
                  onClick={() => handleDateRangeChange("custom")}
                >
                  Custom Range
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={() => setIsLoading(true)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="finder">Email Finder</TabsTrigger>
          <TabsTrigger value="verifier">Email Verification</TabsTrigger>
          <TabsTrigger value="sender">Email Sender</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Credits Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.overview.totalCreditsUsed.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Across all services</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Credit Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.3</div>
                <p className="text-xs text-gray-500 mt-1">Emails per credit</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Emails Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.overview.totalEmailsProcessed.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Total emails handled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.overview.successRate}%</div>
                <p className="text-xs text-gray-500 mt-1">Average across all services</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.overview.activeServices}</div>
                <p className="text-xs text-gray-500 mt-1">Services in use</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Usage</CardTitle>
                <CardDescription>Credits used per day across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartPlaceholder title="Daily Credits Usage" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit Usage by Service</CardTitle>
                <CardDescription>Distribution across services</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartPlaceholder title="Service Distribution" height={300} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Credit usage over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartPlaceholder title="Monthly Credits Usage" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>Success rates by service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium">Email Finder</span>
                      </div>
                      <span className="text-sm font-medium">89.2%</span>
                    </div>
                    <Progress value={89.2} className="h-2" />
                    <p className="text-xs text-gray-500">8,750 emails found out of 9,810 searches</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium">Email Verification</span>
                      </div>
                      <span className="text-sm font-medium">91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                    <p className="text-xs text-gray-500">13,950 valid emails out of 15,200 verified</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Send className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="font-medium">Email Sender</span>
                      </div>
                      <span className="text-sm font-medium">96.9%</span>
                    </div>
                    <Progress value={96.9} className="h-2" />
                    <p className="text-xs text-gray-500">4,650 delivered emails out of 4,800 sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>Return on investment by service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium">Email Finder</span>
                      </div>
                      <span className="text-sm font-medium">3.2x ROI</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-gray-500">$3.20 value generated per $1 spent</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium">Email Verification</span>
                      </div>
                      <span className="text-sm font-medium">4.5x ROI</span>
                    </div>
                    <Progress value={90} className="h-2" />
                    <p className="text-xs text-gray-500">$4.50 value generated per $1 spent</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Send className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="font-medium">Email Sender</span>
                      </div>
                      <span className="text-sm font-medium">5.8x ROI</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <p className="text-xs text-gray-500">$5.80 value generated per $1 spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Your most successful campaigns across all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Campaign Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Service</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Emails</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.overview.topCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{campaign.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {getServiceIcon(campaign.service)}
                            <span className="ml-2 capitalize">{campaign.service}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{campaign.emails.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {campaign.service === "sender" && (
                            <div>
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {campaign.openRate}% Open Rate
                              </Badge>
                              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                                {campaign.clickRate}% Click Rate
                              </Badge>
                            </div>
                          )}
                          {campaign.service === "finder" && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {campaign.successRate}% Success Rate
                            </Badge>
                          )}
                          {campaign.service === "verifier" && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {campaign.validRate}% Valid Rate
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Finder Tab */}
        <TabsContent value="finder">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.finder.totalSearches.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Search operations performed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Emails Found</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.finder.totalEmailsFound.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Total discovered emails</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. per Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.finder.averageFoundPerSearch}</div>
                <p className="text-xs text-gray-500 mt-1">Average emails per search</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.finder.successRate}%</div>
                <p className="text-xs text-gray-500 mt-1">Searches with results</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87.3%</div>
                <p className="text-xs text-gray-500 mt-1">Average confidence score</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Search Activity</CardTitle>
                <CardDescription>Searches and emails found per day</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartPlaceholder title="Daily Search Activity" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Search Types</CardTitle>
                <CardDescription>Distribution by search method</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartPlaceholder title="Search Types" height={300} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>Searches by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartPlaceholder title="Industry Distribution" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Confidence Distribution</CardTitle>
                <CardDescription>Email confidence score ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.finder.confidenceDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.range}</span>
                        <span className="text-sm">
                          {item.count.toLocaleString()} emails ({item.percentage}%)
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Search Performance by Domain</CardTitle>
                <CardDescription>Success rates across different domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Gmail.com</span>
                      <span className="text-sm">92.5% success rate</span>
                    </div>
                    <Progress value={92.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Outlook.com</span>
                      <span className="text-sm">88.7% success rate</span>
                    </div>
                    <Progress value={88.7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Yahoo.com</span>
                      <span className="text-sm">85.2% success rate</span>
                    </div>
                    <Progress value={85.2} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Corporate Domains</span>
                      <span className="text-sm">94.1% success rate</span>
                    </div>
                    <Progress value={94.1} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Educational Domains</span>
                      <span className="text-sm">91.8% success rate</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Searches</CardTitle>
              <CardDescription>Your most successful email finder searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Search Query</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Emails Found</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.finder.topSearches.map((search, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{search.query}</td>
                        <td className="py-3 px-4">{formatDate(search.date)}</td>
                        <td className="py-3 px-4">{search.emails.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify Emails
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Search Pattern Analysis</CardTitle>
              <CardDescription>Insights into search behavior and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Peak Search Hours</h4>
                  <BarChartPlaceholder title="Searches by Hour" height={200} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Search Volume by Day</h4>
                  <BarChartPlaceholder title="Searches by Day" height={200} />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Key Insights</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <span>Most searches occur between 10 AM and 2 PM on weekdays</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <span>Tuesday has the highest search volume, 27% above average</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <span>Searches for technology companies have 15% higher success rate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">4</span>
                    </div>
                    <span>Name + Company searches yield 23% more results than domain-only searches</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Verification Tab */}
        <TabsContent value="verifier">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.verifier.totalVerifications.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Verification batches run</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Emails Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.verifier.totalEmailsVerified.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Total processed emails</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Valid Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.verifier.validEmails.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">{stats.verifier.validRate}% valid rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Invalid Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.verifier.invalidEmails.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {(100 - stats.verifier.validRate).toFixed(1)}% invalid rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.2s</div>
                <p className="text-xs text-gray-500 mt-1">Per email verification</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Verification Activity</CardTitle>
                <CardDescription>Emails verified per day with results</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartPlaceholder title="Daily Verification Activity" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verification Types</CardTitle>
                <CardDescription>Distribution by verification method</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartPlaceholder title="Verification Types" height={300} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Error Breakdown</CardTitle>
                <CardDescription>Types of verification errors</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartPlaceholder title="Error Types" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verification Performance</CardTitle>
                <CardDescription>Valid vs. invalid email rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Valid Emails</span>
                      <span className="text-sm">
                        {stats.verifier.validEmails.toLocaleString()} ({stats.verifier.validRate}%)
                      </span>
                    </div>
                    <Progress value={stats.verifier.validRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Invalid Emails</span>
                      <span className="text-sm">
                        {stats.verifier.invalidEmails.toLocaleString()} ({(100 - stats.verifier.validRate).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={100 - stats.verifier.validRate} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Error Breakdown</h4>
                    {stats.verifier.errorBreakdown.map((error, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-500">{error.type}:</span>
                        <span>
                          {error.count.toLocaleString()} ({error.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Domain Verification Analysis</CardTitle>
                <CardDescription>Verification success rates by domain type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Corporate Domains</span>
                      <span className="text-sm">95.2% valid rate</span>
                    </div>
                    <Progress value={95.2} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Gmail</span>
                      <span className="text-sm">93.7% valid rate</span>
                    </div>
                    <Progress value={93.7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Outlook/Hotmail</span>
                      <span className="text-sm">91.4% valid rate</span>
                    </div>
                    <Progress value={91.4} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Yahoo</span>
                      <span className="text-sm">88.9% valid rate</span>
                    </div>
                    <Progress value={88.9} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Other Free Email Providers</span>
                      <span className="text-sm">85.3% valid rate</span>
                    </div>
                    <Progress value={85.3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Verification Batches</CardTitle>
              <CardDescription>Your most significant email verification batches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Batch Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Emails</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Valid Rate</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.verifier.topVerifications.map((verification, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{verification.name}</td>
                        <td className="py-3 px-4">{formatDate(verification.date)}</td>
                        <td className="py-3 px-4">{verification.emails.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {verification.validRate}% Valid
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Verification Insights</CardTitle>
              <CardDescription>Advanced metrics and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Verification Speed Analysis</h4>
                  <LineChartPlaceholder title="Verification Speed" height={200} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Error Rate Trends</h4>
                  <LineChartPlaceholder title="Error Rate Trends" height={200} />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Key Verification Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Catch-all Domains</div>
                    <div className="text-xl font-bold mt-1">8.2%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Syntax Errors</div>
                    <div className="text-xl font-bold mt-1">2.3%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Disposable Emails</div>
                    <div className="text-xl font-bold mt-1">1.7%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Role Addresses</div>
                    <div className="text-xl font-bold mt-1">3.5%</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Verification Quality Score</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                  <span className="font-bold">87/100</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Quality score based on verification accuracy, speed, and error rates
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Sender Tab */}
        <TabsContent value="sender">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.sender.totalCampaigns.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Email campaigns sent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Emails Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.sender.totalEmailsSent.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-1">Total sent emails</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.sender.openRate}%</div>
                <p className="text-xs text-gray-500 mt-1">{stats.sender.openedEmails.toLocaleString()} opened emails</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.sender.clickRate}%</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.sender.clickedEmails.toLocaleString()} clicked emails
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Reply Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.sender.replyRate}%</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.sender.repliedEmails.toLocaleString()} replied emails
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Sending Activity</CardTitle>
                <CardDescription>Emails sent, opened, and clicked per day</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartPlaceholder title="Daily Sending Activity" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Types</CardTitle>
                <CardDescription>Distribution by campaign type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartPlaceholder title="Campaign Types" height={300} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Best Sending Times</CardTitle>
                <CardDescription>Open rates by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartPlaceholder title="Open Rates by Day" height={300} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Email opens by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.sender.deviceBreakdown.map((device, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{device.device}</span>
                        <span className="text-sm">
                          {device.opens.toLocaleString()} opens ({device.percentage}%)
                        </span>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Link Performance</CardTitle>
                <CardDescription>Click-through rates by link position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">First Link</span>
                      <span className="text-sm">18.7% CTR</span>
                    </div>
                    <Progress value={18.7 * 5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Second Link</span>
                      <span className="text-sm">12.3% CTR</span>
                    </div>
                    <Progress value={12.3 * 5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Third Link</span>
                      <span className="text-sm">8.9% CTR</span>
                    </div>
                    <Progress value={8.9 * 5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Button CTA</span>
                      <span className="text-sm">22.5% CTR</span>
                    </div>
                    <Progress value={22.5 * 5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Footer Links</span>
                      <span className="text-sm">4.2% CTR</span>
                    </div>
                    <Progress value={4.2 * 5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Delivery Rate</span>
                      <span className="text-sm">{stats.sender.deliveryRate}%</span>
                    </div>
                    <Progress value={stats.sender.deliveryRate} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {stats.sender.deliveredEmails.toLocaleString()} of {stats.sender.totalEmailsSent.toLocaleString()}{" "}
                      emails delivered
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Open Rate</span>
                      <span className="text-sm">{stats.sender.openRate}%</span>
                    </div>
                    <Progress value={stats.sender.openRate} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {stats.sender.openedEmails.toLocaleString()} of {stats.sender.deliveredEmails.toLocaleString()}{" "}
                      emails opened
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Click Rate</span>
                      <span className="text-sm">{stats.sender.clickRate}%</span>
                    </div>
                    <Progress value={stats.sender.clickRate} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {stats.sender.clickedEmails.toLocaleString()} of {stats.sender.deliveredEmails.toLocaleString()}{" "}
                      emails clicked
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Reply Rate</span>
                      <span className="text-sm">{stats.sender.replyRate}%</span>
                    </div>
                    <Progress value={stats.sender.replyRate} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {stats.sender.repliedEmails.toLocaleString()} of {stats.sender.deliveredEmails.toLocaleString()}{" "}
                      emails replied to
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Best Sending Hours</CardTitle>
                <CardDescription>Open rates by hour of day</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartPlaceholder title="Open Rates by Hour" height={300} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Your most successful email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Campaign Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Emails</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Open Rate</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Click Rate</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.sender.topCampaigns.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{campaign.name}</td>
                        <td className="py-3 px-4">{formatDate(campaign.date)}</td>
                        <td className="py-3 px-4">{campaign.emails.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{campaign.openRate}%</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {campaign.clickRate}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule Again
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Advanced Campaign Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Subject Line Performance</h4>
                  <BarChartPlaceholder title="Open Rates by Subject Type" height={200} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Email Length Analysis</h4>
                  <LineChartPlaceholder title="Engagement by Email Length" height={200} />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Engagement Funnel</h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Delivered
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {stats.sender.deliveryRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${stats.sender.deliveryRate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Opened
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {stats.sender.openRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div
                      style={{ width: `${stats.sender.openRate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Clicked
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {stats.sender.clickRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: `${stats.sender.clickRate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                    ></div>
                  </div>
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                        Replied
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-orange-600">
                        {stats.sender.replyRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                    <div
                      style={{ width: `${stats.sender.replyRate}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Content Analysis</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Optimal Word Count</div>
                    <div className="text-xl font-bold mt-1">250-350</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Best CTA Position</div>
                    <div className="text-xl font-bold mt-1">Middle</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Ideal Image Count</div>
                    <div className="text-xl font-bold mt-1">1-2</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Top Subject Words</div>
                    <div className="text-xl font-bold mt-1">"New", "You"</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Spam Trigger Words</div>
                    <div className="text-xl font-bold mt-1">0.8%</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Personalization</div>
                    <div className="text-xl font-bold mt-1">+32% CTR</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
