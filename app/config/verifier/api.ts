/**
 * Email Verification API Configuration
 *
 * This file contains all API endpoints for the email verification service.
 */

// Base URL for the API - can be easily changed
export const baseUrl = "http://localhost:5000"

export const apiEndpoints = {
  // Single email verification
  // POST /api/verify/email
  // Request: { "email": "example@example.com" }
  // Response: {
  //   "email": "example@example.com",
  //   "status": "valid", // valid, invalid, risky, or custom
  //   "provider": "gmail", // Email provider (e.g., gmail, yahoo)
  //   "reason": "", // Reason for the status (if applicable)
  //   "format_valid": true, // Is the email format valid
  //   "domain_valid": true, // Is the domain valid
  //   "disposable": false, // Is it a disposable email
  //   "spam_trap": false, // Is it a spam trap
  //   "timestamp": "2023-01-01T00:00:00Z" // When the verification was performed
  // }
  verification: {
    verifyEmail: `${baseUrl}/api/verify/email`,

    // Batch email verification
    // POST /api/verify/batch
    // Request: { "emails": ["email1@example.com", "email2@example.com"] }
    // Response: Stream of JSON objects, one per line
    verifyBatch: `${baseUrl}/api/verify/batch`,

    // Check job status
    // GET /api/verify/status/:jobId
    // Response: {
    //   "job_id": "abc123",
    //   "status": "completed", // started, processing, completed, failed
    //   "total": 100,
    //   "processed": 100,
    //   "valid": 80,
    //   "invalid": 15,
    //   "risky": 5
    // }
    checkStatus: (jobId: string) => `${baseUrl}/api/verify/status/${jobId}`,

    // Bounce verification
    // POST /api/verify/bounce
    // Request: { "emails": ["email1@example.com", "email2@example.com"] }
    // Response: { "batch_id": "abc123", "status": "started" }
    verifyBounce: `${baseUrl}/api/verify/bounce`,

    // Check bounce verification status
    // GET /api/verify/bounce/status/:batchId
    // Response: {
    //   "batch_id": "abc123",
    //   "status": "completed", // started, processing, completed, failed
    //   "total": 100,
    //   "processed": 100
    // }
    checkBounceStatus: (batchId: string) => `${baseUrl}/api/verify/bounce/status/${batchId}`,

    // Process bounce responses
    // POST /api/verify/bounce/process/:batchId
    // Response: {
    //   "batch_id": "abc123",
    //   "processed": 100,
    //   "valid": 80,
    //   "invalid": 20
    // }
    processBounce: (batchId: string) => `${baseUrl}/api/verify/bounce/process/${batchId}`,
  },

  // Results endpoints
  results: {
    // Get all results
    // GET /api/results
    // Response: Array of verification results
    getAll: `${baseUrl}/api/results`,

    // Get job results
    // GET /api/results/:jobId
    // Response: Array of verification results for a specific job
    getJob: (jobId: string) => `${baseUrl}/api/results/${jobId}`,
  },

  // Statistics endpoints
  statistics: {
    // Get global statistics
    // GET /api/statistics
    // Response: {
    //   "total": 1000,
    //   "valid": 800,
    //   "invalid": 150,
    //   "risky": 50
    // }
    getGlobal: `${baseUrl}/api/statistics`,

    // Get email history
    // GET /api/statistics/history/email?email=example@example.com
    // Response: Array of verification results for a specific email
    getEmailHistory: (email: string) => `${baseUrl}/api/statistics/history/email?email=${encodeURIComponent(email)}`,

    // Get verification history by category
    // GET /api/statistics/history?category=valid
    // Response: Array of verification results for a specific category
    getCategoryHistory: (category: string) =>
      `${baseUrl}/api/statistics/history?category=${encodeURIComponent(category)}`,
  },

  // Settings endpoints
  settings: {
    // Get settings
    // GET /api/settings
    // Response: Current settings object
    get: `${baseUrl}/api/settings`,

    // Update settings
    // PUT /api/settings
    // Request: Updated settings object
    // Response: Updated settings object
    update: `${baseUrl}/api/settings`,
  },
}
