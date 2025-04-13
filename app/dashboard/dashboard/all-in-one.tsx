"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Search,
  CheckCircle,
  Send,
  Calendar,
  Mail,
  MessageSquare,
  FileText,
  Copy,
  Eye,
  Loader2,
  Pause,
  Play,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { AllInOneStats, AllInOneFormData, StreamingStats, StreamingLog, EmailTemplate } from "../dashboard/types"
import type { FormEvent, Dispatch, SetStateAction } from "react"
import type { JSX } from "react/jsx-runtime"

interface AllInOneTabProps {
  allInOneStats: AllInOneStats
  allInOneForm: AllInOneFormData
  setAllInOneForm: Dispatch<SetStateAction<AllInOneFormData>>
  handleAllInOneSubmit: (e: FormEvent<HTMLFormElement>) => void
  streamingService: string | null
  streamingActive: boolean
  streamingProgress: number
  streamingStats: StreamingStats
  streamingLogs: StreamingLog[]
  startStreaming: (service: string, total?: number) => void
  stopStreaming: () => void
  setActiveSetupTab: (tab: string) => void
  getStatusBadge: (status: string) => JSX.Element
  formatDate: (dateString: string) => string
  selectAllInOneTemplate: (templateId: string) => void
  emailTemplates: EmailTemplate[]
  setStreamingActive: Dispatch<SetStateAction<boolean>>
}

export default function AllInOneTab({
  allInOneStats,
  allInOneForm,
  setAllInOneForm,
  handleAllInOneSubmit,
  streamingService,
  streamingActive,
  streamingProgress,
  streamingStats,
  streamingLogs,
  startStreaming,
  stopStreaming,
  setActiveSetupTab,
  getStatusBadge,
  formatDate,
  selectAllInOneTemplate,
  emailTemplates,
  setStreamingActive,
}: AllInOneTabProps) {
  return (
    <Tabs defaultValue="setup">
      <TabsList className="mb-6">
        <TabsTrigger value="setup">Setup & Start</TabsTrigger>
        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
      </TabsList>

      {/* Setup & Start Tab */}
      <TabsContent value="setup">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allInOneStats.totalCampaigns}</div>
              <p className="text-xs text-gray-500 mt-1">All-in-one campaigns created</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allInOneStats.activeCampaigns}</div>
              <p className="text-xs text-gray-500 mt-1">Currently running campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allInOneStats.totalProspects.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Prospects targeted across all campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Reply Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allInOneStats.averageReplyRate}%</div>
              <p className="text-xs text-gray-500 mt-1">Industry avg: 3.2%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New All-in-One Campaign</CardTitle>
            <CardDescription>Create a complete email marketing campaign from finding to sending</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAllInOneSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Tech Startups Outreach Q3"
                    value={allInOneForm.name}
                    onChange={(e) => setAllInOneForm({ ...allInOneForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="campaign-goal">Campaign Goal</Label>
                    <Select
                      value={allInOneForm.goal}
                      onValueChange={(value) => setAllInOneForm({ ...allInOneForm, goal: value })}
                    >
                      <SelectTrigger id="campaign-goal">
                        <SelectValue placeholder="Select campaign goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leads">Generate Leads</SelectItem>
                        <SelectItem value="meetings">Book Meetings</SelectItem>
                        <SelectItem value="awareness">Create Awareness</SelectItem>
                        <SelectItem value="feedback">Collect Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Define the primary goal of your campaign</p>
                  </div>

                  <div>
                    <Label htmlFor="target-industry">Target Industry</Label>
                    <Select
                      value={allInOneForm.targetIndustry}
                      onValueChange={(value) => setAllInOneForm({ ...allInOneForm, targetIndustry: value })}
                    >
                      <SelectTrigger id="target-industry">
                        <SelectValue placeholder="Select target industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Choose the industry to target</p>
                  </div>
                </div>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="finding-options">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Search className="h-5 w-5 mr-2 text-blue-500" />
                        Finding Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="target-job-titles">Target Job Titles</Label>
                          <Input
                            id="target-job-titles"
                            placeholder="e.g., CEO, CTO, Marketing Director"
                            value={allInOneForm.targetJobTitles}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, targetJobTitles: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate job titles with commas</p>
                        </div>

                        <div>
                          <Label htmlFor="target-locations">Target Locations</Label>
                          <Input
                            id="target-locations"
                            placeholder="e.g., New York, San Francisco, London"
                            value={allInOneForm.targetLocations}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, targetLocations: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate locations with commas</p>
                        </div>

                        <div>
                          <Label htmlFor="target-company-size">Target Company Size</Label>
                          <Select
                            value={allInOneForm.targetCompanySize}
                            onValueChange={(value) => setAllInOneForm({ ...allInOneForm, targetCompanySize: value })}
                          >
                            <SelectTrigger id="target-company-size">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Sizes</SelectItem>
                              <SelectItem value="small">Small (1-50 employees)</SelectItem>
                              <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                              <SelectItem value="large">Large (501+ employees)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="finding-keywords">Keywords</Label>
                          <Input
                            id="finding-keywords"
                            placeholder="e.g., SaaS, AI, machine learning"
                            value={allInOneForm.findingKeywords}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, findingKeywords: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                        </div>

                        <div>
                          <Label htmlFor="finding-description">Search Description</Label>
                          <Textarea
                            id="finding-description"
                            placeholder="Describe your target audience in detail..."
                            className="h-24"
                            value={allInOneForm.findingDescription}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, findingDescription: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Provide a detailed description to improve search results
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="verification-options">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        Verification Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="verification-mode">Verification Mode</Label>
                          <Select
                            value={allInOneForm.verificationMode}
                            onValueChange={(value) => setAllInOneForm({ ...allInOneForm, verificationMode: value })}
                          >
                            <SelectTrigger id="verification-mode">
                              <SelectValue placeholder="Select verification mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard Verification</SelectItem>
                              <SelectItem value="deep">Deep Verification</SelectItem>
                              <SelectItem value="quick">Quick Check</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">Choose the level of verification depth</p>
                        </div>

                        <div>
                          <Label htmlFor="verification-threshold">Risk Threshold</Label>
                          <Select
                            value={allInOneForm.verificationThreshold}
                            onValueChange={(value) =>
                              setAllInOneForm({ ...allInOneForm, verificationThreshold: value })
                            }
                          >
                            <SelectTrigger id="verification-threshold">
                              <SelectValue placeholder="Select risk threshold" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (Accept more emails)</SelectItem>
                              <SelectItem value="medium">Medium (Balanced)</SelectItem>
                              <SelectItem value="high">High (Strict verification)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">Set how strict the verification should be</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sending-options">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Send className="h-5 w-5 mr-2 text-purple-500" />
                        Sending Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="email-template">Email Template</Label>
                          <Select
                            value={allInOneForm.templateId}
                            onValueChange={(value) => selectAllInOneTemplate(value)}
                          >
                            <SelectTrigger id="email-template">
                              <SelectValue placeholder="Select email template or create new" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Create New Template</SelectItem>
                              {emailTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id.toString()}>
                                  {template.name} ({template.performance} Performance)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">Choose a template or create a new one</p>
                        </div>

                        <div>
                          <Label htmlFor="email-subject">Email Subject</Label>
                          <Input
                            id="email-subject"
                            placeholder="e.g., Quick question about {Company}"
                            value={allInOneForm.subject}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, subject: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Use {`{First Name}`}, {`{Company}`}, etc. for personalization
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="email-body">Email Body</Label>
                          <Textarea
                            id="email-body"
                            placeholder="Write your email content here..."
                            className="h-64 font-mono"
                            value={allInOneForm.emailBody}
                            onChange={(e) => setAllInOneForm({ ...allInOneForm, emailBody: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Use {`{First Name}`}, {`{Company}`}, etc. for personalization
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="follow-ups">Follow-up Emails</Label>
                          <Select
                            value={allInOneForm.followUps.toString()}
                            onValueChange={(value) =>
                              setAllInOneForm({ ...allInOneForm, followUps: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger id="follow-ups">
                              <SelectValue placeholder="Select number of follow-ups" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No follow-ups</SelectItem>
                              <SelectItem value="1">1 follow-up</SelectItem>
                              <SelectItem value="2">2 follow-ups</SelectItem>
                              <SelectItem value="3">3 follow-ups</SelectItem>
                              <SelectItem value="4">4 follow-ups</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {allInOneForm.followUps > 0 && (
                          <div>
                            <Label htmlFor="follow-up-interval">Follow-up Interval (days)</Label>
                            <Select
                              value={allInOneForm.followUpInterval.toString()}
                              onValueChange={(value) =>
                                setAllInOneForm({ ...allInOneForm, followUpInterval: Number.parseInt(value) })
                              }
                            >
                              <SelectTrigger id="follow-up-interval">
                                <SelectValue placeholder="Select interval between follow-ups" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 day</SelectItem>
                                <SelectItem value="2">2 days</SelectItem>
                                <SelectItem value="3">3 days</SelectItem>
                                <SelectItem value="5">5 days</SelectItem>
                                <SelectItem value="7">7 days</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div>
                          <Label htmlFor="sending-limit">Daily Sending Limit</Label>
                          <Select
                            value={allInOneForm.sendingLimit}
                            onValueChange={(value) => setAllInOneForm({ ...allInOneForm, sendingLimit: value })}
                          >
                            <SelectTrigger id="sending-limit">
                              <SelectValue placeholder="Select daily limit" />
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
                          <Label htmlFor="send-interval">Send Interval</Label>
                          <Select
                            value={allInOneForm.sendInterval}
                            onValueChange={(value) => setAllInOneForm({ ...allInOneForm, sendInterval: value })}
                          >
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

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="track-opens">Track Email Opens</Label>
                              <p className="text-xs text-gray-500">
                                Receive notifications when recipients open your emails
                              </p>
                            </div>
                            <Switch
                              id="track-opens"
                              checked={allInOneForm.trackOpens}
                              onCheckedChange={(checked) => setAllInOneForm({ ...allInOneForm, trackOpens: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="track-clicks">Track Link Clicks</Label>
                              <p className="text-xs text-gray-500">
                                Receive notifications when recipients click links in your emails
                              </p>
                            </div>
                            <Switch
                              id="track-clicks"
                              checked={allInOneForm.trackClicks}
                              onCheckedChange={(checked) => setAllInOneForm({ ...allInOneForm, trackClicks: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="personalize-subject">Personalize Subject Line</Label>
                              <p className="text-xs text-gray-500">
                                Automatically personalize the subject line for each recipient
                              </p>
                            </div>
                            <Switch
                              id="personalize-subject"
                              checked={allInOneForm.personalizeSubject}
                              onCheckedChange={(checked) =>
                                setAllInOneForm({ ...allInOneForm, personalizeSubject: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="personalize-first-line">Personalize First Line</Label>
                              <p className="text-xs text-gray-500">
                                Automatically personalize the first line of your email
                              </p>
                            </div>
                            <Switch
                              id="personalize-first-line"
                              checked={allInOneForm.personalizeFirstLine}
                              onCheckedChange={(checked) =>
                                setAllInOneForm({ ...allInOneForm, personalizeFirstLine: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="scheduling-options">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                        Scheduling Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="sending-schedule">Sending Schedule</Label>
                          <Select
                            value={allInOneForm.schedule}
                            onValueChange={(value) => setAllInOneForm({ ...allInOneForm, schedule: value })}
                          >
                            <SelectTrigger id="sending-schedule">
                              <SelectValue placeholder="Select sending schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="now">Start Immediately</SelectItem>
                              <SelectItem value="scheduled">Schedule for Later</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {allInOneForm.schedule === "scheduled" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="schedule-date">Date</Label>
                              <Input
                                id="schedule-date"
                                type="date"
                                value={allInOneForm.scheduleDate}
                                onChange={(e) => setAllInOneForm({ ...allInOneForm, scheduleDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="schedule-time">Time</Label>
                              <Input
                                id="schedule-time"
                                type="time"
                                value={allInOneForm.scheduleTime}
                                onChange={(e) => setAllInOneForm({ ...allInOneForm, scheduleTime: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Zap className="h-4 w-4 mr-2" />
                    Start All-in-One Campaign
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Campaigns Tab */}
      <TabsContent value="campaigns">
        <div className="grid grid-cols-1 gap-6 mb-8">
          {allInOneStats.runningCampaigns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Running Campaigns</CardTitle>
                <CardDescription>Currently active all-in-one campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allInOneStats.runningCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">Started on {formatDate(campaign.date)}</p>
                        </div>
                        <div className="flex items-center">
                          {getStatusBadge(campaign.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => startStreaming("all-in-one", campaign.prospects)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Live
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress: {campaign.progress.overall}%</span>
                          </div>
                          <Progress value={campaign.progress.overall} className="h-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-500">Finding</span>
                              <span>{campaign.progress.finding}%</span>
                            </div>
                            <Progress value={campaign.progress.finding} className="h-1.5 bg-blue-100" />
                            <p className="text-xs text-gray-500">
                              {campaign.found} / {campaign.prospects} found
                            </p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-green-500">Verifying</span>
                              <span>{campaign.progress.verifying}%</span>
                            </div>
                            <Progress value={campaign.progress.verifying} className="h-1.5 bg-green-100" />
                            <p className="text-xs text-gray-500">
                              {campaign.verified} / {campaign.found} verified
                            </p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-purple-500">Sending</span>
                              <span>{campaign.progress.sending}%</span>
                            </div>
                            <Progress value={campaign.progress.sending} className="h-1.5 bg-purple-100" />
                            <p className="text-xs text-gray-500">
                              {campaign.sent} / {campaign.verified} sent
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-blue-500 mr-1" />
                            <span>
                              Opened: {campaign.opened} (
                              {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                            <span>
                              Replied: {campaign.replied} (
                              {campaign.sent > 0 ? ((campaign.replied / campaign.sent) * 100).toFixed(1) : 0}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Completed Campaigns</CardTitle>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  New All-in-One Campaign
                </Button>
              </div>
              <CardDescription>Your completed all-in-one campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Campaign Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Prospects</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Found</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Verified</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Sent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Replied</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allInOneStats.recentCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b">
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="py-3 px-4">{formatDate(campaign.date)}</td>
                        <td className="py-3 px-4">{campaign.prospects.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {campaign.found.toLocaleString()} ({((campaign.found / campaign.prospects) * 100).toFixed(1)}
                          %)
                        </td>
                        <td className="py-3 px-4">
                          {campaign.verified.toLocaleString()} (
                          {((campaign.verified / campaign.found) * 100).toFixed(1)}%)
                        </td>
                        <td className="py-3 px-4">
                          {campaign.sent.toLocaleString()} ({((campaign.sent / campaign.verified) * 100).toFixed(1)}%)
                        </td>
                        <td className="py-3 px-4">
                          {campaign.replied.toLocaleString()} ({((campaign.replied / campaign.sent) * 100).toFixed(1)}%)
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(campaign.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="h-4 w-4 mr-1" />
                              Duplicate
                            </Button>
                            <Button variant="outline" size="sm">
                              View
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
        </div>
      </TabsContent>

      {/* Streaming Tab */}
      <TabsContent value="streaming">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Campaign Process</CardTitle>
              <div className="flex space-x-2">
                {streamingActive ? (
                  <Button variant="outline" onClick={stopStreaming}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" disabled={!streamingService} onClick={() => setStreamingActive(true)}>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              {streamingActive && streamingService === "all-in-one"
                ? `All-in-one campaign in progress - ${streamingProgress.toFixed(1)}% complete`
                : "No active campaign process"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {streamingService === "all-in-one" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>
                      {streamingStats.processed} / {streamingStats.total} prospects
                    </span>
                  </div>
                  <Progress value={streamingProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Processed</div>
                    <div className="text-lg font-semibold">{streamingStats.processed}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Emails Found</div>
                    <div className="text-lg font-semibold text-blue-600">{streamingStats.success}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Verified</div>
                    <div className="text-lg font-semibold text-green-600">{streamingStats.success}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Sent</div>
                    <div className="text-lg font-semibold text-purple-600">{streamingStats.success}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Time Elapsed</div>
                    <div className="text-lg font-semibold">{streamingStats.timeElapsed}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Estimated Time Remaining</div>
                    <div className="text-lg font-semibold">{streamingStats.estimatedTimeRemaining}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Process Logs</h3>
                  <div className="bg-black text-white p-4 rounded-lg h-64 overflow-y-auto font-mono text-xs">
                    {streamingLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`mb-1 ${log.type === "warning" ? "text-yellow-400" : "text-amber-400"}`}
                      >
                        [{log.timestamp}] {log.message}
                      </div>
                    ))}
                    {streamingActive && (
                      <div className="animate-pulse">
                        <Loader2 className="h-4 w-4 inline-block mr-2 animate-spin" />
                        Running...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Zap className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Campaign</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Start a new all-in-one campaign or view a running campaign to see live progress here.
                </p>
                <Button onClick={() => setActiveSetupTab("setup")}>Start New Campaign</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
