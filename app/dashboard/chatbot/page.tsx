"use client"

import { Bot, MessageSquare, Sparkles, Clock, BrainCircuit, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ChatbotPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Chatbot</h1>
        <Badge variant="outline" className="text-lg font-medium">
          Coming Soon
        </Badge>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 border-2 border-dashed border-primary/50 bg-primary/5">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">AgentSending AI Assistant</CardTitle>
            <CardDescription className="text-lg">
              Your intelligent email marketing companion is on the way!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <p className="text-gray-600 mb-6">
              We're building a powerful AI assistant to help you optimize your email campaigns, analyze results, and
              provide actionable insights to improve your marketing performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start p-4 bg-white rounded-lg border">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Natural Conversations</h3>
                  <p className="text-sm text-gray-500">Ask questions in plain language and get helpful responses</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-lg border">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Smart Suggestions</h3>
                  <p className="text-sm text-gray-500">Get AI-powered recommendations to improve your campaigns</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-lg border">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Time-Saving Automation</h3>
                  <p className="text-sm text-gray-500">Automate routine tasks with simple voice or text commands</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-lg border">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Advanced Analytics</h3>
                  <p className="text-sm text-gray-500">Get deeper insights from your campaign data</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center pt-2 pb-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Launch Expected</h3>
              <Badge variant="outline" className="text-lg">
                Q3 2023
              </Badge>
            </div>
            <Button className="w-full max-w-xs">
              <Zap className="mr-2 h-4 w-4" />
              Join Waitlist
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <h2 className="text-xl font-medium mb-4">Have suggestions for our AI assistant?</h2>
          <p className="text-gray-600 mb-4">
            We'd love to hear your ideas about features you'd like to see in our upcoming AI chatbot.
          </p>
          <Button variant="outline">Share Your Feedback</Button>
        </div>
      </div>
    </div>
  )
}
