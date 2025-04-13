"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Mail, Search, Send, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CampaignPage() {
  const [activeTab, setActiveTab] = useState("setup")
  const [campaignName, setCampaignName] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [keywords, setKeywords] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [AgentSendingvider, setAgentSendingvider] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [subject, setSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [dailyLimit, setDailyLimit] = useState("50")
  const [sendInterval, setSendInterval] = useState("60")
  const [trackOpens, setTrackOpens] = useState(true)
  const [trackClicks, setTrackClicks] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState({
    finding: 0,
    verifying: 0,
    sending: 0,
    overall: 0,
  })
  const [results, setResults] = useState<any | null>(null)
  const [error, setError] = useState("")

  const startCampaign = () => {
    if (!campaignName.trim()) {
      setError("Please enter a campaign name")
      return
    }

    if (!targetAudience.trim() && !keywords.trim()) {
      setError("Please define your target audience or enter keywords")
      return
    }

    if (!AgentSendingvider) {
      setError("Please select an email provider")
      return
    }

    if (!emailAddress || !password) {
      setError("Please enter your email credentials")
      return
    }

    if (!subject.trim() || !emailBody.trim()) {
      setError("Please enter an email subject and body")
      return
    }

    setIsRunning(true)
    setProgress({
      finding: 0,
      verifying: 0,
      sending: 0,
      overall: 0,
    })
    setError("")

    // Simulate campaign process
    const findingInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev.finding >= 100) {
          clearInterval(findingInterval)

          // Start verification process after finding is complete
          const verifyingInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev.verifying >= 100) {
                clearInterval(verifyingInterval)

                // Start sending process after verification is complete
                const sendingInterval = setInterval(() => {
                  setProgress((prev) => {
                    if (prev.sending >= 100) {
                      clearInterval(sendingInterval)
                      setIsRunning(false)

                      // Generate mock results
                      const foundEmails = Math.floor(Math.random() * 50) + 30
                      const verifiedEmails = Math.floor(foundEmails * (Math.random() * 0.2 + 0.7)) // 70-90% verification rate
                      const sentEmails = verifiedEmails
                      const delivered = Math.floor(sentEmails * (Math.random() * 0.1 + 0.9)) // 90-100% delivery rate
                      const opened = Math.floor(delivered * (Math.random() * 0.4 + 0.3)) // 30-70% open rate
                      const replied = Math.floor(opened * (Math.random() * 0.2 + 0.1)) // 10-30% reply rate

                      setResults({
                        foundEmails,
                        verifiedEmails,
                        sentEmails,
                        delivered,
                        opened,
                        replied,
                        findRate: ((foundEmails / 100) * 100).toFixed(1),
                        verifyRate: ((verifiedEmails / foundEmails) * 100).toFixed(1),
                        deliveryRate: ((delivered / sentEmails) * 100).toFixed(1),
                        openRate: ((opened / delivered) * 100).toFixed(1),
                        replyRate: ((replied / delivered) * 100).toFixed(1),
                      })

                      return {
                        ...prev,
                        sending: 100,
                        overall: 100,
                      }
                    }

                    const newSending = prev.sending + 2
                    return {
                      ...prev,
                      sending: newSending,
                      overall: Math.floor((prev.finding + prev.verifying + newSending) / 3),
                    }
                  })
                }, 100)

                return {
                  ...prev,
                  verifying: 100,
                }
              }

              const newVerifying = prev.verifying + 3
              return {
                ...prev,
                verifying: newVerifying,
                overall: Math.floor((prev.finding + newVerifying + prev.sending) / 3),
              }
            })
          }, 100)

          return {
            ...prev,
            finding: 100,
          }
        }

        const newFinding = prev.finding + 1
        return {
          ...prev,
          finding: newFinding,
          overall: Math.floor((newFinding + prev.verifying + prev.sending) / 3),
        }
      })
    }, 50)

    return () => {
      clearInterval(findingInterval)
    }
  }

  const resetCampaign = () => {
    setCampaignName("")
    setTargetAudience("")
    setKeywords("")
    setJobTitle("")
    setLocation("")
    setAgentSendingvider("")
    setEmailAddress("")
    setPassword("")
    setSubject("")
    setEmailBody("")
    setResults(null)
    setProgress({
      finding: 0,
      verifying: 0,
      sending: 0,
      overall: 0,
    })
    setIsRunning(false)
    setError("")
    setActiveTab("setup")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">All-in-One Campaign</h1>
        <p className="text-gray-500">Find, verify, and send emails in one automated workflow</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
              <CardDescription>Configure your campaign to find, verify, and send emails automatically</CardDescription>
            </CardHeader>
            <CardContent>
              {!results ? (
                <>
                  <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="setup">1. Campaign Setup</TabsTrigger>
                      <TabsTrigger value="email">2. Email Setup</TabsTrigger>
                      <TabsTrigger value="settings">3. Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup" className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Input
                          id="campaign-name"
                          placeholder="E.g., Tech Startups Outreach Q2"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="target-audience">Target Audience Description</Label>
                        <Textarea
                          id="target-audience"
                          placeholder="Describe your ideal prospects (e.g., Marketing Directors at SaaS companies with 50-200 employees)"
                          className="h-24"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="keywords">Search Keywords</Label>
                        <Input
                          id="keywords"
                          placeholder="E.g., SaaS, marketing, director"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="job-title">Job Title (Optional)</Label>
                          <Input
                            id="job-title"
                            placeholder="E.g., Marketing Director"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location (Optional)</Label>
                          <Input
                            id="location"
                            placeholder="E.g., New York, Remote"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={() => setActiveTab("email")}>Next: Email Setup</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="email" className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="email-provider">Email Provider</Label>
                        <Select value={AgentSendingvider} onValueChange={setAgentSendingvider}>
                          <SelectTrigger id="email-provider">
                            <SelectValue placeholder="Select your email provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gmail">Gmail</SelectItem>
                            <SelectItem value="outlook">Outlook</SelectItem>
                            <SelectItem value="smtp">Custom SMTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email-address">Email Address</Label>
                          <Input
                            id="email-address"
                            type="email"
                            placeholder="your.email@example.com"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-password">Password or App Password</Label>
                          <Input
                            id="email-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            We recommend using an app-specific password for security.
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Email Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Your compelling subject line"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email-body">Email Body</Label>
                        <Textarea
                          id="email-body"
                          placeholder="Write your email content here. Use {First Name} for personalization."
                          className="min-h-[200px]"
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Use {"{First Name}"}, {"{Last Name}"}, {"{Company}"} for personalization.
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab("setup")}>
                          Back
                        </Button>
                        <Button onClick={() => setActiveTab("settings")}>Next: Campaign Settings</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-4 space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sending Settings</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="daily-limit">Daily Sending Limit</Label>
                            <Select value={dailyLimit} onValueChange={setDailyLimit}>
                              <SelectTrigger id="daily-limit">
                                <SelectValue placeholder="Select limit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="20">20 emails per day</SelectItem>
                                <SelectItem value="50">50 emails per day</SelectItem>
                                <SelectItem value="100">100 emails per day</SelectItem>
                                <SelectItem value="200">200 emails per day</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="send-interval">Sending Interval</Label>
                            <Select value={sendInterval} onValueChange={setSendInterval}>
                              <SelectTrigger id="send-interval">
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30 seconds</SelectItem>
                                <SelectItem value="60">1 minute</SelectItem>
                                <SelectItem value="120">2 minutes</SelectItem>
                                <SelectItem value="300">5 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="track-opens"
                              checked={trackOpens}
                              onCheckedChange={(checked) => setTrackOpens(checked as boolean)}
                            />
                            <Label htmlFor="track-opens">Track Email Opens</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="track-clicks"
                              checked={trackClicks}
                              onCheckedChange={(checked) => setTrackClicks(checked as boolean)}
                            />
                            <Label htmlFor="track-clicks">Track Link Clicks</Label>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <X className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab("email")}>
                          Back
                        </Button>
                        <Button onClick={startCampaign} disabled={isRunning}>
                          {isRunning ? "Running Campaign..." : "Start Campaign"}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {isRunning && (
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium">Campaign Progress</h3>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span>{progress.overall}%</span>
                        </div>
                        <Progress value={progress.overall} className="h-2 mb-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Finding Emails</span>
                              <span>{progress.finding}%</span>
                            </div>
                            <Progress value={progress.finding} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Verifying Emails</span>
                              <span>{progress.verifying}%</span>
                            </div>
                            <Progress value={progress.verifying} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Sending Emails</span>
                              <span>{progress.sending}%</span>
                            </div>
                            <Progress value={progress.sending} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">{campaignName}</h3>
                      <p className="text-sm text-gray-500">Campaign completed successfully</p>
                    </div>
                    <Button variant="outline" onClick={resetCampaign}>
                      New Campaign
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Found Emails</div>
                        <div className="text-2xl font-bold">{results.foundEmails}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Verified Emails</div>
                        <div className="text-2xl font-bold">{results.verifiedEmails}</div>
                        <div className="text-xs text-gray-500">{results.verifyRate}% of found</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Sent Emails</div>
                        <div className="text-2xl font-bold">{results.sentEmails}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Delivered</div>
                        <div className="text-2xl font-bold">{results.delivered}</div>
                        <div className="text-xs text-gray-500">{results.deliveryRate}%</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Opened</div>
                        <div className="text-2xl font-bold">{results.opened}</div>
                        <div className="text-xs text-gray-500">{results.openRate}%</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-sm text-gray-500">Replied</div>
                        <div className="text-2xl font-bold">{results.replied}</div>
                        <div className="text-xs text-gray-500">{results.replyRate}%</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Campaign Summary</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Your campaign has completed all three phases: finding emails, verifying them, and sending
                        personalized messages.
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium">Email Finding:</span>
                            <span className="text-sm text-gray-600 ml-1">
                              Found {results.foundEmails} potential prospects matching your criteria
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium">Email Verification:</span>
                            <span className="text-sm text-gray-600 ml-1">
                              Verified {results.verifiedEmails} emails ({results.verifyRate}% verification rate)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium">Email Sending:</span>
                            <span className="text-sm text-gray-600 ml-1">
                              Sent {results.sentEmails} emails with {results.openRate}% open rate and{" "}
                              {results.replyRate}% reply rate
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>All-in-One Campaign Guide</CardTitle>
              <CardDescription>How the automated workflow works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 1: Find Emails</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Our AI searches for email addresses based on your target audience criteria.
                    </p>
                    <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-200">
                      <p>• Searches LinkedIn profiles</p>
                      <p>• Scans company websites</p>
                      <p>• Checks business directories</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 2: Verify Emails</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      All found emails are automatically verified for deliverability.
                    </p>
                    <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-200">
                      <p>• Checks email format</p>
                      <p>• Verifies domain validity</p>
                      <p>• Confirms mailbox existence</p>
                      <p>• Detects disposable emails</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 3: Send Emails</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Personalized emails are sent to verified contacts with tracking.
                    </p>
                    <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-200">
                      <p>• Personalizes each email</p>
                      <p>• Sends at optimal times</p>
                      <p>• Tracks opens and clicks</p>
                      <p>• Respects daily limits</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 4: Monitor Results</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Track campaign performance in real-time from your dashboard.
                    </p>
                    <div className="text-xs text-gray-500 pl-2 border-l-2 border-gray-200">
                      <p>• View delivery rates</p>
                      <p>• Monitor open rates</p>
                      <p>• Track reply rates</p>
                      <p>• Analyze performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
