"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Mail, Search, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
export default function AllInOneServicePage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">All-in-One Email Marketing</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Find, verify, and send emails in one seamless workflow. The most efficient way to run your email
                  campaigns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard/campaign">
                    <Button size="lg" className="px-8">
                      Start All-in-One Campaign
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/#pricing">
                    <Button size="lg" variant="outline">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="All-in-One Email Marketing"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why It's Important */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Power of Integration</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our all-in-one approach combines three essential services into a single, powerful workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Save Time</h3>
                <p className="text-gray-600">
                  What used to take days now takes minutes. Set up your campaign once and let our platform handle the
                  rest.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Maximize Results</h3>
                <p className="text-gray-600">
                  Each step in our workflow is optimized for performance, resulting in higher deliverability and
                  response rates.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Simplify Your Process</h3>
                <p className="text-gray-600">
                  No more juggling between different tools and platforms. Everything you need in one unified workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">One Click, Three Powerful Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our all-in-one campaign combines email finding, verification, and sending in a single seamless workflow.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

                {/* Step 1 */}
                <div className="relative z-10 mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      1
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 max-w-2xl mx-auto">
                    <div className="flex items-center mb-4">
                      <Search className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-xl font-bold">Email Finding</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Simply describe your target audience or enter a company name, and our AI-powered email finder
                      will:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Search across LinkedIn, company websites, and business directories</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Identify decision-makers matching your criteria</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Find their professional email addresses</span>
                      </li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      <strong>Reach over 10,000 potential prospects with a single search.</strong>
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      2
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 max-w-2xl mx-auto">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-xl font-bold">Email Verification</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      All found emails are automatically verified for deliverability:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Check email format and syntax</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Verify domain existence and MX records</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Confirm mailbox existence</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Detect disposable emails and spam traps</span>
                      </li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      <strong>Only valid emails proceed to the next step, ensuring maximum deliverability.</strong>
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 max-w-2xl mx-auto">
                    <div className="flex items-center mb-4">
                      <Send className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-xl font-bold">Email Sending</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Personalized emails are sent to verified contacts with tracking:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Automatically personalize each email with recipient information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Send at optimal times with automatic throttling</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Track opens, clicks, and replies in real-time</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Set up automated follow-ups for non-responders</span>
                      </li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      <strong>
                        All this happens automatically while you focus on responding to interested prospects.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our All-in-One Solution</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our integrated approach offers unique advantages that separate services can't match.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">One-Click Campaign Launch</h3>
                <p className="text-gray-600 mb-4">
                  Set up your campaign once and launch with a single click. No need to manually transfer data between
                  different tools.
                </p>
                <p className="text-gray-600">
                  <strong>Save hours of manual work with our automated workflow.</strong>
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Reach 10,000+ Prospects</h3>
                <p className="text-gray-600 mb-4">
                  Our powerful email finder can identify thousands of relevant prospects matching your criteria, all
                  verified and ready to contact.
                </p>
                <p className="text-gray-600">
                  <strong>Scale your outreach efforts without sacrificing quality.</strong>
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Unified Workspace</h3>
                <p className="text-gray-600 mb-4">
                  Manage all your campaigns from a single dashboard. Monitor performance, track statistics, and make
                  adjustments in real-time.
                </p>
                <p className="text-gray-600">
                  <strong>Complete visibility and control over your entire email marketing process.</strong>
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Optimized for Results</h3>
                <p className="text-gray-600 mb-4">
                  Each step in our workflow is optimized for maximum performance. Find the right prospects, ensure
                  deliverability, and send personalized messages.
                </p>
                <p className="text-gray-600">
                  <strong>Achieve higher open rates, click rates, and conversions.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Sarah Johnson"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl text-gray-600 italic mb-6">
                    "The all-in-one campaign feature has completely transformed our outreach process. What used to take
                    our team days now happens automatically with a single click. We've seen a 40% increase in response
                    rates and saved countless hours of manual work."
                  </p>
                  <div>
                    <h4 className="text-lg font-bold">Sarah Johnson</h4>
                    <p className="text-gray-500">Marketing Director, TechStart Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Email Marketing?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Start your all-in-one campaign today and experience the power of integrated email marketing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/campaign">
                <Button size="lg" variant="secondary" className="px-8">
                  Start All-in-One Campaign
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
