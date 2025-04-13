"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Mail, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
export default function SenderServicePage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
  

        {/* Why It's Important */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Email Sending Matters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Effective email outreach remains one of the highest ROI marketing channels when done right.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">High ROI Channel</h3>
                <p className="text-gray-600">
                  Email marketing delivers an average ROI of $42 for every $1 spent, outperforming other digital
                  marketing channels.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Direct Communication</h3>
                <p className="text-gray-600">
                  Email provides a direct line to your prospects' inbox, unlike social media where algorithms limit your
                  reach.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Measurable Results</h3>
                <p className="text-gray-600">
                  Track opens, clicks, and replies to understand what's working and continuously improve your campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Email Sending Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform makes it easy to send personalized emails at scale while maintaining deliverability.
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
                      <h3 className="text-xl font-bold text-center mb-2">Connect Your Email</h3>
                      <p className="text-gray-600 text-center">Connect your email account or SMTP server.</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Multiple Connection Options</h4>
                    <p className="text-gray-600 mb-4">
                      Connect your Gmail, Outlook, or custom SMTP server in just a few clicks. Our platform handles the
                      technical details so you can focus on your message.
                    </p>
                    <p className="text-gray-600">
                      We recommend using app-specific passwords for enhanced security. Your credentials are encrypted
                      and never stored in plain text.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 md:order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Compose Your Message</h3>
                      <p className="text-gray-600 text-center">
                        Create personalized email templates with dynamic fields.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Powerful Personalization</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Dynamic Fields:</strong> Use {"{First Name}"}, {"{Company}"}, and other fields for
                          personalization.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Rich Text Editor:</strong> Format your emails with bold, italic, links, and more.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Attachments:</strong> Add files, images, and documents to your emails.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Template Library:</strong> Save and reuse your best-performing templates.
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
                      <h3 className="text-xl font-bold text-center mb-2">Add Recipients</h3>
                      <p className="text-gray-600 text-center">Upload a CSV or enter recipients manually.</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Flexible Recipient Management</h4>
                    <p className="text-gray-600 mb-4">
                      Upload a CSV file with recipient information or enter emails manually. You can also use the
                      results from our Email Finder service directly.
                    </p>
                    <p className="text-gray-600">
                      Include additional fields like first name, last name, company, and custom fields to enable
                      personalization in your emails.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 md:order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">4</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Send & Track</h3>
                      <p className="text-gray-600 text-center">Send emails and monitor performance in real-time.</p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Smart Sending & Analytics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Delivery Optimization:</strong> Automatic throttling and scheduling to maximize
                          deliverability.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Open Tracking:</strong> See who opened your emails and when.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Click Tracking:</strong> Monitor which links recipients clicked on.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Reply Detection:</strong> Get notified when recipients reply to your emails.
                        </span>
                      </li>
                    </ul>
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
                Our email sending service includes powerful features to maximize your campaign success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Cold Email Automation</h3>
                <p className="text-gray-600 mb-4">
                  Set up automated follow-up sequences to increase your response rates.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Multi-step email sequences with custom timing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Conditional logic based on recipient actions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Automatic follow-up stopping when recipients reply</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">A/B Testing</h3>
                <p className="text-gray-600 mb-4">
                  Test different subject lines, email content, and CTAs to optimize your campaigns.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Test multiple subject lines and email variations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Automatic winner selection based on open or click rates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Detailed performance reports for each variation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Anti-Spam Compliance</h3>
                <p className="text-gray-600 mb-4">
                  Ensure your emails comply with anti-spam regulations and reach the inbox.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Automatic throttling to avoid triggering spam filters</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Email warm-up to establish sender reputation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>CAN-SPAM and GDPR compliance features</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Gain deep insights into your campaign performance.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Detailed open, click, and reply tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Engagement heatmaps showing when recipients engage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Performance comparison across campaigns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Send Effective Email Campaigns?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Start sending personalized emails today and see the difference in your response rates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/sender">
                <Button size="lg" variant="secondary" className="px-8">
                  Try Email Sending
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
