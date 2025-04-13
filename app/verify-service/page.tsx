"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"

export default function VerifyServicePage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">

        {/* Why It's Important */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Email Verification Is Critical</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sending emails to invalid addresses can damage your sender reputation and waste your marketing budget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Improve Deliverability</h3>
                <p className="text-gray-600">
                  Reduce bounce rates by up to 98% by removing invalid and risky email addresses from your lists before
                  sending.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Protect Sender Reputation</h3>
                <p className="text-gray-600">
                  Maintain a positive sender reputation with email providers by consistently sending to valid, engaged
                  recipients.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Save Money</h3>
                <p className="text-gray-600">
                  Stop wasting resources on undeliverable emails. Most email service providers charge based on list
                  size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Email Verification Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our advanced verification process checks multiple aspects of each email address to ensure
                deliverability.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">1</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Upload Your List</h3>
                      <p className="text-gray-600 text-center">
                        Upload a CSV file with your email list or enter emails manually.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Simple and Fast Upload</h4>
                    <p className="text-gray-600 mb-4">
                      Our system accepts CSV files of any size. For smaller lists, you can simply paste the emails
                      directly into our interface. No complicated setup required.
                    </p>
                    <p className="text-gray-600">
                      We support bulk verification of up to 10,000 emails per batch for professional users, with
                      unlimited batches for enterprise customers.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 md:order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Verification Process</h3>
                      <p className="text-gray-600 text-center">
                        Our system performs multiple checks on each email address.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Comprehensive 5-Step Verification</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Syntax Check:</strong> Validates the format of the email address.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Domain Validation:</strong> Verifies the domain exists and has valid MX records.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Mailbox Verification:</strong> Checks if the specific mailbox exists on the mail
                          server.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Disposable Email Detection:</strong> Identifies temporary or disposable email
                          addresses.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Spam Trap Detection:</strong> Identifies potential spam trap email addresses.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Get Results</h3>
                      <p className="text-gray-600 text-center">Download a detailed report with verification results.</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Actionable Verification Results</h4>
                    <p className="text-gray-600 mb-4">
                      Each email is categorized as Valid, Invalid, or Risky, with a detailed risk score and specific
                      verification results for each check performed.
                    </p>
                    <p className="text-gray-600">
                      Download your results as a CSV file that you can easily import into your email marketing platform
                      or CRM. The report includes all verification details to help you make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our email verification service goes beyond basic checks to provide comprehensive protection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time API</h3>
                <p className="text-gray-600 mb-4">
                  Integrate our verification service directly into your applications with our developer-friendly API.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Simple REST API with comprehensive documentation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Verify emails in real-time during form submissions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Webhook notifications for batch processing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Spam Trap Detection</h3>
                <p className="text-gray-600 mb-4">
                  Identify and remove potential spam traps that could get your domain blacklisted.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Proprietary database of known spam trap patterns</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Identification of recycled spam traps</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Protection against honeypot domains</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Risk Scoring</h3>
                <p className="text-gray-600 mb-4">
                  Each email receives a comprehensive risk score to help you make informed decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>0-100 risk score based on multiple factors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Detailed breakdown of risk factors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Customizable risk thresholds</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Bulk Processing</h3>
                <p className="text-gray-600 mb-4">Verify large lists of emails quickly and efficiently.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Process up to 10,000 emails per batch</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Parallel processing for faster results</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Email notifications when verification is complete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Email Deliverability?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Start verifying your email lists today and see the difference in your campaign performance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/verify">
                <Button size="lg" variant="secondary" className="px-8">
                  Try Email Verification
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Create Free Account
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
