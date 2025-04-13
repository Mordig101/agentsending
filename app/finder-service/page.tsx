"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Mail, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"

export default function FinderServicePage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      

      <main className="flex-grow">

        {/* Why It's Important */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Finding the Right Emails Matters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connecting with the right decision-makers is crucial for successful outreach and business growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Reach Decision Makers</h3>
                <p className="text-gray-600">
                  Connect directly with key decision-makers instead of getting lost in generic contact forms or
                  gatekeepers.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Personalized Outreach</h3>
                <p className="text-gray-600">
                  Craft personalized messages that address specific pain points and needs of your target audience.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Scale Your Prospecting</h3>
                <p className="text-gray-600">
                  Find hundreds of qualified prospects in minutes instead of spending hours on manual research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Email Finder Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered email finder uses multiple data sources to find the most accurate email addresses.
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
                      <h3 className="text-xl font-bold text-center mb-2">Define Your Search</h3>
                      <p className="text-gray-600 text-center">
                        Specify your target audience with keywords or company information.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Flexible Search Options</h4>
                    <p className="text-gray-600 mb-4">
                      Search by keywords (e.g., "HR managers in tech startups") or by specific company information. Our
                      natural language processing understands your intent and finds the most relevant prospects.
                    </p>
                    <p className="text-gray-600">
                      Refine your search with additional filters like job title, location, company size, and industry to
                      find exactly the right prospects for your campaign.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 md:order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 mx-auto">
                        <span className="text-2xl font-bold text-primary">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">AI-Powered Search</h3>
                      <p className="text-gray-600 text-center">
                        Our AI searches multiple data sources to find email addresses.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Comprehensive Data Sources</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>LinkedIn Profiles:</strong> We analyze professional profiles to identify potential
                          matches.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Company Websites:</strong> We scan company websites and directories for contact
                          information.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Business Directories:</strong> We search business directories and professional
                          databases.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Pattern Recognition:</strong> We analyze email patterns within organizations to
                          predict the most likely format.
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
                      <p className="text-gray-600 text-center">
                        Receive a list of verified email addresses with confidence scores.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Actionable Results</h4>
                    <p className="text-gray-600 mb-4">
                      Each email address comes with a confidence score indicating the likelihood of deliverability. We
                      also provide additional information like name, role, company, and LinkedIn profile when available.
                    </p>
                    <p className="text-gray-600">
                      Export your results as a CSV file or send them directly to your CRM or email marketing platform.
                      You can also verify the emails with our Email Verification service for maximum deliverability.
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
                Our email finder goes beyond basic search to provide comprehensive prospecting tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI-Powered Search Refinement</h3>
                <p className="text-gray-600 mb-4">
                  Our AI learns from your searches to provide increasingly relevant results over time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Natural language processing understands your intent</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Learns from your feedback to improve results</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Suggests related search terms and filters</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">CRM Integration</h3>
                <p className="text-gray-600 mb-4">
                  Send your results directly to your favorite CRM or email marketing platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Direct integration with HubSpot, Salesforce, and more</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom field mapping for seamless data transfer</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Automatic lead creation and enrichment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Role-Based Filtering</h3>
                <p className="text-gray-600 mb-4">Find exactly the right decision-makers for your outreach.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Filter by job title, seniority, and department</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Target specific roles like CEO, CTO, Marketing Director</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Exclude certain roles or departments</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Confidence Scoring</h3>
                <p className="text-gray-600 mb-4">Understand the reliability of each email address we find.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>0-100 confidence score based on multiple factors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Detailed explanation of how each score was determined</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Filter results by minimum confidence score</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Ideal Prospects?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Start finding professional email addresses today and connect with decision-makers who matter to your
              business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/finder">
                <Button size="lg" variant="secondary" className="px-8">
                  Try Email Finder
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
