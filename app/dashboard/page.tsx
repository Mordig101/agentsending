"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, RefreshCw, CheckCircle, Search, Send, ChevronRight, Zap, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

// Import tab components
import VerificationTab from "./dashboard/verification"
import FinderTab from "./dashboard/finder"
import SenderTab from "./dashboard/sender"
import AllInOneTab from "./dashboard/all-in-one"

// Import types
import type {
  VerificationStats,
  VerificationForm,
  FinderStats,
  FinderFormData,
  SenderStats,
  SenderFormData,
  AllInOneStats,
  AllInOneFormData,
  StreamingStats,
  StreamingLog,
  EmailTemplate,
} from "./dashboard/types"
import type { ChangeEvent, FormEvent } from "react"

interface RecentActivity {
  id: number
  type: string
  name: string
  date: string
  status: string
  results: string
}

interface DashboardStats {
  totalEmails: number
  verifiedEmails: number
  foundEmails: number
  sentEmails: number
  openRate: number
  replyRate: number
  campaigns: number
  activeProspects: number
  creditsRemaining: number
  nextBillingDate: string
  plan: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeService, setActiveService] = useState("overview")
  const [activeSetupTab, setActiveSetupTab] = useState("setup")
  const [isLoading, setIsLoading] = useState(true)
  const [streamingActive, setStreamingActive] = useState(false)
  const streamingRef = useRef<HTMLDivElement | null>(null)
  const [streamingService, setStreamingService] = useState<string | null>(null)
  const [streamingProgress, setStreamingProgress] = useState(0)
  const [streamingLogs, setStreamingLogs] = useState<StreamingLog[]>([])
  const [streamingStats, setStreamingStats] = useState<StreamingStats>({
    processed: 0,
    total: 0,
    success: 0,
    failed: 0,
    timeElapsed: "00:00:00",
    estimatedTimeRemaining: "00:00:00",
  })

  const [stats, setStats] = useState<DashboardStats>({
    totalEmails: 0,
    verifiedEmails: 0,
    foundEmails: 0,
    sentEmails: 0,
    openRate: 0,
    replyRate: 0,
    campaigns: 0,
    activeProspects: 0,
    creditsRemaining: 0,
    nextBillingDate: "",
    plan: "",
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: "verification",
      name: "Marketing List Verification",
      date: "2023-06-10T14:30:00",
      status: "Completed",
      results: "2,450 verified, 120 invalid",
    },
    {
      id: 2,
      type: "finder",
      name: "Tech Startups Search",
      date: "2023-06-08T09:15:00",
      status: "Completed",
      results: "342 emails found",
    },
    {
      id: 3,
      type: "sender",
      name: "Product Launch Campaign",
      date: "2023-06-05T16:45:00",
      status: "Active",
      results: "650/1200 sent, 42% open rate",
    },
    {
      id: 4,
      type: "all-in-one",
      name: "SaaS Companies Outreach",
      date: "2023-06-01T11:20:00",
      status: "Active",
      results: "Finding: 100%, Verifying: 85%, Sending: 32%",
    },
    {
      id: 5,
      type: "verification",
      name: "Sales Prospects Q2",
      date: "2023-05-28T10:15:00",
      status: "Completed",
      results: "1,623 verified, 222 invalid",
    },
    {
      id: 6,
      type: "sender",
      name: "Follow-up Campaign",
      date: "2023-05-25T13:20:00",
      status: "Completed",
      results: "850 sent, 46% open rate, 8.7% reply rate",
    },
  ])

  const [verificationStats, setVerificationStats] = useState<VerificationStats>({
    totalVerified: 12480,
    validEmails: 10864,
    invalidEmails: 1245,
    riskyEmails: 371,
    verificationRate: 87.1,
    disposableEmails: 245,
    spamTraps: 18,
    syntaxErrors: 112,
    domainErrors: 328,
    mailboxErrors: 805,
    recentBatches: [
      {
        id: "1",
        name: "Marketing List June 2023",
        date: "2023-06-10",
        total: 2570,
        valid: 2450,
        invalid: 120,
        status: "Completed",
      },
      {
        id: "2",
        name: "Sales Prospects Q2",
        date: "2023-06-05",
        total: 1845,
        valid: 1623,
        invalid: 222,
        status: "Completed",
      },
      {
        id: "3",
        name: "Conference Attendees",
        date: "2023-06-01",
        total: 950,
        valid: 912,
        invalid: 38,
        status: "Completed",
      },
      {
        id: "4",
        name: "Newsletter Subscribers",
        date: "2023-05-25",
        total: 3200,
        valid: 2845,
        invalid: 355,
        status: "Completed",
      },
      {
        id: "5",
        name: "Webinar Registrants",
        date: "2023-05-18",
        total: 1250,
        valid: 1180,
        invalid: 70,
        status: "Completed",
      },
    ],
    runningBatches: [
      {
        id: "6",
        name: "New Product Launch List",
        date: "2023-06-12",
        total: 5000,
        processed: 2150,
        valid: 1980,
        invalid: 170,
        status: "Running",
        progress: 43,
      },
    ],
    errorBreakdown: [
      { type: "Syntax Errors", count: 112, percentage: 9 },
      { type: "Domain Errors", count: 328, percentage: 26.3 },
      { type: "Mailbox Errors", count: 805, percentage: 64.7 },
    ],
    industryComparison: {
      yourRate: 87.1,
      industryAvg: 78.5,
      topPerformers: 92.3,
    },
  })

  const [finderStats, setFinderStats] = useState<FinderStats>({
    totalSearches: 124,
    totalFound: 8320,
    averageConfidence: 76,
    searchesByIndustry: [
      { industry: "Technology", searches: 42, found: 3450 },
      { industry: "Healthcare", searches: 28, found: 1820 },
      { industry: "Finance", searches: 22, found: 1540 },
      { industry: "Education", searches: 18, found: 980 },
      { industry: "Retail", searches: 14, found: 530 },
    ],
    topJobTitles: [
      { title: "Marketing Director", count: 1245 },
      { title: "CEO", count: 980 },
      { title: "CTO", count: 875 },
      { title: "Sales Manager", count: 720 },
      { title: "HR Manager", count: 650 },
    ],
    confidenceDistribution: [
      { range: "90-100%", count: 2120 },
      { range: "80-89%", count: 3450 },
      { range: "70-79%", count: 1850 },
      { range: "60-69%", count: 650 },
      { range: "Below 60%", count: 250 },
    ],
    recentSearches: [
      {
        id: "1",
        query: "Marketing Directors at Tech Companies",
        date: "2023-06-09",
        found: 342,
        status: "Completed",
      },
      {
        id: "2",
        query: "HR Managers in Healthcare",
        date: "2023-06-07",
        found: 215,
        status: "Completed",
      },
      {
        id: "3",
        query: "CTOs at SaaS Companies",
        date: "2023-06-03",
        found: 178,
        status: "Completed",
      },
      {
        id: "4",
        query: "Sales Directors in Finance",
        date: "2023-05-30",
        found: 203,
        status: "Completed",
      },
      {
        id: "5",
        query: "CEOs at Startups in New York",
        date: "2023-05-25",
        found: 156,
        status: "Completed",
      },
    ],
    runningSearches: [
      {
        id: "6",
        query: "Product Managers in FinTech",
        date: "2023-06-12",
        processed: 320,
        found: 185,
        total: 500,
        status: "Running",
        progress: 64,
      },
    ],
    dataSources: [
      { source: "LinkedIn", percentage: 45 },
      { source: "Company Websites", percentage: 30 },
      { source: "Business Directories", percentage: 20 },
      { source: "Social Media", percentage: 5 },
    ],
  })

  const [senderStats, setSenderStats] = useState<SenderStats>({
    totalSent: 5640,
    delivered: 5528,
    opened: 2321,
    clicked: 876,
    replied: 451,
    bounced: 112,
    unsubscribed: 28,
    deliveryRate: 98.0,
    openRate: 42.0,
    clickRate: 15.8,
    replyRate: 8.2,
    bounceRate: 2.0,
    unsubscribeRate: 0.5,
    sendingTimes: [
      { day: "Monday", percentage: 15 },
      { day: "Tuesday", percentage: 22 },
      { day: "Wednesday", percentage: 25 },
      { day: "Thursday", percentage: 20 },
      { day: "Friday", percentage: 12 },
      { day: "Saturday", percentage: 3 },
      { day: "Sunday", percentage: 3 },
    ],
    deviceBreakdown: [
      { device: "Desktop", percentage: 65 },
      { device: "Mobile", percentage: 30 },
      { device: "Tablet", percentage: 5 },
    ],
    recentCampaigns: [
      {
        id: "1",
        name: "Product Launch Announcement",
        date: "2023-06-05",
        sent: 1200,
        opened: 504,
        replied: 96,
        status: "Completed",
      },
      {
        id: "2",
        name: "Follow-up Campaign",
        date: "2023-05-28",
        sent: 850,
        opened: 391,
        replied: 74,
        status: "Completed",
      },
      {
        id: "3",
        name: "Webinar Invitation",
        date: "2023-05-20",
        sent: 1500,
        opened: 675,
        replied: 135,
        status: "Completed",
      },
      {
        id: "4",
        name: "Newsletter May 2023",
        date: "2023-05-15",
        sent: 2000,
        opened: 720,
        replied: 120,
        status: "Completed",
      },
      {
        id: "5",
        name: "Customer Feedback Survey",
        date: "2023-05-10",
        sent: 800,
        opened: 360,
        replied: 96,
        status: "Completed",
      },
    ],
    runningCampaigns: [
      {
        id: "6",
        name: "Summer Promotion",
        date: "2023-06-12",
        total: 1500,
        sent: 450,
        opened: 210,
        replied: 35,
        status: "Running",
        progress: 30,
      },
    ],
    topPerformingSubjects: [
      { subject: "Quick question about {Company}", openRate: 58 },
      { subject: "{First Name}, interested in a 10-min call?", openRate: 52 },
      { subject: "Ideas for {Company}'s growth", openRate: 49 },
      { subject: "Saw your recent announcement", openRate: 45 },
      { subject: "Connecting from {Our Company}", openRate: 41 },
    ],
    emailTemplates: [
      { id: 1, name: "Cold Outreach - Short", performance: "High" },
      { id: 2, name: "Follow-up - Gentle Reminder", performance: "Very High" },
      { id: 3, name: "Product Demo Request", performance: "Medium" },
      { id: 4, name: "Case Study Share", performance: "High" },
      { id: 5, name: "Event Invitation", performance: "Medium" },
    ],
  })

  const [allInOneStats, setAllInOneStats] = useState<AllInOneStats>({
    totalCampaigns: 8,
    activeCampaigns: 3,
    totalProspects: 12450,
    averageOpenRate: 38.5,
    averageReplyRate: 7.2,
    campaignsByIndustry: [
      { industry: "Technology", count: 3, prospects: 5200 },
      { industry: "Healthcare", count: 2, prospects: 3100 },
      { industry: "Finance", count: 1, prospects: 1800 },
      { industry: "Education", count: 1, prospects: 1350 },
      { industry: "Retail", count: 1, prospects: 1000 },
    ],
    stageBreakdown: {
      finding: 2850,
      verifying: 2420,
      sending: 1024,
      completed: 6156,
    },
    recentCampaigns: [
      {
        id: "1",
        name: "SaaS Companies Outreach",
        date: "2023-06-01",
        prospects: 3200,
        found: 2850,
        verified: 2420,
        sent: 1024,
        opened: 430,
        replied: 82,
        status: "Active",
        progress: {
          finding: 100,
          verifying: 85,
          sending: 42,
          overall: 76,
        },
      },
      {
        id: "2",
        name: "Marketing Agencies Campaign",
        date: "2023-05-15",
        prospects: 2500,
        found: 2200,
        verified: 1980,
        sent: 1980,
        opened: 792,
        replied: 158,
        status: "Completed",
        progress: {
          finding: 100,
          verifying: 100,
          sending: 100,
          overall: 100,
        },
      },
      {
        id: "3",
        name: "E-commerce Decision Makers",
        date: "2023-05-01",
        prospects: 1800,
        found: 1650,
        verified: 1520,
        sent: 1520,
        opened: 638,
        replied: 106,
        status: "Completed",
        progress: {
          finding: 100,
          verifying: 100,
          sending: 100,
          overall: 100,
        },
      },
      {
        id: "4",
        name: "Healthcare Executives",
        date: "2023-04-15",
        prospects: 2100,
        found: 1950,
        verified: 1820,
        sent: 1820,
        opened: 728,
        replied: 146,
        status: "Completed",
        progress: {
          finding: 100,
          verifying: 100,
          sending: 100,
          overall: 100,
        },
      },
      {
        id: "5",
        name: "Financial Services Outreach",
        date: "2023-04-01",
        prospects: 1800,
        found: 1650,
        verified: 1520,
        sent: 1520,
        opened: 608,
        replied: 122,
        status: "Completed",
        progress: {
          finding: 100,
          verifying: 100,
          sending: 100,
          overall: 100,
        },
      },
    ],
    runningCampaigns: [
      {
        id: "6",
        name: "Tech Startups in California",
        date: "2023-06-10",
        prospects: 2000,
        found: 1200,
        verified: 800,
        sent: 300,
        opened: 120,
        replied: 18,
        status: "Running",
        progress: {
          finding: 60,
          verifying: 40,
          sending: 15,
          overall: 38,
        },
      },
    ],
    upcomingCampaigns: [
      {
        id: "1",
        name: "Tech Startups Follow-up",
        date: "2023-06-15",
        prospects: 1500,
        status: "Scheduled",
      },
      {
        id: "2",
        name: "Healthcare Executives",
        date: "2023-06-22",
        prospects: 2000,
        status: "Draft",
      },
      {
        id: "3",
        name: "Product Launch Announcement",
        date: "2023-06-30",
        prospects: 3000,
        status: "Ready",
      },
    ],
    bestPractices: [
      {
        id: 1,
        title: "Target Specific Industries",
        description: "Focus on 1-2 industries per campaign for better personalization",
      },
      {
        id: 2,
        title: "Verify Before Sending",
        description: "Always verify emails before sending to maintain high deliverability",
      },
      { id: 3, title: "Follow-up Sequence", description: "Use 2-3 follow-ups spaced 3-5 days apart for best results" },
      {
        id: 4,
        title: "Personalize First Line",
        description: "Personalize the first line of your email based on company research",
      },
    ],
  })

  // Form states for each service
  const [verificationForm, setVerificationForm] = useState<VerificationForm>({
    name: "",
    mode: "standard",
    threshold: "medium",
    deduplication: true,
    catchAll: true,
    disposable: true,
    syntax: true,
    domain: true,
    mailbox: true,
    file: null,
    fileName: "",
    emailList: "",
  })

  const [finderForm, setFinderForm] = useState<FinderFormData>({
    name: "",
    searchType: "keywords",
    keywords: "",
    jobTitles: "",
    companies: "",
    locations: "",
    dataSources: "all",
    confidenceThreshold: 70,
    maxResults: 500,
    includeLinkedIn: true,
    includeWebsites: true,
    includeDirectories: true,
    includeSocialMedia: true,
    description: "",
  })

  const [senderForm, setSenderForm] = useState<SenderFormData>({
    name: "",
    objective: "leads",
    subject: "",
    emailBody: "",
    fromName: "",
    fromEmail: "",
    replyTo: "",
    schedule: "now",
    scheduleDate: "",
    scheduleTime: "",
    sendingLimit: "50",
    sendInterval: "60",
    trackOpens: true,
    trackClicks: true,
    followUps: 2,
    followUpInterval: 3,
    templateId: "",
    attachments: [],
    personalizeFirstLine: true,
    personalizeSubject: true,
    recipients: "",
    recipientFile: null,
    recipientFileName: "",
  })

  const [allInOneForm, setAllInOneForm] = useState<AllInOneFormData>({
    name: "",
    goal: "leads",
    targetIndustry: "technology",
    targetJobTitles: "",
    targetLocations: "",
    targetCompanySize: "all",
    findingKeywords: "",
    findingDescription: "",
    verificationMode: "standard",
    verificationThreshold: "medium",
    subject: "",
    emailBody: "",
    followUps: 2,
    followUpInterval: 3,
    sendingLimit: "50",
    sendInterval: "60",
    trackOpens: true,
    trackClicks: true,
    templateId: "",
    personalizeFirstLine: true,
    personalizeSubject: true,
    schedule: "now",
    scheduleDate: "",
    scheduleTime: "",
  })

  // Email templates
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: 1,
      name: "Cold Outreach - Short",
      subject: "Quick question about {Company}",
      body: "Hi {First Name},\n\nI noticed {Company} is doing great work in the {Industry} space. I'm reaching out because we've helped similar companies achieve {Benefit}.\n\nWould you be open to a quick 10-minute call to discuss how we might be able to help {Company} with {Pain Point}?\n\nBest regards,\n{Sender Name}",
      performance: "High",
      category: "Cold Outreach",
    },
    {
      id: 2,
      name: "Follow-up - Gentle Reminder",
      subject: "Following up on my previous email",
      body: "Hi {First Name},\n\nI wanted to follow up on my previous email about helping {Company} with {Pain Point}.\n\nI understand you're busy, but I'd love to share how we've helped companies like {Similar Company} achieve {Specific Result}.\n\nDo you have 10 minutes for a quick call this week?\n\nBest regards,\n{Sender Name}",
      performance: "Very High",
      category: "Follow-up",
    },
    {
      id: 3,
      name: "Product Demo Request",
      subject: "See how {Our Product} can help {Company}",
      body: "Hi {First Name},\n\nI'd like to show you how {Our Product} can help {Company} with {Specific Challenge}.\n\nOur solution has helped companies like {Similar Company} to {Specific Benefit}, and I believe we could do the same for you.\n\nWould you be interested in a quick demo this week?\n\nBest regards,\n{Sender Name}",
      performance: "Medium",
      category: "Demo",
    },
    {
      id: 4,
      name: "Case Study Share",
      subject: "How {Similar Company} achieved {Result} with our help",
      body: "Hi {First Name},\n\nI thought you might be interested in how we helped {Similar Company} achieve {Specific Result} in just {Time Period}.\n\nGiven {Company}'s focus on {Focus Area}, I believe we could help you achieve similar results.\n\nI've attached the case study for your review. Would you be interested in discussing how we could apply these strategies to {Company}?\n\nBest regards,\n{Sender Name}",
      performance: "High",
      category: "Case Study",
    },
    {
      id: 5,
      name: "Event Invitation",
      subject: "Invitation: {Event Name} - {Date}",
      body: "Hi {First Name},\n\nI'd like to invite you to {Event Name}, an exclusive event for {Industry} leaders like yourself.\n\nThe event will feature insights on {Topic} and networking opportunities with peers from companies like {Company Examples}.\n\nDate: {Date}\nTime: {Time}\nLocation: {Location}\n\nWould you be interested in attending? I'd be happy to reserve a spot for you.\n\nBest regards,\n{Sender Name}",
      performance: "Medium",
      category: "Event",
    },
  ])

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("AgentSending_logged_in") === "true"
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("AgentSending_user") || "{}")

      setStats({
        totalEmails: 15750,
        verifiedEmails: 12480,
        foundEmails: 8320,
        sentEmails: 5640,
        openRate: 42,
        replyRate: 8,
        campaigns: 8,
        activeProspects: 4250,
        creditsRemaining: userData.credits || 7850,
        nextBillingDate: userData.nextBillingDate || "July 15, 2023",
        plan: userData.plan || "Professional",
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate streaming data for running services
  useEffect(() => {
    if (streamingActive && streamingService) {
      const interval = setInterval(() => {
        // Simulate progress updates
        setStreamingProgress((prev) => {
          const newProgress = Math.min(prev + Math.random() * 2, 100)
          return newProgress
        })

        // Simulate log updates
        const logMessages = [
          "Processing email batch...",
          "Checking syntax for email addresses...",
          "Verifying domain records...",
          "Testing mailbox existence...",
          "Checking for disposable email patterns...",
          "Analyzing catch-all configuration...",
          "Validating MX records...",
          "Checking SPF records...",
          "Analyzing DMARC policy...",
          "Testing SMTP connection...",
          "Searching for email pattern...",
          "Analyzing company website...",
          "Checking social profiles...",
          "Extracting contact information...",
          "Preparing email for delivery...",
          "Personalizing email content...",
          "Scheduling follow-up sequence...",
          "Tracking email delivery...",
        ]

        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)]
        const newLog: StreamingLog = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: randomLog,
          type: Math.random() > 0.9 ? "warning" : "info",
        }

        setStreamingLogs((prev) => [...prev.slice(-19), newLog])

        // Update stats
        setStreamingStats((prev) => {
          const newProcessed = Math.min(prev.processed + Math.floor(Math.random() * 5), prev.total)
          const newSuccess = Math.min(prev.success + Math.floor(Math.random() * 4), newProcessed)
          const newFailed = newProcessed - newSuccess

          // Calculate time elapsed
          const now = new Date()
          const startTime = new Date(now.getTime() - 1000 * 60 * Math.floor(Math.random() * 30))
          const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000)
          const hours = Math.floor(elapsedSeconds / 3600)
          const minutes = Math.floor((elapsedSeconds % 3600) / 60)
          const seconds = elapsedSeconds % 60
          const timeElapsed = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

          // Calculate estimated time remaining
          const percentComplete = newProcessed / prev.total
          if (percentComplete > 0) {
            const totalEstimatedSeconds = elapsedSeconds / percentComplete
            const remainingSeconds = Math.max(0, totalEstimatedSeconds - elapsedSeconds)
            const remainingHours = Math.floor(remainingSeconds / 3600)
            const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60)
            const remainingSecondsDisplay = Math.floor(remainingSeconds % 60)
            const estimatedTimeRemaining = `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSecondsDisplay.toString().padStart(2, "0")}`

            return {
              ...prev,
              processed: newProcessed,
              success: newSuccess,
              failed: newFailed,
              timeElapsed,
              estimatedTimeRemaining,
            }
          }

          return {
            ...prev,
            processed: newProcessed,
            success: newSuccess,
            failed: newFailed,
            timeElapsed,
          }
        })

        // If progress reaches 100%, stop streaming
        if (streamingProgress >= 100) {
          setStreamingActive(false)
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [streamingActive, streamingService, streamingProgress])

  const startStreaming = (service: string, total = 1000) => {
    setStreamingService(service)
    setStreamingActive(true)
    setStreamingProgress(0)
    setStreamingLogs([
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        message: `Starting ${service} process...`,
        type: "info",
      },
    ])
    setStreamingStats({
      processed: 0,
      total: total,
      success: 0,
      failed: 0,
      timeElapsed: "00:00:00",
      estimatedTimeRemaining: "00:00:00",
    })

    // Scroll to streaming section
    if (streamingRef.current) {
      streamingRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const stopStreaming = () => {
    setStreamingActive(false)
    setStreamingLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        message: `${streamingService} process paused by user.`,
        type: "warning",
      },
    ])
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "verification":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "finder":
        return <Search className="h-5 w-5 text-blue-500" />
      case "sender":
        return <Send className="h-5 w-5 text-purple-500" />
      case "all-in-one":
        return <Zap className="h-5 w-5 text-amber-500" />
      default:
        return <Mail className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "Active":
      case "Running":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>
      case "Paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Paused</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "Scheduled":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Scheduled</Badge>
      case "Draft":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      case "Ready":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Ready</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, service: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (service === "verification") {
      setVerificationForm({
        ...verificationForm,
        file: file,
        fileName: file.name,
      })
    } else if (service === "sender") {
      setSenderForm({
        ...senderForm,
        recipientFile: file,
        recipientFileName: file.name,
      })
    }
  }

  const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setSenderForm({
      ...senderForm,
      attachments: [
        ...senderForm.attachments,
        ...files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        })),
      ],
    })
  }

  const removeAttachment = (index: number) => {
    setSenderForm({
      ...senderForm,
      attachments: senderForm.attachments.filter((_, i) => i !== index),
    })
  }

  const handleVerificationSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate starting a verification process
    startStreaming("verification", 5000)
  }

  const handleFinderSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate starting a finder process
    startStreaming("finder", 2000)
  }

  const handleSenderSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate starting a sender process
    startStreaming("sender", 1500)
  }

  const handleAllInOneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate starting an all-in-one process
    startStreaming("all-in-one", 3000)
  }

  const selectTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === Number.parseInt(templateId))
    if (template) {
      setSenderForm({
        ...senderForm,
        templateId: templateId,
        subject: template.subject,
        emailBody: template.body,
      })
    }
  }

  const selectAllInOneTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === Number.parseInt(templateId))
    if (template) {
      setAllInOneForm({
        ...allInOneForm,
        templateId: templateId,
        subject: template.subject,
        emailBody: template.body,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Manage all your email marketing services in one place</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeService} onValueChange={setActiveService}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="finder">Finder</TabsTrigger>
          <TabsTrigger value="sender">Sender</TabsTrigger>
          <TabsTrigger value="all-in-one">All-in-One</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Plan</span>
                    <span className="font-medium">{stats.plan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Credits Remaining</span>
                    <span className="font-medium">{stats.creditsRemaining.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Next Billing Date</span>
                    <span className="font-medium">{stats.nextBillingDate}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Email Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Emails</span>
                    <span className="font-medium">{stats.totalEmails.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Verified Emails</span>
                    <span className="font-medium">{stats.verifiedEmails.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Found Emails</span>
                    <span className="font-medium">{stats.foundEmails.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Sent Emails</span>
                    <span className="font-medium">{stats.sentEmails.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Campaigns</span>
                    <span className="font-medium">{stats.campaigns}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Active Prospects</span>
                    <span className="font-medium">{stats.activeProspects.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Average Open Rate</span>
                    <span className="font-medium">{stats.openRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Average Reply Rate</span>
                    <span className="font-medium">{stats.replyRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activities</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <CardDescription>Your most recent email marketing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="mr-4 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{activity.name}</h4>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{activity.results}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDateTime(activity.date)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification">
          <VerificationTab
            verificationStats={verificationStats}
            verificationForm={verificationForm}
            setVerificationForm={setVerificationForm}
            handleFileChange={handleFileChange}
            handleVerificationSubmit={handleVerificationSubmit}
            streamingService={streamingService}
            streamingActive={streamingActive}
            streamingProgress={streamingProgress}
            streamingStats={streamingStats}
            streamingLogs={streamingLogs}
            startStreaming={startStreaming}
            stopStreaming={stopStreaming}
            setActiveSetupTab={setActiveSetupTab}
            streamingRef={streamingRef}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            setStreamingActive={setStreamingActive}
          />
        </TabsContent>

        {/* Finder Tab */}
        <TabsContent value="finder">
          <FinderTab
            finderStats={finderStats}
            finderForm={finderForm}
            setFinderForm={setFinderForm}
            handleFinderSubmit={handleFinderSubmit}
            streamingService={streamingService}
            streamingActive={streamingActive}
            streamingProgress={streamingProgress}
            streamingStats={streamingStats}
            streamingLogs={streamingLogs}
            startStreaming={startStreaming}
            stopStreaming={stopStreaming}
            setActiveSetupTab={setActiveSetupTab}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            setStreamingActive={setStreamingActive}
          />
        </TabsContent>

        {/* Sender Tab */}
        <TabsContent value="sender">
          <SenderTab
            senderStats={senderStats}
            senderForm={senderForm}
            setSenderForm={setSenderForm}
            handleFileChange={handleFileChange}
            handleSenderSubmit={handleSenderSubmit}
            handleAttachmentChange={handleAttachmentChange}
            removeAttachment={removeAttachment}
            streamingService={streamingService}
            streamingActive={streamingActive}
            streamingProgress={streamingProgress}
            streamingStats={streamingStats}
            streamingLogs={streamingLogs}
            startStreaming={startStreaming}
            stopStreaming={stopStreaming}
            setActiveSetupTab={setActiveSetupTab}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            selectTemplate={selectTemplate}
            emailTemplates={emailTemplates}
            setStreamingActive={setStreamingActive}
          />
        </TabsContent>

        {/* All-in-One Tab */}
        <TabsContent value="all-in-one">
          <AllInOneTab
            allInOneStats={allInOneStats}
            allInOneForm={allInOneForm}
            setAllInOneForm={setAllInOneForm}
            handleAllInOneSubmit={handleAllInOneSubmit}
            streamingService={streamingService}
            streamingActive={streamingActive}
            streamingProgress={streamingProgress}
            streamingStats={streamingStats}
            streamingLogs={streamingLogs}
            startStreaming={startStreaming}
            stopStreaming={stopStreaming}
            setActiveSetupTab={setActiveSetupTab}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            selectAllInOneTemplate={selectAllInOneTemplate}
            emailTemplates={emailTemplates}
            setStreamingActive={setStreamingActive}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
