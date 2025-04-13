"use client"
import React from "react"
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
import { CheckCircle, Download, Upload, FileUp, List, Eye, XCircle, Loader2, Send, Pause, Play } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define interfaces for the component props and data structures
interface VerificationBatch {
  id: string;
  name: string;
  date: string;
  total: number;
  processed: number;
  valid: number;
  invalid: number;
  risky?: number;
  progress: number;
  status: string;
}

interface VerificationStats {
  totalVerified: number;
  validEmails: number;
  invalidEmails: number;
  riskyEmails: number;
  verificationRate: number;
  runningBatches: VerificationBatch[];
  recentBatches: VerificationBatch[];
}

interface VerificationForm {
  name: string;
  mode: string;
  threshold: string;
  deduplication: boolean;
  catchAll: boolean;
  disposable: boolean;
  syntax: boolean;
  domain: boolean;
  mailbox: boolean;
  file: File | null;
  fileName: string;
  emailList: string;
}

interface StreamingStats {
  processed: number;
  total: number;
  success: number;
  failed: number;
  timeElapsed: string;
  estimatedTimeRemaining: string;
}

interface StreamingLog {
  id: number | string;
  timestamp: string;
  message: string;
  type: string;
}

interface VerificationTabProps {
  verificationStats: VerificationStats;
  verificationForm: VerificationForm;
  setVerificationForm: React.Dispatch<React.SetStateAction<VerificationForm>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  handleVerificationSubmit: (e: React.FormEvent) => void;
  streamingService: string | null;
  streamingActive: boolean;
  streamingProgress: number;
  streamingStats: StreamingStats;
  streamingLogs: StreamingLog[];
  startStreaming: (service: string, total: number) => void;
  stopStreaming: () => void;
  setActiveSetupTab: (tab: string) => void;
  streamingRef: React.RefObject<HTMLDivElement>;
  getStatusBadge: (status: string) => JSX.Element;
  formatDate: (dateString: string) => string;
  setStreamingActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerificationTab({
  verificationStats,
  verificationForm,
  setVerificationForm,
  handleFileChange,
  handleVerificationSubmit,
  streamingService,
  streamingActive,
  streamingProgress,
  streamingStats,
  streamingLogs,
  startStreaming,
  stopStreaming,
  setActiveSetupTab,
  streamingRef,
  getStatusBadge,
  formatDate,
  setStreamingActive,
}: VerificationTabProps) {
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
              <CardTitle className="text-sm font-medium text-gray-500">Total Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{verificationStats.totalVerified.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Lifetime verified emails</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Valid Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{verificationStats.validEmails.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">{verificationStats.verificationRate}% verification rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Invalid Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{verificationStats.invalidEmails.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((verificationStats.invalidEmails / verificationStats.totalVerified) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Risky Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{verificationStats.riskyEmails.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                {((verificationStats.riskyEmails / verificationStats.totalVerified) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Verification</CardTitle>
            <CardDescription>Verify a list of email addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerificationSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="verification-name">Verification Name</Label>
                  <Input
                    id="verification-name"
                    placeholder="e.g., Marketing List June 2023"
                    value={verificationForm.name}
                    onChange={(e) => setVerificationForm({ ...verificationForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="verification-mode">Verification Mode</Label>
                    <Select
                      value={verificationForm.mode}
                      onValueChange={(value) => setVerificationForm({ ...verificationForm, mode: value })}
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
                      value={verificationForm.threshold}
                      onValueChange={(value) => setVerificationForm({ ...verificationForm, threshold: value })}
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

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>Advanced Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="deduplication">Deduplication</Label>
                            <p className="text-xs text-gray-500">Remove duplicate email addresses</p>
                          </div>
                          <Switch
                            id="deduplication"
                            checked={verificationForm.deduplication}
                            onCheckedChange={(checked) =>
                              setVerificationForm({ ...verificationForm, deduplication: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="catch-all">Catch-All Detection</Label>
                            <p className="text-xs text-gray-500">Identify catch-all email domains</p>
                          </div>
                          <Switch
                            id="catch-all"
                            checked={verificationForm.catchAll}
                            onCheckedChange={(checked) =>
                              setVerificationForm({ ...verificationForm, catchAll: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="disposable">Disposable Email Detection</Label>
                            <p className="text-xs text-gray-500">Identify temporary email addresses</p>
                          </div>
                          <Switch
                            id="disposable"
                            checked={verificationForm.disposable}
                            onCheckedChange={(checked) =>
                              setVerificationForm({ ...verificationForm, disposable: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="syntax">Syntax Checking</Label>
                            <p className="text-xs text-gray-500">Validate email format</p>
                          </div>
                          <Switch
                            id="syntax"
                            checked={verificationForm.syntax}
                            onCheckedChange={(checked) => setVerificationForm({ ...verificationForm, syntax: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="domain">Domain Checking</Label>
                            <p className="text-xs text-gray-500">Validate domain existence and MX records</p>
                          </div>
                          <Switch
                            id="domain"
                            checked={verificationForm.domain}
                            onCheckedChange={(checked) => setVerificationForm({ ...verificationForm, domain: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="mailbox">Mailbox Checking</Label>
                            <p className="text-xs text-gray-500">Validate mailbox existence</p>
                          </div>
                          <Switch
                            id="mailbox"
                            checked={verificationForm.mailbox}
                            onCheckedChange={(checked) =>
                              setVerificationForm({ ...verificationForm, mailbox: checked })
                            }
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator />

                <div>
                  <Label>Email Source</Label>
                  <RadioGroup defaultValue="file" className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <RadioGroupItem value="file" id="file" className="peer sr-only" />
                      <Label
                        htmlFor="file"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <FileUp className="mb-3 h-6 w-6" />
                        Upload File
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="paste" id="paste" className="peer sr-only" />
                      <Label
                        htmlFor="paste"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <List className="mb-3 h-6 w-6" />
                        Paste Emails
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop your file here</p>
                    <p className="text-xs text-gray-500 mb-3">Supports CSV, TXT, XLS, XLSX (max 100MB)</p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".csv,.txt,.xls,.xlsx"
                      onChange={(e) => handleFileChange(e, "verification")}
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                    {verificationForm.fileName && (
                      <p className="text-sm text-primary mt-2">{verificationForm.fileName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email-list">Or paste email addresses (one per line)</Label>
                    <Textarea
                      id="email-list"
                      placeholder="john@example.com&#10;jane@example.com&#10;..."
                      className="h-32"
                      value={verificationForm.emailList}
                      onChange={(e) => setVerificationForm({ ...verificationForm, emailList: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Start Verification
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
          {verificationStats.runningBatches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Running Verifications</CardTitle>
                <CardDescription>Currently active verification processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationStats.runningBatches.map((batch) => (
                    <div key={batch.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{batch.name}</h3>
                          <p className="text-sm text-gray-500">Started on {formatDate(batch.date)}</p>
                        </div>
                        <div className="flex items-center">
                          {getStatusBadge(batch.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => startStreaming("verification", batch.total)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Live
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {batch.progress}%</span>
                          <span>
                            {batch.processed} / {batch.total} processed
                          </span>
                        </div>
                        <Progress value={batch.progress} className="h-2" />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>
                              Valid: {batch.valid} ({((batch.valid / batch.processed) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>
                              Invalid: {batch.invalid} ({((batch.invalid / batch.processed) * 100).toFixed(1)}%)
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
                <CardTitle>Completed Verifications</CardTitle>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  New Verification
                </Button>
              </div>
              <CardDescription>Your completed email verification batches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Batch Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Valid</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Invalid</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationStats.recentBatches.map((batch) => (
                      <tr key={batch.id} className="border-b">
                        <td className="py-3 px-4">{batch.name}</td>
                        <td className="py-3 px-4">{formatDate(batch.date)}</td>
                        <td className="py-3 px-4">{batch.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          {batch.valid.toLocaleString()} ({((batch.valid / batch.total) * 100).toFixed(1)}%)
                        </td>
                        <td className="py-3 px-4">
                          {batch.invalid.toLocaleString()} ({((batch.invalid / batch.total) * 100).toFixed(1)}%)
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(batch.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Send to Finder
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
      <TabsContent value="streaming" ref={streamingRef}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Verification Process</CardTitle>
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
              {streamingActive
                ? `Verification in progress - ${streamingProgress.toFixed(1)}% complete`
                : "No active verification process"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {streamingService ? (
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
                    <div className="text-xs text-gray-500">Processed</div>
                    <div className="text-lg font-semibold">{streamingStats.processed}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Valid</div>
                    <div className="text-lg font-semibold text-green-600">{streamingStats.success}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Invalid</div>
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
                        className={`mb-1 ${log.type === "warning" ? "text-yellow-400" : "text-green-400"}`}
                      >
                        [{log.timestamp}] {log.message}
                      </div>
                    ))}
                    {streamingActive && (
                      <div className="animate-pulse">
                        <Loader2 className="h-4 w-4 inline-block mr-2 animate-spin" />
                        Processing...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Verification</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Start a new verification process or view a running verification to see live progress here.
                </p>
                <Button onClick={() => setActiveSetupTab("setup")}>Start New Verification</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
