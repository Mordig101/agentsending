"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  CreditCard,
  Key,
  Lock,
  Mail,
  User,
  X,
  Search,
  CheckSquare,
  Send,
  Plus,
  Edit,
  Trash2,
  Copy,
  Settings,
  FileText,
  Users,
  AlertCircle,
} from "lucide-react"

export default function SettingsPage() {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    company: "Acme Inc.",
    role: "Marketing Director",
  })

  // API settings
  const [apiKey, setApiKey] = useState("api_key_12345678901234567890")
  const [showApiKey, setShowApiKey] = useState(false)

  // Finder settings
  const [finderSettings, setFinderSettings] = useState({
    depth: "medium",
    confidenceThreshold: 70,
    maxResultsPerSearch: 100,
    preferredDataSources: ["linkedin", "company-website", "social-media"],
    saveHistory: true,
    autoVerify: true,
  })

  // Verifier settings
  const [verifierSettings, setVerifierSettings] = useState({
    mode: "standard",
    maxBatchSize: 1000,
    autoClean: true,
    deepVerification: false,
    mxCheck: true,
    syntaxCheck: true,
    disposableCheck: true,
    catchAllCheck: true,
  })

  // Sender settings
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Sales Outreach",
      subject: "Let's connect about {{company}} needs",
      body: "Hi {{firstName}},\n\nI noticed that {{company}} is expanding its operations and thought my services might be helpful...",
      createdAt: "2023-05-10",
    },
    {
      id: 2,
      name: "Follow-up",
      subject: "Following up on our conversation",
      body: "Hi {{firstName}},\n\nI wanted to follow up on our previous conversation about...",
      createdAt: "2023-05-15",
    },
    {
      id: 3,
      name: "Introduction",
      subject: "Introduction from {{user.company}}",
      body: "Hi {{firstName}},\n\nMy name is {{user.firstName}} from {{user.company}}. I'm reaching out because...",
      createdAt: "2023-05-20",
    },
  ])

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      email: "john@example.com",
      provider: "Gmail",
      dailyLimit: 100,
      used: 42,
      isDefault: true,
    },
    {
      id: 2,
      email: "marketing@acmeinc.com",
      provider: "Outlook",
      dailyLimit: 200,
      used: 78,
      isDefault: false,
    },
  ])

  // Handle changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFinderSettingChange = (name, value) => {
    setFinderSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleVerifierSettingChange = (name, value) => {
    setVerifierSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save functions
  const saveProfile = () => {
    setSuccess("Profile updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const saveFinderSettings = () => {
    setSuccess("Finder settings updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const saveVerifierSettings = () => {
    setSuccess("Verifier settings updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const regenerateApiKey = () => {
    const newApiKey = "api_key_" + Math.random().toString(36).substring(2, 15)
    setApiKey(newApiKey)
    setSuccess("API key regenerated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const setDefaultAccount = (id) => {
    setAccounts(
      accounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      })),
    )
    setSuccess("Default account updated")
    setTimeout(() => setSuccess(""), 3000)
  }

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id))
    setSuccess("Account removed")
    setTimeout(() => setSuccess(""), 3000)
  }

  const deleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id))
    setSuccess("Template deleted")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and service preferences</p>
      </div>

      {success && (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <X className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="finder">
            <Search className="h-4 w-4 mr-2" />
            Finder
          </TabsTrigger>
          <TabsTrigger value="verifier">
            <CheckSquare className="h-4 w-4 mr-2" />
            Verifier
          </TabsTrigger>
          <TabsTrigger value="sender">
            <Send className="h-4 w-4 mr-2" />
            Sender
          </TabsTrigger>
        </TabsList>

        {/* Personal Settings Tab */}
        <TabsContent value="personal">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="api">
                <Key className="h-4 w-4 mr-2" />
                API Access
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Sub-Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 1MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" value={profileData.company} onChange={handleProfileChange} />
                    </div>
                    <div>
                      <Label htmlFor="role">Job Title</Label>
                      <Input id="role" name="role" value={profileData.role} onChange={handleProfileChange} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Access Sub-Tab */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage your API keys and access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="apiKey">Your API Key</Label>
                    <div className="flex mt-1">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline" className="ml-2" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Keep this key secret. It provides full access to your account via the API.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">API Usage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="text-sm text-gray-500">Email Verification</div>
                        <div className="text-2xl font-bold">2,450</div>
                        <div className="text-xs text-gray-500">of 5,000 monthly</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="text-sm text-gray-500">Email Finder</div>
                        <div className="text-2xl font-bold">876</div>
                        <div className="text-xs text-gray-500">of 1,000 monthly</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="text-sm text-gray-500">Email Sending</div>
                        <div className="text-2xl font-bold">342</div>
                        <div className="text-xs text-gray-500">of 500 monthly</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">API Documentation</h3>
                    <p className="text-sm text-gray-500">Learn how to integrate our services into your applications.</p>
                    <div className="flex space-x-2">
                      <Button variant="outline">View Documentation</Button>
                      <Button variant="outline">API Examples</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Regenerating your API key will invalidate your existing key. Any applications using the old key
                      will stop working.
                    </p>
                    <Button variant="destructive" onClick={regenerateApiKey}>
                      Regenerate API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Sub-Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Professional Plan</h3>
                        <p className="text-sm text-gray-500">$49/month, billed monthly</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Next Billing Date</div>
                        <div className="font-medium">June 15, 2023</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Payment Method</div>
                        <div className="font-medium">Visa ending in 4242</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-medium text-green-600">Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded mr-3">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/2025</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Invoice</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-3 text-sm">May 15, 2023</td>
                            <td className="px-4 py-3 text-sm">Professional Plan - Monthly</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">Apr 15, 2023</td>
                            <td className="px-4 py-3 text-sm">Professional Plan - Monthly</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">Mar 15, 2023</td>
                            <td className="px-4 py-3 text-sm">Professional Plan - Monthly</td>
                            <td className="px-4 py-3 text-sm">$49.00</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Paid
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Sub-Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-lg font-medium">Active Sessions</h3>
                        <p className="text-sm text-gray-500">Manage your active sessions across devices</p>
                      </div>
                      <Button variant="outline">View All</Button>
                    </div>
                    <div className="mt-4 border rounded-lg overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500">
                            Chrome on Windows • New York, USA • Started 2 hours ago
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          <span className="text-sm text-gray-500">Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Finder Settings Tab */}
        <TabsContent value="finder">
          <Card>
            <CardHeader>
              <CardTitle>Email Finder Settings</CardTitle>
              <CardDescription>Configure your email finder service preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="depth">Search Depth</Label>
                <Select
                  value={finderSettings.depth}
                  onValueChange={(value) => handleFinderSettingChange("depth", value)}
                >
                  <SelectTrigger id="depth">
                    <SelectValue placeholder="Select search depth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light (Faster, Less Accurate)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="deep">Deep (Slower, More Accurate)</SelectItem>
                    <SelectItem value="extreme">Extreme (Very Slow, Most Accurate)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Determines how extensively the system searches for email addresses
                </p>
              </div>

              <div>
                <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="confidenceThreshold"
                    type="range"
                    min="1"
                    max="100"
                    value={finderSettings.confidenceThreshold}
                    onChange={(e) => handleFinderSettingChange("confidenceThreshold", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium w-10">{finderSettings.confidenceThreshold}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum confidence level required to include an email in results
                </p>
              </div>

              <div>
                <Label htmlFor="maxResultsPerSearch">Maximum Results Per Search</Label>
                <Select
                  value={finderSettings.maxResultsPerSearch.toString()}
                  onValueChange={(value) => handleFinderSettingChange("maxResultsPerSearch", Number.parseInt(value))}
                >
                  <SelectTrigger id="maxResultsPerSearch">
                    <SelectValue placeholder="Select maximum results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 results</SelectItem>
                    <SelectItem value="25">25 results</SelectItem>
                    <SelectItem value="50">50 results</SelectItem>
                    <SelectItem value="100">100 results</SelectItem>
                    <SelectItem value="250">250 results</SelectItem>
                    <SelectItem value="500">500 results</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Preferred Data Sources</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="linkedin"
                      checked={finderSettings.preferredDataSources.includes("linkedin")}
                      onChange={(e) => {
                        const newSources = e.target.checked
                          ? [...finderSettings.preferredDataSources, "linkedin"]
                          : finderSettings.preferredDataSources.filter((s) => s !== "linkedin")
                        handleFinderSettingChange("preferredDataSources", newSources)
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="linkedin" className="font-normal">
                      LinkedIn
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="company-website"
                      checked={finderSettings.preferredDataSources.includes("company-website")}
                      onChange={(e) => {
                        const newSources = e.target.checked
                          ? [...finderSettings.preferredDataSources, "company-website"]
                          : finderSettings.preferredDataSources.filter((s) => s !== "company-website")
                        handleFinderSettingChange("preferredDataSources", newSources)
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="company-website" className="font-normal">
                      Company Websites
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="social-media"
                      checked={finderSettings.preferredDataSources.includes("social-media")}
                      onChange={(e) => {
                        const newSources = e.target.checked
                          ? [...finderSettings.preferredDataSources, "social-media"]
                          : finderSettings.preferredDataSources.filter((s) => s !== "social-media")
                        handleFinderSettingChange("preferredDataSources", newSources)
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="social-media" className="font-normal">
                      Social Media
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="public-directories"
                      checked={finderSettings.preferredDataSources.includes("public-directories")}
                      onChange={(e) => {
                        const newSources = e.target.checked
                          ? [...finderSettings.preferredDataSources, "public-directories"]
                          : finderSettings.preferredDataSources.filter((s) => s !== "public-directories")
                        handleFinderSettingChange("preferredDataSources", newSources)
                      }}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="public-directories" className="font-normal">
                      Public Directories
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoVerify">Auto-Verify Found Emails</Label>
                    <p className="text-sm text-gray-500">Automatically verify email addresses after finding them</p>
                  </div>
                  <Switch
                    id="autoVerify"
                    checked={finderSettings.autoVerify}
                    onCheckedChange={(checked) => handleFinderSettingChange("autoVerify", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="saveHistory">Save Search History</Label>
                    <p className="text-sm text-gray-500">Save your search history for future reference</p>
                  </div>
                  <Switch
                    id="saveHistory"
                    checked={finderSettings.saveHistory}
                    onCheckedChange={(checked) => handleFinderSettingChange("saveHistory", checked)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveFinderSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verifier Settings Tab */}
        <TabsContent value="verifier">
          <Card>
            <CardHeader>
              <CardTitle>Email Verifier Settings</CardTitle>
              <CardDescription>Configure your email verification service preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="mode">Verification Mode</Label>
                <Select
                  value={verifierSettings.mode}
                  onValueChange={(value) => handleVerifierSettingChange("mode", value)}
                >
                  <SelectTrigger id="mode">
                    <SelectValue placeholder="Select verification mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick (Basic Checks Only)</SelectItem>
                    <SelectItem value="standard">Standard (Balanced)</SelectItem>
                    <SelectItem value="deep">Deep (Thorough Verification)</SelectItem>
                    <SelectItem value="strict">Strict (Most Rigorous)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Determines the thoroughness of email verification</p>
              </div>

              <div>
                <Label htmlFor="maxBatchSize">Maximum Batch Size</Label>
                <Select
                  value={verifierSettings.maxBatchSize.toString()}
                  onValueChange={(value) => handleVerifierSettingChange("maxBatchSize", Number.parseInt(value))}
                >
                  <SelectTrigger id="maxBatchSize">
                    <SelectValue placeholder="Select batch size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 emails</SelectItem>
                    <SelectItem value="500">500 emails</SelectItem>
                    <SelectItem value="1000">1,000 emails</SelectItem>
                    <SelectItem value="5000">5,000 emails</SelectItem>
                    <SelectItem value="10000">10,000 emails</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoClean">Auto-Clean Results</Label>
                    <p className="text-sm text-gray-500">Automatically remove invalid emails from results</p>
                  </div>
                  <Switch
                    id="autoClean"
                    checked={verifierSettings.autoClean}
                    onCheckedChange={(checked) => handleVerifierSettingChange("autoClean", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="deepVerification">Deep Verification</Label>
                    <p className="text-sm text-gray-500">
                      Perform more thorough verification (slower but more accurate)
                    </p>
                  </div>
                  <Switch
                    id="deepVerification"
                    checked={verifierSettings.deepVerification}
                    onCheckedChange={(checked) => handleVerifierSettingChange("deepVerification", checked)}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Verification Checks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="mxCheck" className="font-normal">
                      MX Record Check
                    </Label>
                    <Switch
                      id="mxCheck"
                      checked={verifierSettings.mxCheck}
                      onCheckedChange={(checked) => handleVerifierSettingChange("mxCheck", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="syntaxCheck" className="font-normal">
                      Syntax Check
                    </Label>
                    <Switch
                      id="syntaxCheck"
                      checked={verifierSettings.syntaxCheck}
                      onCheckedChange={(checked) => handleVerifierSettingChange("syntaxCheck", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="disposableCheck" className="font-normal">
                      Disposable Email Check
                    </Label>
                    <Switch
                      id="disposableCheck"
                      checked={verifierSettings.disposableCheck}
                      onCheckedChange={(checked) => handleVerifierSettingChange("disposableCheck", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label htmlFor="catchAllCheck" className="font-normal">
                      Catch-All Domain Check
                    </Label>
                    <Switch
                      id="catchAllCheck"
                      checked={verifierSettings.catchAllCheck}
                      onCheckedChange={(checked) => handleVerifierSettingChange("catchAllCheck", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveVerifierSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sender Settings Tab */}
        <TabsContent value="sender">
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="accounts">
                <Users className="h-4 w-4 mr-2" />
                Accounts
              </TabsTrigger>
            </TabsList>

            {/* Templates Sub-Tab */}
            <TabsContent value="templates">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Manage your email templates for campaigns</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-gray-500">Created on {template.createdAt}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTemplate(template.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md mb-2">
                          <p className="text-sm font-medium">Subject: {template.subject}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm whitespace-pre-line">{template.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accounts Sub-Tab */}
            <TabsContent value="accounts">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Email Accounts</CardTitle>
                    <CardDescription>Manage your email accounts for sending</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <div key={account.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                                account.provider === "Gmail"
                                  ? "bg-red-100 text-red-600"
                                  : account.provider === "Outlook"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <Mail className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium flex items-center">
                                {account.email}
                                {account.isDefault && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Default</Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{account.provider}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {!account.isDefault && (
                              <Button variant="outline" size="sm" onClick={() => setDefaultAccount(account.id)}>
                                Set as Default
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAccount(account.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 bg-gray-50 p-3 rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium">Daily Limit:</span> {account.used} of {account.dailyLimit}{" "}
                              emails used
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${(account.used / account.dailyLimit) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        {account.provider === "Gmail" && (
                          <div className="mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-xs text-amber-500">Gmail requires re-authentication in 12 days</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
