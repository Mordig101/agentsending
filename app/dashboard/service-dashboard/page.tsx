"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, Clock, FileText, Play, Plus, RefreshCw, Save, Send, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

// Mock data for campaigns
const mockCampaigns = {
  finder: [
    {
      id: 1,
      name: "Tech Companies Research",
      status: "completed",
      progress: 100,
      results: 450,
      keywords: "tech startup, innovation, AI",
      date: "2023-04-15",
    },
    {
      id: 2,
      name: "Healthcare Providers",
      status: "running",
      progress: 65,
      results: 230,
      keywords: "healthcare, medical, clinic",
      date: "2023-04-20",
    },
  ],
  verify: [
    {
      id: 1,
      name: "Tech Leads Verification",
      status: "completed",
      progress: 100,
      verified: 420,
      total: 450,
      mode: "Standard",
      date: "2023-04-16",
    },
    {
      id: 2,
      name: "Healthcare Emails Check",
      status: "pending",
      progress: 0,
      verified: 0,
      total: 230,
      mode: "Strict",
      date: "2023-04-21",
    },
  ],
  sender: [
    {
      id: 1,
      name: "Q2 Newsletter",
      status: "completed",
      progress: 100,
      sent: 415,
      opened: 210,
      clicked: 85,
      date: "2023-04-17",
    },
    {
      id: 2,
      name: "Product Launch",
      status: "scheduled",
      progress: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      date: "2023-04-25",
    },
  ],
}

export default function ServiceDashboard() {
  const searchParams = useSearchParams()
  const serviceType = searchParams.get("service") || "finder"
  const { toast } = useToast()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("setup")
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [streamingData, setStreamingData] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [progress, setProgress] = useState(0)

  // Form states for each service type
  const [finderParams, setFinderParams] = useState({
    name: "",
    keywords: "",
    description: "",
    sources: ["linkedin", "company-websites"],
    maxResults: 500,
    includeCompanyInfo: true,
  })

  const [verifyParams, setVerifyParams] = useState({
    name: "",
    mode: "standard",
    deepVerification: false,
    timeout: 30,
    retryCount: 3,
    includeValidationScore: true,
  })

  const [senderParams, setSenderParams] = useState({
    name: "",
    subject: "",
    content: "",
    template: "",
    attachments: [],
    scheduledDate: "",
    trackOpens: true,
    trackClicks: true,
  })

  // Service-specific titles and descriptions
  const serviceInfo = {
    finder: {
      title: "Email Finder",
      description: "Find email addresses based on keywords, company names, or job titles",
    },
    verify: {
      title: "Email Verification",
      description: "Verify the validity and deliverability of your email addresses",
    },
    sender: {
      title: "Email Sender",
      description: "Create and send email campaigns to your verified contacts",
    },
  }

  // Simulate streaming data for running campaigns
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        if (progress < 100) {
          setProgress((prev) => {
            const newProgress = prev + Math.floor(Math.random() * 5) + 1
            return newProgress > 100 ? 100 : newProgress
          })

          const actions = [
            "Searching for contacts...",
            "Found potential match at company XYZ",
            "Extracting email pattern...",
            "Validating contact information...",
            "Adding to results database...",
            "Processing LinkedIn profile...",
            "Analyzing company website...",
            "Cross-referencing with existing data...",
          ]

          setStreamingData((prev) => [...prev, actions[Math.floor(Math.random() * actions.length)]])
        } else {
          setIsStreaming(false)
          toast({
            title: "Campaign completed",
            description: "Your campaign has finished processing.",
          })
          clearInterval(interval)
        }
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [isStreaming, progress, toast])

  const startCampaign = () => {
    toast({
      title: "Campaign started",
      description: `Your ${serviceInfo[serviceType as keyof typeof serviceInfo].title} campaign is now running.`,
    })
    setIsStreaming(true)
    setProgress(0)
    setStreamingData([`Starting ${serviceInfo[serviceType as keyof typeof serviceInfo].title} campaign...`])
    setActiveTab("streaming")
  }

  const saveCampaign = () => {
    toast({
      title: "Campaign saved",
      description: "Your campaign settings have been saved.",
    })
  }

  const renderSetupContent = () => {
    switch (serviceType) {
      case "finder":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={finderParams.name}
                    onChange={(e) => setFinderParams({ ...finderParams, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., tech startup, innovation, AI"
                    value={finderParams.keywords}
                    onChange={(e) => setFinderParams({ ...finderParams, keywords: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Separate keywords with commas</p>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what kind of contacts you're looking for"
                    rows={4}
                    value={finderParams.description}
                    onChange={(e) => setFinderParams({ ...finderParams, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sources">Data Sources</Label>
                  <Select defaultValue="all" onValueChange={(value) => console.log(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="company-websites">Company Websites</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="business-directories">Business Directories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="max-results">Maximum Results</Label>
                  <Input
                    id="max-results"
                    type="number"
                    placeholder="500"
                    value={finderParams.maxResults}
                    onChange={(e) => setFinderParams({ ...finderParams, maxResults: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch
                    id="include-company"
                    checked={finderParams.includeCompanyInfo}
                    onCheckedChange={(checked) => setFinderParams({ ...finderParams, includeCompanyInfo: checked })}
                  />
                  <Label htmlFor="include-company">Include company information</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-verify" />
                  <Label htmlFor="auto-verify">Auto-verify found emails</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={saveCampaign}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={startCampaign}>
                <Play className="mr-2 h-4 w-4" />
                Start Campaign
              </Button>
            </div>
          </div>
        )

      case "verify":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={verifyParams.name}
                    onChange={(e) => setVerifyParams({ ...verifyParams, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="verification-mode">Verification Mode</Label>
                  <Select
                    defaultValue={verifyParams.mode}
                    onValueChange={(value) => setVerifyParams({ ...verifyParams, mode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick">Quick (Syntax Only)</SelectItem>
                      <SelectItem value="standard">Standard (MX Records)</SelectItem>
                      <SelectItem value="strict">Strict (SMTP Check)</SelectItem>
                      <SelectItem value="deep">Deep (Multi-layer Verification)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    placeholder="30"
                    value={verifyParams.timeout}
                    onChange={(e) => setVerifyParams({ ...verifyParams, timeout: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="retry-count">Retry Count</Label>
                  <Input
                    id="retry-count"
                    type="number"
                    placeholder="3"
                    value={verifyParams.retryCount}
                    onChange={(e) => setVerifyParams({ ...verifyParams, retryCount: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch
                    id="deep-verification"
                    checked={verifyParams.deepVerification}
                    onCheckedChange={(checked) => setVerifyParams({ ...verifyParams, deepVerification: checked })}
                  />
                  <Label htmlFor="deep-verification">Enable deep verification</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="validation-score"
                    checked={verifyParams.includeValidationScore}
                    onCheckedChange={(checked) => setVerifyParams({ ...verifyParams, includeValidationScore: checked })}
                  />
                  <Label htmlFor="validation-score">Include validation score</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-categorize" />
                  <Label htmlFor="auto-categorize">Auto-categorize results</Label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Label>Upload Email List</Label>
              <div className="border-2 border-dashed rounded-md p-6 mt-2 text-center">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Drag and drop your CSV file here, or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">Supports CSV, TXT, or Excel files up to 10MB</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={saveCampaign}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={startCampaign}>
                <Play className="mr-2 h-4 w-4" />
                Start Verification
              </Button>
            </div>
          </div>
        )

      case "sender":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="Enter campaign name"
                    value={senderParams.name}
                    onChange={(e) => setSenderParams({ ...senderParams, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email-subject">Email Subject</Label>
                  <Input
                    id="email-subject"
                    placeholder="Enter email subject"
                    value={senderParams.subject}
                    onChange={(e) => setSenderParams({ ...senderParams, subject: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email-template">Email Template</Label>
                  <Select
                    defaultValue="custom"
                    onValueChange={(value) => setSenderParams({ ...senderParams, template: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Email</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="introduction">Introduction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="scheduled-date">Scheduled Date</Label>
                  <Input
                    id="scheduled-date"
                    type="datetime-local"
                    value={senderParams.scheduledDate}
                    onChange={(e) => setSenderParams({ ...senderParams, scheduledDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea
                    id="email-content"
                    placeholder="Write your email content here..."
                    rows={8}
                    value={senderParams.content}
                    onChange={(e) => setSenderParams({ ...senderParams, content: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="track-opens"
                    checked={senderParams.trackOpens}
                    onCheckedChange={(checked) => setSenderParams({ ...senderParams, trackOpens: checked })}
                  />
                  <Label htmlFor="track-opens">Track email opens</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="track-clicks"
                    checked={senderParams.trackClicks}
                    onCheckedChange={(checked) => setSenderParams({ ...senderParams, trackClicks: checked })}
                  />
                  <Label htmlFor="track-clicks">Track link clicks</Label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed rounded-md p-6 mt-2 text-center">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Drag and drop files here, or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">Supports PDF, JPG, PNG, or DOC files up to 10MB</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={saveCampaign}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={startCampaign}>
                <Send className="mr-2 h-4 w-4" />
                Send Campaign
              </Button>
            </div>
          </div>
        )

      default:
        return <div>Select a service to configure</div>
    }
  }

  const renderCampaignsContent = () => {
    const serviceCampaigns = campaigns[serviceType as keyof typeof campaigns] || []

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Existing Campaigns</h3>
          <Button size="sm" onClick={() => setActiveTab("setup")}>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {serviceCampaigns.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No campaigns found</p>
            <Button variant="outline" className="mt-4" onClick={() => setActiveTab("setup")}>
              Create your first campaign
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {serviceCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.name}</CardTitle>
                      <CardDescription>Created on {campaign.date}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        campaign.status === "completed"
                          ? "default"
                          : campaign.status === "running"
                            ? "secondary"
                            : campaign.status === "scheduled"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaign.progress < 100 && campaign.status !== "pending" && campaign.status !== "scheduled" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {serviceType === "finder" && (
                        <>
                          <div>
                            <p className="text-muted-foreground">Results</p>
                            <p className="font-medium">{campaign.results}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Keywords</p>
                            <p className="font-medium truncate" title={campaign.keywords}>
                              {campaign.keywords}
                            </p>
                          </div>
                        </>
                      )}

                      {serviceType === "verify" && (
                        <>
                          <div>
                            <p className="text-muted-foreground">Verified</p>
                            <p className="font-medium">
                              {campaign.verified} / {campaign.total}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Mode</p>
                            <p className="font-medium">{campaign.mode}</p>
                          </div>
                        </>
                      )}

                      {serviceType === "sender" && (
                        <>
                          <div>
                            <p className="text-muted-foreground">Sent</p>
                            <p className="font-medium">{campaign.sent}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Opened</p>
                            <p className="font-medium">{campaign.opened}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Clicked</p>
                            <p className="font-medium">{campaign.clicked}</p>
                          </div>
                        </>
                      )}

                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <div className="flex items-center">
                          {campaign.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500 mr-1" />}
                          {campaign.status === "running" && (
                            <RefreshCw className="h-4 w-4 text-blue-500 mr-1 animate-spin" />
                          )}
                          {campaign.status === "scheduled" && <Clock className="h-4 w-4 text-orange-500 mr-1" />}
                          {campaign.status === "pending" && <AlertCircle className="h-4 w-4 text-gray-500 mr-1" />}
                          <span>{campaign.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {(campaign.status === "pending" || campaign.status === "scheduled") && (
                        <Button size="sm">Start Now</Button>
                      )}
                      {campaign.status === "running" && (
                        <Button variant="destructive" size="sm">
                          Pause
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderStreamingContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Live Campaign Progress</h3>
          <Badge variant="secondary" className="animate-pulse">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Running
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="border rounded-md h-80 overflow-y-auto p-4 bg-muted/50 font-mono text-sm">
          {streamingData.map((line, index) => (
            <div key={index} className="py-1 border-b border-border/30 last:border-0">
              <span className="text-muted-foreground mr-2">[{new Date().toLocaleTimeString()}]</span>
              {line}
            </div>
          ))}
          {isStreaming && (
            <div className="py-1 animate-pulse">
              <span className="text-muted-foreground mr-2">[{new Date().toLocaleTimeString()}]</span>
              Processing...
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab("campaigns")}>
            View All Campaigns
          </Button>

          {isStreaming ? (
            <Button variant="destructive" onClick={() => setIsStreaming(false)}>
              Stop Campaign
            </Button>
          ) : (
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {serviceInfo[serviceType as keyof typeof serviceInfo].title}
          </h1>
          <p className="text-muted-foreground">{serviceInfo[serviceType as keyof typeof serviceInfo].description}</p>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Service Settings
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup & Start</TabsTrigger>
          <TabsTrigger value="campaigns">Existing Campaigns</TabsTrigger>
          <TabsTrigger value="streaming">Live Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
              <CardDescription>Configure your campaign parameters and start the process</CardDescription>
            </CardHeader>
            <CardContent>{renderSetupContent()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          {renderCampaignsContent()}
        </TabsContent>

        <TabsContent value="streaming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Campaign Progress</CardTitle>
              <CardDescription>Watch your campaign progress in real-time</CardDescription>
            </CardHeader>
            <CardContent>{renderStreamingContent()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
