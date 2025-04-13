export interface StreamingStats {
    processed: number
    total: number
    success: number
    failed: number
    timeElapsed: string
    estimatedTimeRemaining: string
  }
  
  export interface StreamingLog {
    id: number
    timestamp: string
    message: string
    type: string
  }
  
  export interface VerificationBatch {
    id: string
    name: string
    date: string
    total: number
    processed?: number
    valid: number
    invalid: number
    status: string
    progress?: number
  }
  
  export interface VerificationStats {
    totalVerified: number
    validEmails: number
    invalidEmails: number
    riskyEmails: number
    verificationRate: number
    disposableEmails: number
    spamTraps: number
    syntaxErrors: number
    domainErrors: number
    mailboxErrors: number
    recentBatches: VerificationBatch[]
    runningBatches: VerificationBatch[]
    errorBreakdown: Array<{ type: string; count: number; percentage: number }>
    industryComparison: {
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
  
  export interface FinderSearch {
    id: string
    query: string
    date: string
    found: number
    status: string
    processed?: number
    total?: number
    progress?: number
  }
  
  export interface FinderStats {
    totalSearches: number
    totalFound: number
    averageConfidence: number
    searchesByIndustry: Array<{ industry: string; searches: number; found: number }>
    topJobTitles: Array<{ title: string; count: number }>
    confidenceDistribution: Array<{ range: string; count: number }>
    recentSearches: FinderSearch[]
    runningSearches: FinderSearch[]
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
  
  export interface SenderCampaign {
    id: string
    name: string
    date: string
    sent: number
    opened: number
    replied: number
    status: string
    total?: number
    progress?: number
  }
  
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
    recentCampaigns: SenderCampaign[]
    runningCampaigns: SenderCampaign[]
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
  
  export interface AllInOneCampaign {
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
  }
  
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
    recentCampaigns: AllInOneCampaign[]
    runningCampaigns: AllInOneCampaign[]
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
  
  export interface EmailTemplate {
    id: number
    name: string
    subject: string
    body: string
    performance: string
    category: string
  }
  