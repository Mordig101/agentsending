"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Download, Search, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function FinderPage() {
  const [searchType, setSearchType] = useState("keywords")
  const [keywords, setKeywords] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyDomain, setCompanyDomain] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any[] | null>(null)
  const [error, setError] = useState("")
  const [selectedSources, setSelectedSources] = useState({
    linkedin: true,
    companyWebsites: true,
    businessDirectories: true,
    socialMedia: false,
  })

  const handleSourceChange = (source: keyof typeof selectedSources) => {
    setSelectedSources((prev) => ({
      ...prev,
      [source]: !prev[source],
    }))
  }

  const startSearch = () => {
    if (searchType === "keywords" && !keywords.trim()) {
      setError("Please enter search keywords")
      return
    }

    if (searchType === "company" && !companyName.trim() && !companyDomain.trim()) {
      setError("Please enter company name or domain")
      return
    }

    setIsSearching(true)
    setProgress(0)
    setError("")

    // Simulate search process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSearching(false)

          // Generate mock results
          const mockResults = []
          const count = Math.floor(Math.random() * 10) + 5

          const firstNames = [
            "John",
            "Sarah",
            "Michael",
            "Emily",
            "David",
            "Jessica",
            "Robert",
            "Jennifer",
            "William",
            "Elizabeth",
          ]
          const lastNames = [
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Miller",
            "Davis",
            "Garcia",
            "Rodriguez",
            "Wilson",
          ]
          const companies = ["TechCorp", "InnovateSoft", "GlobalTech", "NextGen Solutions", "Digital Dynamics"]
          const domains = [
            "techcorp.com",
            "innovatesoft.io",
            "globaltech.co",
            "nextgensolutions.com",
            "digitaldynamics.io",
          ]
          const roles = [
            "CEO",
            "CTO",
            "Marketing Director",
            "Sales Manager",
            "Product Manager",
            "HR Director",
            "Software Engineer",
          ]

          for (let i = 0; i < count; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
            const company = companies[Math.floor(Math.random() * companies.length)]
            const domain = domains[Math.floor(Math.random() * domains.length)]
            const role = roles[Math.floor(Math.random() * roles.length)]

            mockResults.push({
              name: `${firstName} ${lastName}`,
              email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
              role: role,
              company: company,
              linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`,
              confidence: Math.floor(Math.random() * 30) + 70,
              source: Math.random() > 0.5 ? "LinkedIn" : Math.random() > 0.5 ? "Company Website" : "Business Directory",
            })
          }

          setResults(mockResults)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }

  const downloadResults = () => {
    if (!results) return

    // Create CSV content
    const headers = ["Name", "Email", "Role", "Company", "LinkedIn", "Confidence", "Source"]
    const csvContent = [
      headers.join(","),
      ...results.map((r) => [r.name, r.email, r.role, r.company, r.linkedin, r.confidence + "%", r.source].join(",")),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "email_finder_results.csv")
    a.click()
  }

  const resetSearch = () => {
    setKeywords("")
    setCompanyName("")
    setCompanyDomain("")
    setJobTitle("")
    setLocation("")
    setResults(null)
    setProgress(0)
    setIsSearching(false)
    setError("")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Email Finder</h1>
        <p className="text-gray-500">Find professional email addresses based on keywords, roles, and companies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Find Emails</CardTitle>
              <CardDescription>Search for email addresses using keywords or company information</CardDescription>
            </CardHeader>
            <CardContent>
              {!results ? (
                <>
                  <Tabs defaultValue="keywords" value={searchType} onValueChange={setSearchType}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="keywords">Search by Keywords</TabsTrigger>
                      <TabsTrigger value="company">Search by Company</TabsTrigger>
                    </TabsList>
                    <TabsContent value="keywords" className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="keywords">Search Keywords</Label>
                        <Textarea
                          id="keywords"
                          placeholder="E.g., HR managers in tech startups, Marketing directors in New York"
                          className="mt-1 h-24"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Use natural language to describe the people you're looking for
                        </p>
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
                    </TabsContent>
                    <TabsContent value="company" className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company-name">Company Name</Label>
                          <Input
                            id="company-name"
                            placeholder="E.g., Acme Corporation"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company-domain">Company Domain (Optional)</Label>
                          <Input
                            id="company-domain"
                            placeholder="E.g., acme.com"
                            value={companyDomain}
                            onChange={(e) => setCompanyDomain(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="job-title-company">Job Title (Optional)</Label>
                          <Input
                            id="job-title-company"
                            placeholder="E.g., Marketing Director"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location-company">Location (Optional)</Label>
                          <Input
                            id="location-company"
                            placeholder="E.g., New York, Remote"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6">
                    <Label>Data Sources</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="linkedin"
                          checked={selectedSources.linkedin}
                          onCheckedChange={() => handleSourceChange("linkedin")}
                        />
                        <Label htmlFor="linkedin" className="text-sm font-normal">
                          LinkedIn
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="company-websites"
                          checked={selectedSources.companyWebsites}
                          onCheckedChange={() => handleSourceChange("companyWebsites")}
                        />
                        <Label htmlFor="company-websites" className="text-sm font-normal">
                          Company Websites
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="business-directories"
                          checked={selectedSources.businessDirectories}
                          onCheckedChange={() => handleSourceChange("businessDirectories")}
                        />
                        <Label htmlFor="business-directories" className="text-sm font-normal">
                          Business Directories
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="social-media"
                          checked={selectedSources.socialMedia}
                          onCheckedChange={() => handleSourceChange("socialMedia")}
                        />
                        <Label htmlFor="social-media" className="text-sm font-normal">
                          Social Media
                        </Label>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <X className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-6">
                    <Button onClick={startSearch} disabled={isSearching} className="w-full">
                      {isSearching ? "Searching..." : "Start Search"}
                    </Button>
                  </div>

                  {isSearching && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Search in progress...</span>
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
                      <h3 className="text-lg font-medium">Search Results</h3>
                      <p className="text-sm text-gray-500">Found {results.length} email addresses</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={resetSearch}>
                        New Search
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
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Company</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Confidence</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{result.name}</td>
                            <td className="py-3 px-4">{result.email}</td>
                            <td className="py-3 px-4">{result.role}</td>
                            <td className="py-3 px-4">{result.company}</td>
                            <td className="py-3 px-4">
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
                                <span>{result.confidence}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Verify
                                </Button>
                                <Button variant="outline" size="sm">
                                  Add to List
                                </Button>
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
              <CardTitle>Email Finder Guide</CardTitle>
              <CardDescription>How our email finder works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Search</h4>
                    <p className="text-sm text-gray-500">
                      Our AI analyzes your search criteria to find the most relevant prospects.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Multiple Data Sources</h4>
                    <p className="text-sm text-gray-500">
                      We search across LinkedIn, company websites, and business directories.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Pattern Recognition</h4>
                    <p className="text-sm text-gray-500">
                      We analyze email patterns to find the most likely email format.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Confidence Score</h4>
                    <p className="text-sm text-gray-500">
                      Each email is assigned a confidence score based on our findings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Search Limits</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>Free Plan: 50 searches per day</li>
                  <li>Professional Plan: 1,000 searches per day</li>
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
