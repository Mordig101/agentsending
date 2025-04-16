// Email Verification Types
export interface VerificationBatch {
  id: string
  name: string
  date: string
  total: number
  processed: number
  valid: number
  invalid: number
  risky?: number
  progress: number
  status: string
}

export interface VerificationStats {
  totalVerified: number
  validEmails: number
  invalidEmails: number
  riskyEmails: number
  verificationRate: number
  disposableEmails?: number
  spamTraps?: number
  syntaxErrors?: number
  domainErrors?: number
  mailboxErrors?: number
  recentBatches: VerificationBatch[]
  runningBatches: VerificationBatch[]
  errorBreakdown?: Array<{ type: string; count: number; percentage: number }>
  industryComparison?: {
    yourRate: number
    industryAvg: number
    topPerformers: number
  }
}

export interface VerificationForm {
  name: string
  mode: string
  threshold: string
  deduplication: boolean
  catchAll: boolean
  disposable: boolean
  syntax: boolean
  domain: boolean
  mailbox: boolean
  file: File | null
  fileName: string
  emailList: string
}

// API Response Types
export interface CategoryStats {
  categories: {
    valid: number
    invalid: number
    risky: number
    total: number
  }
  timestamp: string
}

export interface BatchListResponse {
  batch_ids: string[]
  count: number
}

export interface BatchStatusResponse {
  job_id: string
  status: string
  total_emails: number
  verified_emails: number
  results: {
    valid: number
    invalid: number
    risky: number
    custom: number
  }
  timestamp: string
}

export interface BatchNamesResponse {
  batches: Record<string, string>
}

export interface EmailResult {
  email: string
  category: "valid" | "invalid" | "risky" | "custom"
  provider: string
  timestamp?: string
}

export interface BatchDetailsResponse {
  job_id: string
  status: string
  start_time: string
  end_time?: string
  total_emails: number
  verified_emails: number
  results: {
    valid: number
    invalid: number
    risky: number
    custom: number
  }
  email_results: Record<string, EmailResult>
  emails?: EmailResult[] // This will be populated from email_results for UI rendering
}

// Finder Types
export interface FinderStats {
  totalSearches: number
  totalFound: number
  averageConfidence: number
  searchesByIndustry: Array<{ industry: string; searches: number; found: number }>
  topJobTitles: Array<{ title: string; count: number }>
  confidenceDistribution: Array<{ range: string; count: number }>
  recentSearches: Array<{
    id: string
    query: string
    date: string
    found: number
    status: string
  }>
  runningSearches: Array<{
    id: string
    query: string
    date: string
    processed: number
    found: number
    total: number
    status: string
    progress: number
  }>
  dataSources: Array<{ source: string; percentage: number }>
}

export interface FinderFormData {
  name: string
  searchType: string
  keywords: string
  jobTitles: string
  companies: string
  locations: string
  dataSources: string
  confidenceThreshold: number
  maxResults: number
  includeLinkedIn: boolean
  includeWebsites: boolean
  includeDirectories: boolean
  includeSocialMedia: boolean
  description: string
}

// Sender Types
export interface SenderStats {
  totalSent: number
  delivered: number
  opened: number
  clicked: number
  replied: number
  bounced: number
  unsubscribed: number
  deliveryRate: number
  openRate: number
  clickRate: number
  replyRate: number
  bounceRate: number
  unsubscribeRate: number
  sendingTimes: Array<{ day: string; percentage: number }>
  deviceBreakdown: Array<{ device: string; percentage: number }>
  recentCampaigns: Array<{
    id: string
    name: string
    date: string
    sent: number
    opened: number
    replied: number
    status: string
  }>
  runningCampaigns: Array<{
    id: string
    name: string
    date: string
    total: number
    sent: number
    opened: number
    replied: number
    status: string
    progress: number
  }>
  topPerformingSubjects: Array<{ subject: string; openRate: number }>
  emailTemplates: Array<{ id: number; name: string; performance: string }>
}

export interface SenderFormData {
  name: string
  objective: string
  subject: string
  emailBody: string
  fromName: string
  fromEmail: string
  replyTo: string
  schedule: string
  scheduleDate: string
  scheduleTime: string
  sendingLimit: string
  sendInterval: string
  trackOpens: boolean
  trackClicks: boolean
  followUps: number
  followUpInterval: number
  templateId: string
  attachments: Array<{
    name: string
    size: number
    type: string
    file: File
  }>
  personalizeFirstLine: boolean
  personalizeSubject: boolean
  recipients: string
  recipientFile: File | null
  recipientFileName: string
}

// All-in-One Types
export interface AllInOneStats {
  totalCampaigns: number
  activeCampaigns: number
  totalProspects: number
  averageOpenRate: number
  averageReplyRate: number
  campaignsByIndustry: Array<{ industry: string; count: number; prospects: number }>
  stageBreakdown: {
    finding: number
    verifying: number
    sending: number
    completed: number
  }
  recentCampaigns: Array<{
    id: string
    name: string
    date: string
    prospects: number
    found: number
    verified: number
    sent: number
    opened: number
    replied: number
    status: string
    progress: {
      finding: number
      verifying: number
      sending: number
      overall: number
    }
  }>
  runningCampaigns: Array<{
    id: string
    name: string
    date: string
    prospects: number
    found: number
    verified: number
    sent: number
    opened: number
    replied: number
    status: string
    progress: {
      finding: number
      verifying: number
      sending: number
      overall: number
    }
  }>
  upcomingCampaigns: Array<{
    id: string
    name: string
    date: string
    prospects: number
    status: string
  }>
  bestPractices: Array<{
    id: number
    title: string
    description: string
  }>
}

export interface AllInOneFormData {
  name: string
  goal: string
  targetIndustry: string
  targetJobTitles: string
  targetLocations: string
  targetCompanySize: string
  findingKeywords: string
  findingDescription: string
  verificationMode: string
  verificationThreshold: string
  subject: string
  emailBody: string
  followUps: number
  followUpInterval: number
  sendingLimit: string
  sendInterval: string
  trackOpens: boolean
  trackClicks: boolean
  templateId: string
  personalizeFirstLine: boolean
  personalizeSubject: boolean
  schedule: string
  scheduleDate: string
  scheduleTime: string
}

// Streaming Types
export interface StreamingStats {
  processed: number
  total: number
  success: number
  failed: number
  timeElapsed: string
  estimatedTimeRemaining: string
}

export interface StreamingLog {
  id: number | string
  timestamp: string
  message: string
  type: string
}

// Email Template Type
export interface EmailTemplate {
  id: number
  name: string
  subject: string
  body: string
  performance: string
  category: string
}
