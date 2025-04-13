"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Search, Download, CheckCircle, Mail, Eye, Loader2, Pause, Play } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define interfaces for the component props
interface FinderSearch {
  id: string;
  query: string;
  status: string;
  date: string;
  progress: number;
  processed: number;
  total: number;
  found: number;
}

interface FinderStats {
  totalSearches: number;
  totalFound: number;
  averageConfidence: number;
  runningSearches: FinderSearch[];
  recentSearches: FinderSearch[];
}

interface FinderFormData {
  name: string;
  searchType: string;
  keywords: string;
  jobTitles: string;
  companies: string;
  locations: string;
  description: string;
  dataSources: string;
  confidenceThreshold: number;
  maxResults: number;
  includeLinkedIn: boolean;
  includeWebsites: boolean;
  includeDirectories: boolean;
  includeSocialMedia: boolean;
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

interface FinderTabProps {
  finderStats: FinderStats;
  finderForm: FinderFormData;
  setFinderForm: React.Dispatch<React.SetStateAction<FinderFormData>>;
  handleFinderSubmit: (e: React.FormEvent) => void;
  streamingService: string | null;
  streamingActive: boolean;
  streamingProgress: number;
  streamingStats: StreamingStats;
  streamingLogs: StreamingLog[];
  startStreaming: (service: string, total: number) => void;
  stopStreaming: () => void;
  setActiveSetupTab: (tab: string) => void;
  getStatusBadge: (status: string) => JSX.Element;
  formatDate: (dateString: string) => string;
  setStreamingActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FinderTab({
  finderStats,
  finderForm,
  setFinderForm,
  handleFinderSubmit,
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
  setStreamingActive,
}: FinderTabProps) {
  return (
    <Tabs defaultValue="setup">
      <TabsList className="mb-6">
        <TabsTrigger value="setup">Setup & Start</TabsTrigger>
        <TabsTrigger value="campaigns">Searches</TabsTrigger>
        <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
      </TabsList>

      {/* Setup & Start Tab */}
      <TabsContent value="setup">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{finderStats.totalSearches.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Lifetime searches performed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Emails Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{finderStats.totalFound.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Total emails discovered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{finderStats.averageConfidence}%</div>
              <p className="text-xs text-gray-500 mt-1">Average confidence score</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Email Search</CardTitle>
            <CardDescription>Find professional email addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFinderSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="search-name">Search Name</Label>
                  <Input
                    id="search-name"
                    placeholder="e.g., Marketing Directors at Tech Companies"
                    value={finderForm.name}
                    onChange={(e) => setFinderForm({ ...finderForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="search-type">Search Type</Label>
                  <Select
                    value={finderForm.searchType}
                    onValueChange={(value) => setFinderForm({ ...finderForm, searchType: value })}
                  >
                    <SelectTrigger id="search-type">
                      <SelectValue placeholder="Select search type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keywords">Search by Keywords</SelectItem>
                      <SelectItem value="company">Search by Company</SelectItem>
                      <SelectItem value="person">Search by Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Choose how you want to search for emails</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="e.g., marketing, director, CMO"
                      value={finderForm.keywords}
                      onChange={(e) => setFinderForm({ ...finderForm, keywords: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>

                  <div>
                    <Label htmlFor="job-titles">Job Titles</Label>
                    <Input
                      id="job-titles"
                      placeholder="e.g., Marketing Director, CMO, VP of Marketing"
                      value={finderForm.jobTitles}
                      onChange={(e) => setFinderForm({ ...finderForm, jobTitles: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate job titles with commas</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companies">Companies</Label>
                    <Input
                      id="companies"
                      placeholder="e.g., Acme Inc., XYZ Corp."
                      value={finderForm.companies}
                      onChange={(e) => setFinderForm({ ...finderForm, companies: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate company names with commas</p>
                  </div>

                  <div>
                    <Label htmlFor="locations">Locations</Label>
                    <Input
                      id="locations"
                      placeholder="e.g., New York, San Francisco, London"
                      value={finderForm.locations}
                      onChange={(e) => setFinderForm({ ...finderForm, locations: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate locations with commas</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="search-description">Search Description</Label>
                  <Textarea
                    id="search-description"
                    placeholder="Describe what you're looking for in detail..."
                    className="h-24"
                    value={finderForm.description}
                    onChange={(e) => setFinderForm({ ...finderForm, description: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Provide a detailed description of your target audience to improve search results
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>Advanced Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-2">
                        <div>
                          <Label htmlFor="data-sources">Data Sources</Label>
                          <Select
                            value={finderForm.dataSources}
                            onValueChange={(value) => setFinderForm({ ...finderForm, dataSources: value })}
                          >
                            <SelectTrigger id="data-sources">
                              <SelectValue placeholder="Select data sources" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Sources</SelectItem>
                              <SelectItem value="linkedin">LinkedIn Only</SelectItem>
                              <SelectItem value="websites">Company Websites Only</SelectItem>
                              <SelectItem value="directories">Business Directories Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">Select which sources to search</p>
                        </div>

                        <div>
                          <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                          <div className="pt-2 pb-4">
                            <Slider
                              defaultValue={[70]}
                              max={100}
                              step={5}
                              value={[finderForm.confidenceThreshold]}
                              onValueChange={(value) => setFinderForm({ ...finderForm, confidenceThreshold: value[0] })}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Low Confidence (More Results)</span>
                            <span>{finderForm.confidenceThreshold}%</span>
                            <span>High Confidence (Fewer Results)</span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="max-results">Maximum Results</Label>
                          <Select
                            value={finderForm.maxResults.toString()}
                            onValueChange={(value) =>
                              setFinderForm({ ...finderForm, maxResults: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger id="max-results">
                              <SelectValue placeholder="Select maximum results" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100">100 results</SelectItem>
                              <SelectItem value="500">500 results</SelectItem>
                              <SelectItem value="1000">1,000 results</SelectItem>
                              <SelectItem value="5000">5,000 results</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">Limit the number of results returned</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="include-linkedin">Include LinkedIn</Label>
                              <p className="text-xs text-gray-500">Search LinkedIn profiles</p>
                            </div>
                            <Switch
                              id="include-linkedin"
                              checked={finderForm.includeLinkedIn}
                              onCheckedChange={(checked) => setFinderForm({ ...finderForm, includeLinkedIn: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="include-websites">Include Company Websites</Label>
                              <p className="text-xs text-gray-500">Search company websites</p>
                            </div>
                            <Switch
                              id="include-websites"
                              checked={finderForm.includeWebsites}
                              onCheckedChange={(checked) => setFinderForm({ ...finderForm, includeWebsites: checked })}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="include-directories">Include Business Directories</Label>
                              <p className="text-xs text-gray-500">Search business directories</p>
                            </div>
                            <Switch
                              id="include-directories"
                              checked={finderForm.includeDirectories}
                              onCheckedChange={(checked) =>
                                setFinderForm({ ...finderForm, includeDirectories: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="include-social">Include Social Media</Label>
                              <p className="text-xs text-gray-500">Search social media profiles</p>
                            </div>
                            <Switch
                              id="include-social"
                              checked={finderForm.includeSocialMedia}
                              onCheckedChange={(checked) =>
                                setFinderForm({ ...finderForm, includeSocialMedia: checked })
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
                    <Search className="h-4 w-4 mr-2" />
                    Start Search
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
          {finderStats.runningSearches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Running Searches</CardTitle>
                <CardDescription>Currently active email finder searches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {finderStats.runningSearches.map((search: FinderSearch) => (
                    <div key={search.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{search.query}</h3>
                          <p className="text-sm text-gray-500">Started on {formatDate(search.date)}</p>
                        </div>
                        <div className="flex items-center">
                          {getStatusBadge(search.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => startStreaming("finder", search.total)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Live
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {search.progress}%</span>
                          <span>
                            {search.processed} / {search.total} processed
                          </span>
                        </div>
                        <Progress value={search.progress} className="h-2" />
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 text-blue-500 mr-1" />
                          <span>Found: {search.found} emails so far</span>
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
                <CardTitle>Completed Searches</CardTitle>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  New Search
                </Button>
              </div>
              <CardDescription>Your completed email finder searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Search Query</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Emails Found</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finderStats.recentSearches.map((search: FinderSearch) => (
                      <tr key={search.id} className="border-b">
                        <td className="py-3 px-4">{search.query}</td>
                        <td className="py-3 px-4">{formatDate(search.date)}</td>
                        <td className="py-3 px-4">{search.found.toLocaleString()}</td>
                        <td className="py-3 px-4">{getStatusBadge(search.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
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
              <CardTitle>Live Search Process</CardTitle>
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
              {streamingActive && streamingService === "finder"
                ? `Email search in progress - ${streamingProgress.toFixed(1)}% complete`
                : "No active search process"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {streamingService === "finder" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>
                      {streamingStats.processed} / {streamingStats.total} searches
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
                    <div className="text-xs text-gray-500">Not Found</div>
                    <div className="text-lg font-semibold text-gray-600">{streamingStats.failed}</div>
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
                    {streamingLogs.map((log: StreamingLog) => (
                      <div
                        key={log.id}
                        className={`mb-1 ${log.type === "warning" ? "text-yellow-400" : "text-blue-400"}`}
                      >
                        [{log.timestamp}] {log.message}
                      </div>
                    ))}
                    {streamingActive && (
                      <div className="animate-pulse">
                        <Loader2 className="h-4 w-4 inline-block mr-2 animate-spin" />
                        Searching...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Search</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                  Start a new email search or view a running search to see live progress here.
                </p>
                <Button onClick={() => setActiveSetupTab("setup")}>Start New Search</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
