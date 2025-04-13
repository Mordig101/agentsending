"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Send,
  FileText,
  Copy,
  Mail,
  MessageSquare,
  Paperclip,
  FileUp,
  List,
  Upload,
  Eye,
  Trash2,
  Loader2,
  Pause,
  Play,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { SenderStats, SenderFormData, StreamingStats, StreamingLog, EmailTemplate } from "../dashboard/types"
import type { ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"

interface SenderTabProps {
  senderStats: SenderStats
  senderForm: SenderFormData
  setSenderForm: Dispatch<SetStateAction<SenderFormData>>
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, service: string) => void
  handleSenderSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleAttachmentChange: (e: ChangeEvent<HTMLInputElement>) => void
  removeAttachment: (index: number) => void
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
  selectTemplate: (templateId: string) => void
  emailTemplates: EmailTemplate[]
  setStreamingActive: Dispatch<SetStateAction<boolean>>
}

export default function SenderTab({
  senderStats,
  senderForm,
  setSenderForm,
  handleFileChange,
  handleSenderSubmit,
  handleAttachmentChange,
  removeAttachment,
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
  selectTemplate,
  emailTemplates,
  setStreamingActive,
}: SenderTabProps) {
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
              <CardTitle className="text-sm font-medium text-gray-500">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{senderStats.totalSent.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Lifetime emails sent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Delivery Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{senderStats.deliveryRate}%</div>
              <p className="text-xs text-gray-500 mt-1">{senderStats.delivered.toLocaleString()} delivered emails</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{senderStats.openRate}%</div>
              <p className="text-xs text-gray-500 mt-1">{senderStats.opened.toLocaleString()} opened emails</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Reply Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{senderStats.replyRate}%</div>
              <p className="text-xs text-gray-500 mt-1">{senderStats.replied.toLocaleString()} replied emails</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Email Campaign</CardTitle>
            <CardDescription>Create and send a new email campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSenderSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Product Launch Announcement"
                    value={senderForm.name}
                    onChange={(e) => setSenderForm({ ...senderForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="campaign-objective">Campaign Objective</Label>
                  <Select
                    value={senderForm.objective}
                    onValueChange={(value) => setSenderForm({ ...senderForm, objective: value })}
                  >
                    <SelectTrigger id="campaign-objective">
                      <SelectValue placeholder="Select campaign objective" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      placeholder="e.g., John Smith"
                      value={senderForm.fromName}
                      onChange={(e) => setSenderForm({ ...senderForm, fromName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      placeholder="e.g., john@example.com"
                      type="email"
                      value={senderForm.fromEmail}
                      onChange={(e) => setSenderForm({ ...senderForm, fromEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email-template">Email Template</Label>
                  <Select value={senderForm.templateId} onValueChange={(value) => selectTemplate(value)}>
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
                    value={senderForm.subject}
                    onChange={(e) => setSenderForm({ ...senderForm, subject: e.target.value })}
                    required
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
                    value={senderForm.emailBody}
                    onChange={(e) => setSenderForm({ ...senderForm, emailBody: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {`{First Name}`}, {`{Company}`}, etc. for personalization
                  </p>
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed rounded-md p-6 mt-2 flex flex-col items-center justify-center">
                    <Paperclip className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                    <p className="text-xs text-gray-500 mb-3">Supports PDF, DOC, JPG, PNG (max 10MB each)</p>
                    <input
                      type="file"
                      id="attachment-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleAttachmentChange}
                    />
                    <label htmlFor="attachment-upload">
                      <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                  </div>

                  {senderForm.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Attached Files</Label>
                      {senderForm.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{attachment.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(attachment.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <Label>Recipients</Label>
                  <RadioGroup defaultValue="paste" className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <RadioGroupItem value="file" id="recipient-file" className="peer sr-only" />
                      <Label
                        htmlFor="recipient-file"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <FileUp className="mb-3 h-6 w-6" />
                        Upload Recipient List
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="paste" id="recipient-paste" className="peer sr-only" />
                      <Label
                        htmlFor="recipient-paste"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <List className="mb-3 h-6 w-6" />
                        Paste Recipients
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop your recipient file here</p>
                    <p className="text-xs text-gray-500 mb-3">Supports CSV, TXT, XLS, XLSX (max 100MB)</p>
                    <input
                      type="file"
                      id="recipient-upload"
                      className="hidden"
                      accept=".csv,.txt,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e, "sender")}
                    />
                    <label htmlFor="recipient-upload">
                      <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                    {senderForm.recipientFileName && (
                      <p className="text-sm text-primary mt-2">{senderForm.recipientFileName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="recipient-list">Or paste email addresses (one per line)</Label>
                    <Textarea
                      id="recipient-list"
                      placeholder="john@example.com&#10;jane@example.com&#10;..."
                      className="h-32"
                      value={senderForm.recipients}
                      onChange={(e) => setSenderForm({ ...senderForm, recipients: e.target.value })}
                    />
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>Advanced Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-2">
                        <div>
                          <Label htmlFor="sending-schedule">Sending Schedule</Label>
                          <Select
                            value={senderForm.schedule}
                            onValueChange={(value) => setSenderForm({ ...senderForm, schedule: value })}
                          >
                            <SelectTrigger id="sending-schedule">
                              <SelectValue placeholder="Select sending schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="now">Send Immediately</SelectItem>
                              <SelectItem value="scheduled">Schedule for Later</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {senderForm.schedule === "scheduled" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="schedule-date">Date</Label>
                              <Input
                                id="schedule-date"
                                type="date"
                                value={senderForm.scheduleDate}
                                onChange={(e) => setSenderForm({ ...senderForm, scheduleDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="schedule-time">Time</Label>
                              <Input
                                id="schedule-time"
                                type="time"
                                value={senderForm.scheduleTime}
                                onChange={(e) => setSenderForm({ ...senderForm, scheduleTime: e.target.value })}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Label htmlFor="sending-limit">Daily Sending Limit</Label>
                          <Select
                            value={senderForm.sendingLimit}
                            onValueChange={(value) => setSenderForm({ ...senderForm, sendingLimit: value })}
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
                            value={senderForm.sendInterval}
                            onValueChange={(value) => setSenderForm({ ...senderForm, sendInterval: value })}
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

                        <div>
                          <Label htmlFor="follow-ups">Follow-up Emails</Label>
                          <Select
                            value={senderForm.followUps.toString()}
                            onValueChange={(value) =>
                              setSenderForm({ ...senderForm, followUps: Number.parseInt(value) })
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

                        {senderForm.followUps > 0 && (
                          <div>
                            <Label htmlFor="follow-up-interval">Follow-up Interval (days)</Label>
                            <Select
                              value={senderForm.followUpInterval.toString()}
                              onValueChange={(value) =>
                                setSenderForm({ ...senderForm, followUpInterval: Number.parseInt(value) })
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
                              checked={senderForm.trackOpens}
                              onCheckedChange={(checked) => setSenderForm({ ...senderForm, trackOpens: checked })}
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
                              checked={senderForm.trackClicks}
                              onCheckedChange={(checked) => setSenderForm({ ...senderForm, trackClicks: checked })}
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
                              checked={senderForm.personalizeSubject}
                              onCheckedChange={(checked) =>
                                setSenderForm({ ...senderForm, personalizeSubject: checked })
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
                              checked={senderForm.personalizeFirstLine}
                              onCheckedChange={(checked) =>
                                setSenderForm({ ...senderForm, personalizeFirstLine: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Start Campaign
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
          {senderStats.runningCampaigns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Running Campaigns</CardTitle>
                <CardDescription>Currently active email campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {senderStats.runningCampaigns.map((campaign) => (
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
                            onClick={() => startStreaming("sender", campaign.total)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Live
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {campaign.progress}%</span>
                          <span>
                            {campaign.sent} / {campaign.total} sent
                          </span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-blue-500 mr-1" />
                            <span>
                              Opened: {campaign.opened} ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                            <span>
                              Replied: {campaign.replied} ({((campaign.replied / campaign.sent) * 100).toFixed(1)}
                              %)
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
                  <Send className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
              <CardDescription>Your completed email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Campaign Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Sent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Opened</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Replied</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {senderStats.recentCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b">
                        <td className="py-3 px-4">{campaign.name}</td>
                        <td className="py-3 px-4">{formatDate(campaign.date)}</td>
                        <td className="py-3 px-4">{campaign.sent.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {campaign.opened.toLocaleString()} ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
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
              {streamingActive && streamingService === "sender"
                ? `Email campaign in progress - ${streamingProgress.toFixed(1)}% complete`
                : "No active campaign process"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {streamingService === "sender" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>
                      {streamingStats.processed} / {streamingStats.total} emails
                    </span>
                  </div>
                  <Progress value={streamingProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Sent</div>
                    <div className="text-lg font-semibold">{streamingStats.processed}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Delivered</div>
                    <div className="text-lg font-semibold text-green-600">{streamingStats.success}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Bounced</div>
                    <div className="text-lg font-semibold text-red-600">{streamingStats.failed}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Remaining</div>
                    <div className="text-lg font-semibold">{streamingStats.total - streamingStats.processed}</div>
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
                        className={`mb-1 ${log.type === "warning" ? "text-yellow-400" : "text-purple-400"}`}
                      >
                        [{log.timestamp}] {log.message}
                      </div>
                    ))}
                    {streamingActive && (
                      <div className="animate-pulse">
                        <Loader2 className="h-4 w-4 inline-block mr-2 animate-spin" />
                        Sending...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Send className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Campaign</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Start a new email campaign or view a running campaign to see live progress here.
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
