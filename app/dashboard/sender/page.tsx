"use client"

import type React from "react"

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
import { Clock, Send, Upload, X } from "lucide-react"

export default function SenderPage() {
  const [activeTab, setActiveTab] = useState("connect")
  const [AgentSendingvider, setAgentSendingvider] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [smtpHost, setSmtpHost] = useState("")
  const [smtpPort, setSmtpPort] = useState("")
  const [smtpUsername, setSmtpUsername] = useState("")
  const [smtpPassword, setSmtpPassword] = useState("")
  const [subject, setSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [recipientsList, setRecipientsList] = useState("")
  const [dailyLimit, setDailyLimit] = useState("50")
  const [sendInterval, setSendInterval] = useState("60")
  const [trackOpens, setTrackOpens] = useState(true)
  const [trackClicks, setTrackClicks] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[] | null>(null)
  const [error, setError] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        setError("Please upload a CSV file")
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError("")
    }
  }

  const connectEmail = () => {
    if (AgentSendingvider === "gmail" || AgentSendingvider === "outlook") {
      if (!emailAddress || !password) {
        setError("Please enter your email address and password")
        return
      }
    } else if (AgentSendingvider === "smtp") {
      if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
        setError("Please fill in all SMTP details")
        return
      }
    } else {
      setError("Please select an email provider")
      return
    }

    // Simulate connection process
    setError("")
    setIsConnected(true)
    setActiveTab("compose")
  }

  const startSending = () => {
    if (!subject.trim()) {
      setError("Please enter an email subject")
      return
    }

    if (!emailBody.trim()) {
      setError("Please enter an email body")
      return
    }

    if (!file && !recipientsList.trim()) {
      setError("Please upload a CSV file or enter recipients")
      return
    }

    setIsSending(true)
    setProgress(0)
    setError("")

    // Simulate sending process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSending(false)

          // Generate mock results
          const totalEmails = Math.floor(Math.random() * 50) + 10
          const delivered = Math.floor(totalEmails * (Math.random() * 0.2 + 0.8)) // 80-100% delivery rate
          const opened = Math.floor(delivered * (Math.random() * 0.5 + 0.2)) // 20-70% open rate
          const clicked = Math.floor(opened * (Math.random() * 0.3 + 0.1)) // 10-40% click rate
          const bounced = totalEmails - delivered

          setResults({
            total: totalEmails,
            delivered,
            opened,
            clicked,
            bounced,
            deliveryRate: ((delivered / totalEmails) * 100).toFixed(1),
            openRate: ((opened / delivered) * 100).toFixed(1),
            clickRate: ((clicked / delivered) * 100).toFixed(1),
          })

          return 100
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }

  const resetSending = () => {
    setSubject("")
    setEmailBody("")
    setFile(null)
    setRecipientsList("")
    setResults(null)
    setProgress(0)
    setIsSending(false)
    setError("")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Email Sending</h1>
        <p className="text-gray-500">Send personalized cold emails with tracking and automation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Emails</CardTitle>
              <CardDescription>
                Connect your email account, compose your message, and send to your recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="connect" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="connect" disabled={isConnected && activeTab !== "connect"}>
                    1. Connect Email
                  </TabsTrigger>
                  <TabsTrigger value="compose" disabled={!isConnected}>
                    2. Compose Message
                  </TabsTrigger>
                  <TabsTrigger value="recipients" disabled={!isConnected || activeTab === "connect"}>
                    3. Add Recipients
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="connect" className="mt-4 space-y-4">
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

                  {(AgentSendingvider === "gmail" || AgentSendingvider === "outlook") && (
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
                  )}

                  {AgentSendingvider === "smtp" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="smtp-host">SMTP Host</Label>
                          <Input
                            id="smtp-host"
                            placeholder="smtp.example.com"
                            value={smtpHost}
                            onChange={(e) => setSmtpHost(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="smtp-port">SMTP Port</Label>
                          <Input
                            id="smtp-port"
                            placeholder="587"
                            value={smtpPort}
                            onChange={(e) => setSmtpPort(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="smtp-username">SMTP Username</Label>
                        <Input
                          id="smtp-username"
                          placeholder="your.email@example.com"
                          value={smtpUsername}
                          onChange={(e) => setSmtpUsername(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtp-password">SMTP Password</Label>
                        <Input
                          id="smtp-password"
                          type="password"
                          placeholder="••••••••"
                          value={smtpPassword}
                          onChange={(e) => setSmtpPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <X className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={connectEmail} className="w-full">
                    Connect Email Account
                  </Button>
                </TabsContent>

                <TabsContent value="compose" className="mt-4 space-y-4">
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

                  <div>
                    <Label htmlFor="attachment">Attachment (Optional)</Label>
                    <Input id="attachment" type="file" onChange={handleFileChange} />
                    {file && (
                      <div className="mt-2 flex items-center">
                        <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center">
                          <span className="text-sm font-medium mr-2">{file.name}</span>
                          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setFile(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("recipients")}>Next: Add Recipients</Button>
                  </div>
                </TabsContent>

                <TabsContent value="recipients" className="mt-4 space-y-4">
                  <Tabs defaultValue="upload">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                      <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload Recipients CSV</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          CSV should include columns: Email, First Name, Last Name, Company
                        </p>
                        <Input
                          id="recipients-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="recipients-upload" asChild>
                          <Button variant="outline">Select File</Button>
                        </Label>
                        {file && (
                          <div className="mt-4 flex items-center justify-center">
                            <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center">
                              <span className="text-sm font-medium mr-2">{file.name}</span>
                              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setFile(null)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="manual" className="mt-4">
                      <div>
                        <Label htmlFor="recipients-list">Recipients List</Label>
                        <Textarea
                          id="recipients-list"
                          placeholder="Enter email addresses (one per line or comma-separated)"
                          className="h-40"
                          value={recipientsList}
                          onChange={(e) => setRecipientsList(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Format: email,first name,last name,company (optional)
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-4 mt-6">
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

                  {!results ? (
                    <Button onClick={startSending} disabled={isSending} className="w-full">
                      {isSending ? "Sending..." : "Start Sending"}
                    </Button>
                  ) : null}

                  {isSending && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sending in progress...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {results && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Sending Results</h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Total Sent</div>
                          <div className="text-2xl font-bold">{results.total}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Delivered</div>
                          <div className="text-2xl font-bold">{results.delivered}</div>
                          <div className="text-xs text-gray-500">{results.deliveryRate}%</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Opened</div>
                          <div className="text-2xl font-bold">{results.opened}</div>
                          <div className="text-xs text-gray-500">{results.openRate}%</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500">Clicked</div>
                          <div className="text-2xl font-bold">{results.clicked}</div>
                          <div className="text-xs text-gray-500">{results.clickRate}%</div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" onClick={resetSending}>
                          Send Another Campaign
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Email Sending Guide</CardTitle>
              <CardDescription>Best practices for cold emails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalization</h4>
                    <p className="text-sm text-gray-500">
                      Use personalization tags like {"{First Name}"} to increase response rates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Subject Lines</h4>
                    <p className="text-sm text-gray-500">
                      Keep subject lines short (4-7 words) and avoid spam triggers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sending Times</h4>
                    <p className="text-sm text-gray-500">
                      Tuesday-Thursday mornings typically have the highest open rates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Follow-Ups</h4>
                    <p className="text-sm text-gray-500">Send 2-3 follow-ups spaced 3-5 days apart for best results.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Sending Limits</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Free Plan: 25 emails per day</li>
                  <li>Professional Plan: 500 emails per day</li>
                  <li>Enterprise Plan: Unlimited</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
