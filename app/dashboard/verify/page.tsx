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
import { CheckCircle, Download, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VerifyPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState<File | null>(null)
  const [emails, setEmails] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[] | null>(null)
  const [error, setError] = useState("")

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

  const handleEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmails(e.target.value)
  }

  const startVerification = () => {
    if (activeTab === "upload" && !file) {
      setError("Please upload a CSV file")
      return
    }

    if (activeTab === "manual" && !emails.trim()) {
      setError("Please enter at least one email address")
      return
    }

    setIsVerifying(true)
    setProgress(0)
    setError("")

    // Simulate verification process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsVerifying(false)

          // Generate mock results
          const mockEmails =
            activeTab === "manual"
              ? emails
                  .split(/[\n,]/)
                  .map((e) => e.trim())
                  .filter((e) => e)
              : ["john@example.com", "invalid@nonexistent.xyz", "sarah@company.co", "test@disposable.temp"]

          const mockResults = mockEmails.map((email) => ({
            email,
            status: Math.random() > 0.2 ? "Valid" : Math.random() > 0.5 ? "Invalid" : "Risky",
            score: Math.floor(Math.random() * 100),
            details: {
              format: Math.random() > 0.1,
              domain: Math.random() > 0.2,
              disposable: Math.random() > 0.8,
              spam_trap: Math.random() > 0.9,
              mailbox: Math.random() > 0.3,
            },
          }))

          setResults(mockResults)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }

  const downloadResults = () => {
    if (!results) return

    // Create CSV content
    const headers = [
      "Email",
      "Status",
      "Risk Score",
      "Format Valid",
      "Domain Valid",
      "Disposable",
      "Spam Trap",
      "Mailbox Valid",
    ]
    const csvContent = [
      headers.join(","),
      ...results.map((r) =>
        [
          r.email,
          r.status,
          r.score,
          r.details.format ? "Yes" : "No",
          r.details.domain ? "Yes" : "No",
          r.details.disposable ? "Yes" : "No",
          r.details.spam_trap ? "Yes" : "No",
          r.details.mailbox ? "Yes" : "No",
        ].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "email_verification_results.csv")
    a.click()
  }

  const resetVerification = () => {
    setFile(null)
    setEmails("")
    setResults(null)
    setProgress(0)
    setIsVerifying(false)
    setError("")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Email Verification</h1>
        <p className="text-gray-500">Verify email addresses for validity and deliverability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Verify Emails</CardTitle>
              <CardDescription>Upload a CSV file or manually enter email addresses to verify</CardDescription>
            </CardHeader>
            <CardContent>
              {!results ? (
                <>
                  <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                      <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Drag and drop your CSV file here, or click to browse
                        </p>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="file-upload" asChild>
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
                        <Label htmlFor="emails">Email Addresses</Label>
                        <Textarea
                          id="emails"
                          placeholder="Enter email addresses (one per line or comma-separated)"
                          className="mt-1 h-40"
                          value={emails}
                          onChange={handleEmailsChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Example: john@example.com, sarah@company.co</p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <X className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-6">
                    <Button onClick={startVerification} disabled={isVerifying} className="w-full">
                      {isVerifying ? "Verifying..." : "Start Verification"}
                    </Button>
                  </div>

                  {isVerifying && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Verification in progress...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Verification Results</h3>
                      <p className="text-sm text-gray-500">{results.length} emails processed</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={resetVerification}>
                        New Verification
                      </Button>
                      <Button onClick={downloadResults}>
                        <Download className="h-4 w-4 mr-2" />
                        Download CSV
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Risk Score</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{result.email}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  result.status === "Valid"
                                    ? "bg-green-100 text-green-800"
                                    : result.status === "Invalid"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {result.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div
                                  className={`w-10 h-2 rounded-full mr-2 ${
                                    result.score > 70
                                      ? "bg-green-500"
                                      : result.score > 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                <span>{result.score}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                                    result.details.format ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  Format: {result.details.format ? "Valid" : "Invalid"}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                                    result.details.domain ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  Domain: {result.details.domain ? "Valid" : "Invalid"}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                                    !result.details.disposable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {result.details.disposable ? "Disposable" : "Not Disposable"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Verification Guide</CardTitle>
              <CardDescription>How email verification works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Format Validation</h4>
                    <p className="text-sm text-gray-500">Checks if the email follows the correct syntax pattern.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Domain Validation</h4>
                    <p className="text-sm text-gray-500">Verifies if the domain exists and has valid MX records.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Mailbox Verification</h4>
                    <p className="text-sm text-gray-500">Checks if the mailbox exists on the mail server.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Disposable Detection</h4>
                    <p className="text-sm text-gray-500">Identifies temporary or disposable email addresses.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Spam Trap Detection</h4>
                    <p className="text-sm text-gray-500">Identifies potential spam trap email addresses.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Bulk Verification Limits</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Free Plan: 100 emails per day</li>
                  <li>Professional Plan: 5,000 emails per day</li>
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
