/**
 * Email Verification API Configuration
 *
 * This file contains all API endpoints for the email verification service.
 */

// Base URL for the API - can be easily changed
export const baseUrl = "http://localhost:5000"

export const apiEndpoints = {
  // Verification endpoints
  verification: {
    // Single email verification
    // POST /api/verify/email
    verifyEmail: `${baseUrl}/api/verify/email`,

    // Batch email verification
    // POST /api/verify/batch
    verifyBatch: `${baseUrl}/api/verify/batch`,

    // Check batch status
    // GET /api/verify/status/:jobId
    checkStatus: (jobId: string) => `${baseUrl}/api/verify/status/${jobId}`,
  },

  // Results endpoints
  results: {
    // Get all batch IDs
    // GET /api/results/batches
    getBatchIds: `${baseUrl}/api/results/batches`,

    // Get batch results
    // GET /api/results/batch/:batchId
    getBatchResults: (batchId: string) => `${baseUrl}/api/results/batch/${batchId}`,

    // Export batch results
    // GET /api/results/export/:batchId/:category
    exportBatchResults: (batchId: string, category = "all") => `${baseUrl}/api/results/export/${batchId}/${category}`,
  },

  // Statistics endpoints
  statistics: {
    // Get statistics by category
    // GET /api/statistics/category
    getStatsByCategory: `${baseUrl}/api/statistics/category`,
  },
}
