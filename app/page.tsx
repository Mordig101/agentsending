"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Mail, Search, Send, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/Navbar"
import Layout from "@/components/Layout"

export default function LandingPage() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content:
        "This platform has revolutionized our email marketing strategy. We've seen a 40% increase in response rates!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Sales Manager",
      company: "GrowthForce",
      content:
        "The all-in-one approach saves us hours every week. Verification, finding, and sending all in one place is a game-changer.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Founder",
      company: "Startup Ventures",
      content:
        "The email finder tool helped us connect with key decision-makers we couldn't reach before. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ])

  const [pricingPlans, setPricingPlans] = useState([
    {
      id: 1,
      name: "Free Trial",
      price: "$0",
      period: "7 days",
      features: ["100 Email Verifications", "50 Email Finder Searches", "25 Emails Sending", "Basic Analytics"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      id: 2,
      name: "Professional",
      price: "$49",
      period: "per month",
      features: [
        "5,000 Email Verifications",
        "1,000 Email Finder Searches",
        "500 Emails Sending",
        "Advanced Analytics",
        "Email Templates",
        "Priority Support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$199",
      period: "per month",
      features: [
        "Unlimited Email Verifications",
        "Unlimited Email Finder Searches",
        "Unlimited Emails Sending",
        "Full Analytics Suite",
        "Custom Email Templates",
        "Dedicated Account Manager",
        "API Access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ])

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">All-in-One Email Marketing Platform</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Verify emails, find prospects, and send campaigns - all from one powerful platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="px-8">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline">
                      See Demo
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src="/landing.png?height=300&width=600"
                    alt="Email Marketing Platform"
                    width={600}
                    height={300}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Core Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Everything you need for successful email campaigns in one platform
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Email Verification */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:border-primary/50 transition-all">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email Verification</h3>
                  <p className="text-gray-600 mb-6">
                    Verify email addresses for validity and deliverability. Reduce bounce rates and protect your sender
                    reputation.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Bulk verification (up to 10,000 emails)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Real-time API for developers</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Spam trap detection</span>
                    </li>
                  </ul>
                  <Link href="/verify-service">
                    <Button variant="outline" className="w-full">
                      Try Email Verification
                    </Button>
                  </Link>
                </div>

                {/* Email Finder */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:border-primary/50 transition-all">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email Finder</h3>
                  <p className="text-gray-600 mb-6">
                    Extract professional emails based on keywords, roles, and companies. Find your ideal prospects.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>AI-powered search refinement</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Export to CRM (HubSpot, Salesforce)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Role-based filtering</span>
                    </li>
                  </ul>
                  <Link href="/finder-service">
                    <Button variant="outline" className="w-full">
                      Try Email Finder
                    </Button>
                  </Link>
                </div>

                {/* Email Sending */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:border-primary/50 transition-all">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email Sending</h3>
                  <p className="text-gray-600 mb-6">
                    Send personalized cold emails with tracking and automation. Increase your response rates.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Cold email automation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>A/B Testing (subject lines, CTAs)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Anti-spam compliance</span>
                    </li>
                  </ul>
                  <Link href="/sender-service">
                    <Button variant="outline" className="w-full">
                      Try Email Sending
                    </Button>
                  </Link>
                </div>
              </div>

              {/* All-in-One Feature */}
              <div className="mt-16 bg-primary/5 p-8 rounded-lg border border-primary/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">All-in-One Campaign</h3>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Combine all three services for maximum efficiency. Find, verify, and send emails in one automated
                    workflow.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-white rounded-full p-1 mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Define Your Target Audience</h4>
                          <p className="text-gray-600">
                            Set keywords, filters, and criteria to find your ideal prospects.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-white rounded-full p-1 mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Automated Verification</h4>
                          <p className="text-gray-600">All found emails are automatically verified for deliverability.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-white rounded-full p-1 mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Personalized Sending</h4>
                          <p className="text-gray-600">Send personalized emails to verified contacts with tracking.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-white rounded-full p-1 mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Real-time Analytics</h4>
                          <p className="text-gray-600">Monitor delivery rates, opens, and replies from your dashboard.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/3">
                    <Link href="/all-in-one-service">
                      <Button size="lg" className="w-full">
                        Start All-in-One Campaign
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose the plan that works best for your business needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                      plan.popular ? "ring-2 ring-primary relative" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-primary text-white text-center py-1 text-sm font-medium">Most Popular</div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                      <div className="mb-6">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 ml-2">{plan.period}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Trusted by marketers and sales professionals worldwide
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center mb-6">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-gray-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Email Marketing?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Join thousands of businesses that use our platform to find, verify, and connect with their ideal
                customers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </section>
        </main>

      </div>
    </Layout>
  )
}
