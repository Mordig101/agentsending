"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  CheckCircle,
  Download,
  Upload,
  FileUp,
  List,
  Eye,
  XCircle,
  Loader2,
  Send,
  Pause,
  Play,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { apiEndpoints } from "@/app/config/verifier/api"
import type {
  VerificationStats,
  VerificationForm,
  StreamingStats,
  StreamingLog,
  CategoryStats,
  BatchListResponse,
  VerificationBatch,
} from "./types"
import {
  loadBatchNames,
  saveBatchNames,
  addBatchName,
  getBatchName,
  parseEmails,
  calculateVerificationRate,
  formatVerificationDate,
  generateRandomBatchName,
} from "./utils/verification"

interface VerificationTabProps {
  verificationStats: VerificationStats
  setVerificationStats: React.Dispatch<React.SetStateAction<VerificationStats>>
  verificationForm: VerificationForm
  setVerificationForm: React.Dispatch<React.SetStateAction<VerificationForm>>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void
  streamingService: string | null
  streamingActive: boolean
  streamingProgress: number
  streamingStats: StreamingStats
  streamingLogs: StreamingLog[]
  setStreamingService: React.Dispatch<React.SetStateAction<string | null>>
  setStreamingActive: React.Dispatch<React.SetStateAction<boolean>>
  setStreamingProgress: React.Dispatch<React.SetStateAction<number>>
  setStreamingStats: React.Dispatch<React.SetStateAction<StreamingStats>>
  setStreamingLogs: React.Dispatch<React.SetStateAction<StreamingLog[]>>
  stopStreaming: () => void
  setActiveSetupTab: (tab: string) => void
  getStatusBadge: (status: string) => JSX.Element
  formatDate: (dateString: string) => string
}

export default function VerificationTab({
  verificationStats,
  setVerificationStats,
  verificationForm,
  setVerificationForm,
  handleFileChange,
  streamingService,
  streamingActive,
  streamingProgress,
  streamingStats,
  streamingLogs,
  setStreamingService,
  setStreamingActive,
  setStreamingProgress,
  setStreamingStats,
  setStreamingLogs,
  stopStreaming,
  setActiveSetupTab,
  getStatusBadge,
  formatDate,
}: VerificationTabProps) {
  const streamingRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState("setup")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null)
  const [batchDetails, setBatchDetails] = useState<any | null>(null)

  // Fetch statistics on component mount
  useEffect(() => {
    fetchVerificationStats()
    fetchBatches()
  }, [])

  // Fetch verification statistics
  const fetchVerificationStats = async () => {
    try {
      const response = await fetch(apiEndpoints.statistics.getStatsByCategory)
      const data: CategoryStats = await response.json()

      if (data && data.categories) {
        const { valid, invalid, risky, total } = data.categories
        const verificationRate = calculateVerificationRate(valid, total)

        setVerificationStats((prev) => ({
          ...prev,
          totalVerified: total,
          validEmails: valid,
          invalidEmails: invalid,
          riskyEmails: risky || 0,
          verificationRate,
        }))
      }
    } catch (error) {
      console.error("Error fetching verification statistics:", error)
    }
  }

  // Fetch all batches
  const fetchBatches = async () => {
    try {
      const response = await fetch(apiEndpoints.results.getBatchIds)
      const data: BatchListResponse = await response.json()

      if (data && data.batch_ids) {
        const batchNames = loadBatchNames()

        // Generate random names for batches that don't have names
        data.batch_ids.forEach((batchId) => {
          if (!batchNames[batchId]) {
            batchNames[batchId] = generateRandomBatchName()
          }
        })

        saveBatchNames(batchNames)

        // Fetch details for each batch
        const batchPromises = data.batch_ids.map((batchId) =>
          fetch(apiEndpoints.verification.checkStatus(batchId))
            .then((res) => res.json())
            .catch((err) => {
              console.error(`Error fetching batch ${batchId}:`, err)
              return null
            }),
        )

        const batchResults = await Promise.all(batchPromises)
        const validBatchResults = batchResults.filter((batch) => batch !== null)

        // Process batch results
        const runningBatches: VerificationBatch[] = []
        const completedBatches: VerificationBatch[] = []

        validBatchResults.forEach((batch, index) => {
          if (!batch) return

          const batchId = data.batch_ids[index]
          const batchName = getBatchName(batchId)
          const isRunning = batch.status !== "completed"

          const batchData: VerificationBatch = {
            id: batchId,
            name: batchName,
            date: formatVerificationDate(batch.timestamp),
            total: batch.total_emails || 0,
            processed: batch.verified_emails || 0,
            valid: batch.results?.valid || 0,
            invalid: batch.results?.invalid || 0,
            risky: batch.results?.risky || 0,
            status: batch.status,
            progress: isRunning ? Math.round((batch.verified_emails / batch.total_emails) * 100) : 100,
          }

          if (isRunning) {
            runningBatches.push(batchData)
          } else {
            completedBatches.push(batchData)
          }
        })

        // Sort batches by date (newest first)
        runningBatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        completedBatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setVerificationStats((prev) => ({
          ...prev,
          runningBatches,
          recentBatches: completedBatches,
        }))
      }
    } catch (error) {
      console.error("Error fetching batches:", error)
    }
  }

  // Handle verification form submission
  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prepare emails from either file or text input
      let emails: string[] = []

      if (verificationForm.file) {
        // Handle file upload
        const fileContent = await verificationForm.file.text()
        emails = parseEmails(fileContent)
      } else if (verificationForm.emailList) {
        // Handle pasted emails
        emails = parseEmails(verificationForm.emailList)
      }

      if (emails.length === 0) {
        alert("Please provide emails to verify")
        setIsLoading(false)
        return
      }

      // Start streaming verification process
      startBatchVerification(emails)
    } catch (error) {
      console.error("Error submitting verification:", error)
      setIsLoading(false)
    }
  }

  // Start batch verification and handle streaming response
  const startBatchVerification = async (emails: string[]) => {
    try {
      // Initialize streaming state
      setStreamingService("verification")
      setStreamingActive(true)
      setStreamingProgress(0)
      setStreamingStats({
        processed: 0,
        total: emails.length,
        success: 0,
        failed: 0,
        timeElapsed: "00:00:00",
        estimatedTimeRemaining: "Calculating...",
      })
      setStreamingLogs([
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: "Starting verification process...",
          type: "info",
        },
      ])

      // Switch to streaming tab
      setActiveTab("streaming")

      // Scroll to streaming section
      if (streamingRef.current) {
        streamingRef.current.scrollIntoView({ behavior: "smooth" })
      }

      // Start time for elapsed time calculation
      const startTime = new Date()

      // Make the API request with streaming response
      const response = await fetch(apiEndpoints.verification.verifyBatch, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails }),
      })

      if (!response.body) {
        throw new Error("Response body is null")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let batchId: string | null = null
      let validCount = 0
      let invalidCount = 0
      let riskyCount = 0
      let processedCount = 0

      // Process the stream
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n").filter((line) => line.trim())

        for (const line of lines) {
          try {
            const data = JSON.parse(line)

            // Handle batch start/end messages
            if (data.job_id) {
              if (data.status === "started") {
                batchId = data.job_id

                // Save batch name
                if (verificationForm.name) {
                  addBatchName(batchId, verificationForm.name)
                } else {
                  addBatchName(batchId, generateRandomBatchName())
                }

                setStreamingLogs((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: `Batch verification started. Job ID: ${batchId}`,
                    type: "info",
                  },
                ])
              } else if (data.status === "completed") {
                setStreamingLogs((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: `Batch verification completed. Results: ${data.results.valid} valid, ${data.results.invalid} invalid, ${data.results.risky} risky`,
                    type: "info",
                  },
                ])

                // Update stats one last time
                setStreamingProgress(100)
                setStreamingStats((prev) => ({
                  ...prev,
                  processed: data.total_emails,
                  success: data.results.valid,
                  failed: data.results.invalid + data.results.risky,
                  timeElapsed: calculateElapsedTime(startTime),
                  estimatedTimeRemaining: "00:00:00",
                }))

                // Refresh batches after completion
                fetchBatches()
                fetchVerificationStats()
              }
            }
            // Handle individual email verification results
            else if (data.email) {
              processedCount++

              if (data.category === "valid") {
                validCount++
              } else if (data.category === "invalid") {
                invalidCount++
              } else if (data.category === "risky") {
                riskyCount++
              }

              // Update progress
              const progress = Math.round((processedCount / emails.length) * 100)
              setStreamingProgress(progress)

              // Update stats
              setStreamingStats((prev) => {
                const elapsed = calculateElapsedTime(startTime)
                const remaining = calculateRemainingTime(startTime, processedCount, emails.length)

                return {
                  ...prev,
                  processed: processedCount,
                  success: validCount,
                  failed: invalidCount + riskyCount,
                  timeElapsed: elapsed,
                  estimatedTimeRemaining: remaining,
                }
              })

              // Add log entry (but not for every email to avoid overwhelming the UI)
              if (processedCount % 5 === 0 || processedCount === emails.length) {
                setStreamingLogs((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    message: `Verified ${data.email}: ${data.category}`,
                    type: data.category === "valid" ? "info" : "warning",
                  },
                ])
              }
            }
          } catch (error) {
            console.error("Error parsing stream chunk:", error, line)
          }
        }
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error in batch verification:", error)
      setStreamingLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          type: "warning",
        },
      ])
      setIsLoading(false)
    }
  }

  // Helper function to calculate elapsed time
  const calculateElapsedTime = (startTime: Date): string => {
    const elapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
    const hours = Math.floor(elapsed / 3600)
    const minutes = Math.floor((elapsed % 3600) / 60)
    const seconds = elapsed % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Helper function to calculate remaining time
  const calculateRemainingTime = (startTime: Date, processed: number, total: number): string => {
    if (processed === 0) return "Calculating..."

    const elapsed = (new Date().getTime() - startTime.getTime()) / 1000
    const rate = elapsed / processed
    const remaining = Math.max(0, rate * (total - processed))

    const hours = Math.floor(remaining / 3600)
    const minutes = Math.floor((remaining % 3600) / 60)
    const seconds = Math.floor(remaining % 60)

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Start streaming for an existing batch
  const startStreamingForBatch = (batchId: string, total: number) => {
    setSelectedBatchId(batchId)
    setStreamingService("verification")
    setStreamingActive(true)
    setStreamingProgress(0)
    setStreamingStats({
      processed: 0,
      total: total,
      success: 0,
      failed: 0,
      timeElapsed: "00:00:00",
      estimatedTimeRemaining: "Calculating...",
    })
    setStreamingLogs([
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        message: `Connecting to verification stream for batch ${batchId}...`,
        type: "info",
      },
    ])

    // Switch to streaming tab
    setActiveTab("streaming")

    // Fetch batch status
    fetchBatchStatus(batchId)
  }

  // Fetch batch status
  const fetchBatchStatus = async (batchId: string) => {
    try {
      const response = await fetch(apiEndpoints.verification.checkStatus(batchId))
      const data = await response.json()

      if (data) {
        const progress =
          data.status === "completed" ? 100 : Math.round((data.verified_emails / data.total_emails) * 100)

        setStreamingProgress(progress)
        setStreamingStats((prev) => ({
          ...prev,
          processed: data.verified_emails || 0,
          total: data.total_emails || 0,
          success: data.results?.valid || 0,
          failed: (data.results?.invalid || 0) + (data.results?.risky || 0),
        }))

        setStreamingLogs((prev) => [
          ...prev,
          {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            message: `Batch status: ${data.status}. ${data.verified_emails || 0} of ${data.total_emails || 0} emails processed.`,
            type: "info",
          },
        ])

        // If batch is still running, poll for updates
        if (data.status !== "completed") {
          setTimeout(() => fetchBatchStatus(batchId), 3000)
        }
      }
    } catch (error) {
      console.error("Error fetching batch status:", error)
      setStreamingLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: `Error fetching batch status: ${error instanceof Error ? error.message : "Unknown error"}`,
          type: "warning",
        },
      ])
    }
  }

  // View batch details
  const viewBatchDetails = async (batchId: string) => {
    setSelectedBatchId(batchId)
    setActiveTab("view")

    try {
      const response = await fetch(apiEndpoints.results.getBatchResults(batchId))
      const data = await response.json()
      setBatchDetails(data)
    } catch (error) {
      console.error("Error fetching batch details:", error)
      setBatchDetails(null)
    }
  }

  // Export batch results
  const exportBatchResults = async (batchId: string, category = "all") => {
    try {
      window.open(apiEndpoints.results.exportBatchResults(batchId, category), "_blank")
    } catch (error) {
      console.error("Error exporting batch results:", error)
    }
  }

  // Send to Finder
  const sendToFinder = (batchId: string) => {
    // This would typically integrate with the Finder component
    alert(`Sending batch ${batchId} to Finder (not implemented)`)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="setup">Setup & Start</TabsTrigger>
        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
        <TabsTrigger value="view">View Results</TabsTrigger>
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
                {verificationStats.totalVerified > 0
                  ? ((verificationStats.invalidEmails / verificationStats.totalVerified) * 100).toFixed(1)
                  : "0"}
                % of total
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
                {verificationStats.totalVerified > 0
                  ? ((verificationStats.riskyEmails / verificationStats.totalVerified) * 100).toFixed(1)
                  : "0"}
                % of total
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
                        <SelectItem value="deep">Deep Verification </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Choose the level of verification depth</p>
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
                            <Label htmlFor="disposable">Verify Risky Emails</Label>
                            <p className="text-xs text-gray-500">
                              deep verification for Riksy emails(only our AgentSending offer this service)
                            </p>
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
                            <Label htmlFor="syntax">Catch all Domain verification</Label>
                            <p className="text-xs text-gray-500">
                              Deep Verification for emails with our special tools (only our AgentSending offer this
                              service)
                            </p>
                          </div>
                          <Switch
                            id="syntax"
                            checked={verificationForm.syntax}
                            onCheckedChange={(checked) => setVerificationForm({ ...verificationForm, syntax: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="domain">Internet existence</Label>
                            <p className="text-xs text-gray-500">
                              checking if the emails existe in the internet using search engine
                            </p>
                          </div>
                          <Switch
                            id="domain"
                            checked={verificationForm.domain}
                            onCheckedChange={(checked) => setVerificationForm({ ...verificationForm, domain: checked })}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Start Verification
                      </>
                    )}
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
                            onClick={() => startStreamingForBatch(batch.id, batch.total)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Live
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {batch.progress || 0}%</span>
                          <span>
                            {batch.processed || 0} / {batch.total} processed
                          </span>
                        </div>
                        <Progress value={batch.progress || 0} className="h-2" />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>
                              Valid: {batch.valid} (
                              {batch.processed ? ((batch.valid / batch.processed) * 100).toFixed(1) : "0"}%)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>
                              Invalid: {batch.invalid} (
                              {batch.processed ? ((batch.invalid / batch.processed) * 100).toFixed(1) : "0"}%)
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
                <Button onClick={() => setActiveTab("setup")}>
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
                            <Button variant="outline" size="sm" onClick={() => exportBatchResults(batch.id)}>
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => sendToFinder(batch.id)}>
                              <Send className="h-4 w-4 mr-1" />
                              Send to Finder
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => viewBatchDetails(batch.id)}>
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
                <Button onClick={() => setActiveTab("setup")}>Start New Verification</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* View Results Tab */}
      <TabsContent value="view">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Verification Results</CardTitle>
              <div className="flex space-x-2">
                {selectedBatchId && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportBatchResults(selectedBatchId || "", "all")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportBatchResults(selectedBatchId || "", "valid")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Export Valid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportBatchResults(selectedBatchId || "", "invalid")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Export Invalid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportBatchResults(selectedBatchId || "", "risky")}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Export Risky
                    </Button>
                  </>
                )}
              </div>
            </div>  
            <CardTitle></CardTitle>
            <CardDescription>
              {selectedBatchId
                ? `Viewing results for ${getBatchName(selectedBatchId)}`
                : "Select a verification batch to view results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedBatchId && batchDetails ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500">Total Emails</div>
                    <div className="text-2xl font-semibold">{batchDetails.total_emails}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500">Valid</div>
                    <div className="text-2xl font-semibold text-green-600">
                      {batchDetails.results?.valid || 0}
                      <span className="text-sm text-gray-500 ml-1">
                        (
                        {batchDetails.total_emails
                          ? (((batchDetails.results?.valid || 0) / batchDetails.total_emails) * 100).toFixed(1)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500">Invalid</div>
                    <div className="text-2xl font-semibold text-red-600">
                      {batchDetails.results?.invalid || 0}
                      <span className="text-sm text-gray-500 ml-1">
                        (
                        {batchDetails.total_emails
                          ? (((batchDetails.results?.invalid || 0) / batchDetails.total_emails) * 100).toFixed(1)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-500">Risky</div>
                    <div className="text-2xl font-semibold text-amber-600">
                      {batchDetails.results?.risky || 0}
                      <span className="text-sm text-gray-500 ml-1">
                        (
                        {batchDetails.total_emails
                          ? (((batchDetails.results?.risky || 0) / batchDetails.total_emails) * 100).toFixed(1)
                          : 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Emails</TabsTrigger>
                    <TabsTrigger value="valid">Valid</TabsTrigger>
                    <TabsTrigger value="invalid">Invalid</TabsTrigger>
                    <TabsTrigger value="risky">Risky</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Provider</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Verified On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batchDetails.emails?.map((email: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4">{email.email}</td>
                              <td className="py-3 px-4">
                                {email.category === "valid" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Valid
                                  </span>
                                )}
                                {email.category === "invalid" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Invalid
                                  </span>
                                )}
                                {email.category === "risky" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    Risky
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">{email.provider || "Unknown"}</td>
                              <td className="py-3 px-4">{formatDate(email.timestamp)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="valid" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Provider</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Verified On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batchDetails.emails
                            ?.filter((email: any) => email.category === "valid")
                            .map((email: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">{email.email}</td>
                                <td className="py-3 px-4">{email.provider || "Unknown"}</td>
                                <td className="py-3 px-4">{formatDate(email.timestamp)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="invalid" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Provider</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Verified On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batchDetails.emails
                            ?.filter((email: any) => email.category === "invalid")
                            .map((email: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">{email.email}</td>
                                <td className="py-3 px-4">{email.provider || "Unknown"}</td>
                                <td className="py-3 px-4">{formatDate(email.timestamp)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="risky" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Provider</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Verified On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batchDetails.emails
                            ?.filter((email: any) => email.category === "risky")
                            .map((email: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">{email.email}</td>
                                <td className="py-3 px-4">{email.provider || "Unknown"}</td>
                                <td className="py-3 px-4">{formatDate(email.timestamp)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Batch Selected</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Select a verification batch from the Campaigns tab to view detailed results.
                </p>
                <Button onClick={() => setActiveTab("campaigns")}>Go to Campaigns</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
