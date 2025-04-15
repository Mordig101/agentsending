// Helper functions for verification component

// Load batch names from localStorage
export const loadBatchNames = (): Record<string, string> => {
  const storedNames = localStorage.getItem("verification_batch_names")
  return storedNames ? JSON.parse(storedNames) : {}
}

// Save batch names to localStorage
export const saveBatchNames = (batchNames: Record<string, string>): void => {
  localStorage.setItem("verification_batch_names", JSON.stringify(batchNames))
}

// Add a new batch name
export const addBatchName = (batchId: string, name: string): void => {
  const batchNames = loadBatchNames()
  batchNames[batchId] = name
  saveBatchNames(batchNames)
}

// Get a batch name by ID
export const getBatchName = (batchId: string): string => {
  const batchNames = loadBatchNames()
  return batchNames[batchId] || `Batch ${batchId.substring(batchId.length - 8)}`
}

// Generate a random batch name
export const generateRandomBatchName = (): string => {
  const adjectives = [
    "Marketing",
    "Sales",
    "Customer",
    "Product",
    "Newsletter",
    "Outreach",
    "Promotional",
    "Campaign",
    "Lead",
    "Prospect",
  ]

  const nouns = [
    "List",
    "Contacts",
    "Database",
    "Subscribers",
    "Audience",
    "Segment",
    "Group",
    "Collection",
    "Batch",
    "Emails",
  ]

  const date = new Date()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear()

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${randomAdjective} ${randomNoun} ${month} ${year}`
}

// Parse emails from text
export const parseEmails = (text: string): string[] => {
  // Simple regex to extract emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const matches = text.match(emailRegex)

  if (!matches) return []

  // Remove duplicates
  return Array.from(new Set(matches))
}

// Calculate verification rate
export const calculateVerificationRate = (valid: number, total: number): number => {
  if (total === 0) return 0
  return Number.parseFloat(((valid / total) * 100).toFixed(1))
}

// Format verification date
export const formatVerificationDate = (dateString: string): string => {
  try {
    // Handle different date formats
    const date = new Date(dateString)
    return date.toISOString().split("T")[0] // YYYY-MM-DD format
  } catch (error) {
    return dateString
  }
}
