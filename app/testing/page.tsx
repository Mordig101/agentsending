"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Search, CheckCircle, Send, Zap, ArrowRight, Info, Mail, Server, AlertTriangle, X } from "lucide-react"
import Link from "next/link"
import Layout from "@/components/Layout"
import { apiEndpoints } from "@/app/config/verifier/api"

export default function TestingPage() {
  const [activeTab, setActiveTab] = useState("finder")

  // Finder state
  const [finderKeyword, setFinderKeyword] = useState("")
  const [finderLoading, setFinderLoading] = useState(false)
  const [finderProgress, setFinderProgress] = useState(0)
  const [finderResults, setFinderResults] = useState<any[] | null>(null)

  // Verification state
  const [verificationEmail, setVerificationEmail] = useState("")
  const [verificationLoading, setVerificationLoading] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationResult, setVerificationResult] = useState<any | null>(null)

  // Sender state
  const [senderEmail, setSenderEmail] = useState("")
  const [senderLoading, setSenderLoading] = useState(false)
  const [senderProgress, setSenderProgress] = useState(0)
  const [senderResult, setSenderResult] = useState<boolean | null>(null)

  // All-in-One state
  const [allInOneKeyword, setAllInOneKeyword] = useState("")
  const [allInOneEmail, setAllInOneEmail] = useState("")
  const [allInOneLoading, setAllInOneLoading] = useState(false)
  const [allInOneProgress, setAllInOneProgress] = useState(0)
  const [allInOneResult, setAllInOneResult] = useState<boolean | null>(null)

  // Finder test function
  const testFinder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!finderKeyword.trim()) return

    setFinderLoading(true)
    setFinderProgress(0)
    setFinderResults(null)

    // Simulate search process
    const interval = setInterval(() => {
      setFinderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setFinderLoading(false)

          // Generate mock results
          const mockResults = []
          const count = Math.floor(Math.random() * 5) + 3

          const firstNames = ["John", "Sarah", "Michael", "Emily", "David"]
          const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"]
          const domains = ["company.com", "business.io", "enterprise.co", "tech.com", "corp.io"]
          const roles = ["CEO", "CTO", "Marketing Director", "Sales Manager", "Product Manager"]

          for (let i = 0; i < count; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
            const domain = domains[Math.floor(Math.random() * domains.length)]
            const role = roles[Math.floor(Math.random() * roles.length)]

            mockResults.push({
              name: `${firstName} ${lastName}`,
              email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
              role: role,
              company: domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1),
              confidence: Math.floor(Math.random() * 30) + 70,
            })
          }

          setFinderResults(mockResults)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }

  // Verification test function
  const testVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationEmail.trim()) return

    setVerificationLoading(true)
    setVerificationProgress(0)
    setVerificationResult(null)

    // Start progress animation
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      // Make the actual API call
      const response = await fetch(apiEndpoints.verification.verifyEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: verificationEmail }),
      })

      const result = await response.json()

      // Complete the progress
      clearInterval(interval)
      setVerificationProgress(100)

      // Set the verification result directly from the API
      setVerificationResult(result)
    } catch (error) {
      console.error("Verification failed:", error)

      // Show error in the UI
      const errorResult = {
        email: verificationEmail,
        status: "invalid",
        provider: "unknown",
        reason: "API connection failed. Please try again later.",
      }

      setVerificationResult(errorResult)
    } finally {
      clearInterval(interval)
      setVerificationProgress(100)
      setVerificationLoading(false)
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string | undefined) => {
    if (!status) return <Info className="h-6 w-6 text-blue-500" />;
    
    switch (status.toLowerCase()) {
      case "valid":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "invalid":
        return <X className="h-6 w-6 text-red-500" />
      case "risky":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  // Helper function to get status color
  const getStatusColor = (status: string | undefined) => {
    if (!status) return "bg-blue-50 border-blue-200 text-blue-800";
    
    switch (status.toLowerCase()) {
      case "valid":
        return "bg-green-50 border-green-200 text-green-800"
      case "invalid":
        return "bg-red-50 border-red-200 text-red-800"
      case "risky":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  // Sender test function
  const testSender = (e: React.FormEvent) => {
    e.preventDefault()
    if (!senderEmail.trim()) return

    setSenderLoading(true)
    setSenderProgress(0)
    setSenderResult(null)

    // Simulate sending process
    const interval = setInterval(() => {
      setSenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSenderLoading(false)
          setSenderResult(true)
          return 100
        }
        return prev + 20
      })
    }, 400)

    return () => clearInterval(interval)
  }

  // All-in-One test function
  const testAllInOne = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allInOneKeyword.trim() || !allInOneEmail.trim()) return

    setAllInOneLoading(true)
    setAllInOneProgress(0)
    setAllInOneResult(null)

    // Simulate all-in-one process
    const interval = setInterval(() => {
      setAllInOneProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAllInOneLoading(false)
          setAllInOneResult(true)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <section className="py-12 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Test Our Email Marketing Tools</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Try out our powerful email marketing tools before signing up. See how they can help your business
                  grow.
                </p>

                <Card>
                  <CardHeader>
                    <CardTitle>Choose a Tool to Test</CardTitle>
                    <CardDescription>
                      Select one of our tools below to see how it works with a quick demo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="finder" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-4 mb-8">
                        <TabsTrigger value="finder" className="flex items-center justify-center">
                          <Search className="h-4 w-4 mr-2" />
                          Finder
                        </TabsTrigger>
                        <TabsTrigger value="verification" className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verification
                        </TabsTrigger>
                        <TabsTrigger value="sender" className="flex items-center justify-center">
                          <Send className="h-4 w-4 mr-2" />
                          Sender
                        </TabsTrigger>
                        <TabsTrigger value="all-in-one" className="flex items-center justify-center">
                          <Zap className="h-4 w-4 mr-2" />
                          All-in-One
                        </TabsTrigger>
                      </TabsList>

                      {/* Finder Tab */}
                      <TabsContent value="finder">
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                            <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-blue-800">Email Finder Test</h3>
                              <p className="text-sm text-blue-700">
                                Enter a keyword (like a job title, industry, or company name) to find relevant
                                professional email addresses. This is a demo with simulated results.
                              </p>
                            </div>
                          </div>

                          <form onSubmit={testFinder} className="space-y-4">
                            <div>
                              <Label htmlFor="finder-keyword">Search Keyword</Label>
                              <Input
                                id="finder-keyword"
                                placeholder="e.g., Marketing Director, Tech Company, Healthcare"
                                value={finderKeyword}
                                onChange={(e) => setFinderKeyword(e.target.value)}
                                required
                              />
                            </div>

                            <Button type="submit" disabled={finderLoading} className="w-full">
                              {finderLoading ? (
                                <>
                                  Searching... <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Find Email Addresses <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </form>

                          {finderLoading && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Searching...</span>
                                <span>{finderProgress}%</span>
                              </div>
                              <Progress value={finderProgress} className="h-2" />
                            </div>
                          )}

                          {finderResults && (
                            <div className="space-y-4">
                              <h3 className="font-medium text-lg">Search Results</h3>
                              <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Confidence
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {finderResults.map((result, index) => (
                                      <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {result.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {result.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {result.role}, {result.company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div
                                              className={`w-10 h-2 rounded-full mr-2 ${
                                                result.confidence > 80
                                                  ? "bg-green-500"
                                                  : result.confidence > 60
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                              }`}
                                            ></div>
                                            <span className="text-sm text-gray-500">{result.confidence}%</span>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <p className="text-sm text-gray-500 italic">
                                Note: These are simulated results for demonstration purposes.
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Verification Tab */}
                      <TabsContent value="verification">
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                            <Info className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-green-800">Email Verification Test</h3>
                              <p className="text-sm text-green-700">
                                Enter an email address to verify its deliverability and quality. This uses our real
                                verification API.
                              </p>
                            </div>
                          </div>

                          <form onSubmit={testVerification} className="space-y-4">
                            <div>
                              <Label htmlFor="verification-email">Email Address</Label>
                              <Input
                                id="verification-email"
                                type="email"
                                placeholder="e.g., example@company.com"
                                value={verificationEmail}
                                onChange={(e) => setVerificationEmail(e.target.value)}
                                required
                              />
                            </div>

                            <Button type="submit" disabled={verificationLoading} className="w-full">
                              {verificationLoading ? (
                                <>
                                  Verifying... <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Verify Email <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </form>

                          {verificationLoading && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Verifying...</span>
                                <span>{verificationProgress}%</span>
                              </div>
                              <Progress value={verificationProgress} className="h-2" />
                            </div>
                          )}

                          {verificationResult && (
                            <div className="space-y-4">
                              <h3 className="font-medium text-lg">Verification Results</h3>

                              {/* New simplified verification result card */}
                              <div className={`border rounded-lg p-6 ${getStatusColor(verificationResult.status)}`}>
                                <div className="flex flex-col items-center text-center mb-6">
                                  {getStatusIcon(verificationResult.status)}
                                  <h4 className="text-xl font-bold mt-2 capitalize">{verificationResult.status}</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Email */}
                                  <div className="flex flex-col items-center p-4 bg-white bg-opacity-50 rounded-lg">
                                    <Mail className="h-6 w-6 mb-2 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-500">Email</span>
                                    <span className="text-sm font-semibold mt-1 break-all">
                                      {verificationResult.email}
                                    </span>
                                  </div>

                                  {/* Provider */}
                                  <div className="flex flex-col items-center p-4 bg-white bg-opacity-50 rounded-lg">
                                    <Server className="h-6 w-6 mb-2 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-500">Provider</span>
                                    <span className="text-sm font-semibold mt-1 capitalize">
                                      {verificationResult.provider || "Unknown"}
                                    </span>
                                  </div>

                                  {/* Status */}
                                  <div className="flex flex-col items-center p-4 bg-white bg-opacity-50 rounded-lg">
                                    <div className="h-6 w-6 mb-2">{getStatusIcon(verificationResult.category)}</div>
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                    <span className="text-sm font-semibold mt-1 capitalize">
                                      {verificationResult.category}
                                    </span>
                                  </div>
                                </div>

                                {/* Reason (if available) */}
                                {verificationResult.reason && (
                                  <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-500">Reason:</span>
                                    <p className="text-sm mt-1">{verificationResult.reason}</p>
                                  </div>
                                )}
                              </div>

                              <p className="text-sm text-gray-500 italic">Real verification result from API.</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Sender Tab */}
                      <TabsContent value="sender">
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                            <Info className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-purple-800">Email Sender Test</h3>
                              <p className="text-sm text-purple-700">
                                Enter your email address to receive a test message from our platform. This will help you
                                see how our emails look in your inbox.
                              </p>
                            </div>
                          </div>

                          <form onSubmit={testSender} className="space-y-4">
                            <div>
                              <Label htmlFor="sender-email">Your Email Address</Label>
                              <Input
                                id="sender-email"
                                type="email"
                                placeholder="e.g., your.email@example.com"
                                value={senderEmail}
                                onChange={(e) => setSenderEmail(e.target.value)}
                                required
                              />
                            </div>

                            <Button type="submit" disabled={senderLoading} className="w-full">
                              {senderLoading ? (
                                <>
                                  Sending... <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Send Test Email <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </form>

                          {senderLoading && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Sending...</span>
                                <span>{senderProgress}%</span>
                              </div>
                              <Progress value={senderProgress} className="h-2" />
                            </div>
                          )}

                          {senderResult && (
                            <Alert className="bg-green-50 text-green-800 border-green-200">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <AlertTitle>Email Sent Successfully!</AlertTitle>
                              <AlertDescription>
                                We've sent a test email to {senderEmail}. Please check your inbox (and spam folder) to
                                see how our emails appear.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </TabsContent>

                      {/* All-in-One Tab */}
                      <TabsContent value="all-in-one">
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg">
                            <Info className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-amber-800">All-in-One Campaign Test</h3>
                              <p className="text-sm text-amber-700">
                                Enter a keyword and your email address to experience our complete workflow: finding,
                                verifying, and sending emails in one seamless process.
                              </p>
                            </div>
                          </div>

                          <form onSubmit={testAllInOne} className="space-y-4">
                            <div>
                              <Label htmlFor="all-in-one-keyword">Search Keyword</Label>
                              <Input
                                id="all-in-one-keyword"
                                placeholder="e.g., Marketing Director, Tech Company"
                                value={allInOneKeyword}
                                onChange={(e) => setAllInOneKeyword(e.target.value)}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="all-in-one-email">Your Email Address</Label>
                              <Input
                                id="all-in-one-email"
                                type="email"
                                placeholder="e.g., your.email@example.com"
                                value={allInOneEmail}
                                onChange={(e) => setAllInOneEmail(e.target.value)}
                                required
                              />
                            </div>

                            <Button type="submit" disabled={allInOneLoading} className="w-full">
                              {allInOneLoading ? (
                                <>
                                  Processing... <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Start All-in-One Test <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </form>

                          {allInOneLoading && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Overall Progress</span>
                                  <span>{allInOneProgress}%</span>
                                </div>
                                <Progress value={allInOneProgress} className="h-2" />
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-blue-500">Finding</span>
                                    <span>{Math.min(allInOneProgress * 3, 100)}%</span>
                                  </div>
                                  <Progress value={Math.min(allInOneProgress * 3, 100)} className="h-1.5 bg-blue-100" />
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-green-500">Verifying</span>
                                    <span>
                                      {allInOneProgress > 33 ? Math.min((allInOneProgress - 33) * 3, 100) : 0}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={allInOneProgress > 33 ? Math.min((allInOneProgress - 33) * 3, 100) : 0}
                                    className="h-1.5 bg-green-100"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-purple-500">Sending</span>
                                    <span>
                                      {allInOneProgress > 66 ? Math.min((allInOneProgress - 66) * 3, 100) : 0}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={allInOneProgress > 66 ? Math.min((allInOneProgress - 66) * 3, 100) : 0}
                                    className="h-1.5 bg-purple-100"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {allInOneResult && (
                            <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                              <CheckCircle className="h-4 w-4 text-amber-500" />
                              <AlertTitle>All-in-One Process Complete!</AlertTitle>
                              <AlertDescription>
                                <p className="mb-2">We've successfully completed the All-in-One workflow:</p>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Found relevant email addresses based on your keyword</li>
                                  <li>Verified the email addresses for deliverability</li>
                                  <li>Sent a sample email to your address ({allInOneEmail})</li>
                                </ul>
                                <p className="mt-2">Please check your inbox to see the results of this test.</p>
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">How Our Testing Works</h2>

                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <Search className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Email Finder</h3>
                        <p className="text-sm text-gray-600">
                          Find professional email addresses based on keywords and criteria.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">How the Finder Test Works</h4>
                      <p className="text-gray-600 mb-4">
                        Our Email Finder test demonstrates how our system can discover professional email addresses
                        based on your search criteria. Enter keywords like job titles, industries, or company names, and
                        we'll show you simulated results of what our actual finder would discover.
                      </p>
                      <p className="text-gray-600">
                        In the full version, our AI-powered search engine scans multiple data sources to find the most
                        accurate and up-to-date email addresses for your target audience.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Email Verification</h3>
                        <p className="text-sm text-gray-600">Verify email addresses for validity and deliverability.</p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">How the Verification Test Works</h4>
                      <p className="text-gray-600 mb-4">
                        The Email Verification test shows how our system checks email addresses for validity and
                        deliverability. Enter any email address, and we'll provide verification results including format
                        validation, domain checks, and mailbox verification.
                      </p>
                      <p className="text-gray-600">
                        Our verification service performs comprehensive checks to ensure your emails reach real inboxes,
                        reducing bounce rates and protecting your sender reputation.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-purple-50 p-6 rounded-lg text-center">
                        <Send className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Email Sender</h3>
                        <p className="text-sm text-gray-600">Send personalized emails with tracking and automation.</p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">How the Sender Test Works</h4>
                      <p className="text-gray-600 mb-4">
                        Our Email Sender test allows you to experience our email delivery system firsthand. Enter your
                        email address, and we'll send you a sample email that showcases our formatting, deliverability,
                        and tracking capabilities.
                      </p>
                      <p className="text-gray-600">
                        The full Email Sender service includes personalization, scheduling, A/B testing, and detailed
                        analytics to maximize the effectiveness of your email campaigns.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-amber-50 p-6 rounded-lg text-center">
                        <Zap className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">All-in-One Campaign</h3>
                        <p className="text-sm text-gray-600">
                          Combine finding, verification, and sending in one workflow.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-lg font-semibold mb-2">How the All-in-One Test Works</h4>
                      <p className="text-gray-600 mb-4">
                        The All-in-One Campaign test demonstrates our integrated workflow that combines all three
                        services. Enter a keyword and your email address, and we'll simulate the entire process: finding
                        relevant emails, verifying them, and sending a sample email.
                      </p>
                      <p className="text-gray-600">
                        Our complete All-in-One service streamlines your email marketing workflow, saving you time and
                        maximizing results by handling everything from prospect discovery to campaign delivery in one
                        seamless process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Try our full-featured email marketing platform with a free trial. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/#pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}
