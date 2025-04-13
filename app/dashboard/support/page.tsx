"use client"

import { useState, useEffect, useRef } from "react"
import { format } from "date-fns"
import { Send, Paperclip, File, MoreHorizontal, Phone, Video, Info, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample support agents
const SUPPORT_AGENTS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Customer Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Technical Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Account Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
]

// Sample chat history
const generateSampleMessages = () => {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  return [
    {
      id: 1,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content: "Hello! Welcome to AgentSending support. How can I help you today?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "read",
    },
    {
      id: 2,
      sender: "user",
      content: "Hi, I'm having trouble with my email verification campaign. It seems to be stuck at 45% completion.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.9), // 1.9 hours ago
      status: "read",
    },
    {
      id: 3,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content: "I'm sorry to hear that. Let me check your account. Could you please provide the campaign ID or name?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.8), // 1.8 hours ago
      status: "read",
    },
    {
      id: 4,
      sender: "user",
      content: "It's called 'Q2 Customer Database Verification' and was started yesterday.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.7), // 1.7 hours ago
      status: "read",
    },
    {
      id: 5,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content:
        "Thank you. I can see the campaign in our system. It appears there was a temporary issue with our verification service that affected several campaigns. The issue has been resolved, and your campaign should resume processing shortly. I'll monitor it to ensure it completes successfully.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.6), // 1.6 hours ago
      status: "read",
    },
    {
      id: 6,
      sender: "user",
      content: "That's great news! How long do you think it will take to complete?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
      status: "read",
    },
    {
      id: 7,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content:
        "Based on the size of your campaign (approximately 5,000 emails) and current processing speed, it should complete within the next 2-3 hours. I'll send you an email notification once it's finished.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.4), // 1.4 hours ago
      status: "read",
    },
    {
      id: 8,
      sender: "user",
      content: "Perfect, thank you for your help!",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.3), // 1.3 hours ago
      status: "read",
    },
    {
      id: 9,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content: "You're welcome! Is there anything else I can assist you with today?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.2), // 1.2 hours ago
      status: "read",
    },
    {
      id: 10,
      sender: "user",
      content: "Actually, I was wondering if there's a way to export the verification results to CSV?",
      timestamp: new Date(now.getTime() - 1000 * 60 * 5), // 5 minutes ago
      status: "read",
    },
    {
      id: 11,
      sender: "agent",
      agent: SUPPORT_AGENTS[0],
      content:
        "Once the campaign is complete, you can export the results by going to the campaign details page and clicking the 'Export Results' button in the top right corner. You'll have options to export as CSV, Excel, or JSON format.",
      timestamp: new Date(now.getTime() - 1000 * 60 * 4), // 4 minutes ago
      status: "read",
    },
  ]
}

// Sample tickets
const SAMPLE_TICKETS = [
  {
    id: "TKT-1234",
    subject: "Email Verification Campaign Stuck",
    status: "open",
    priority: "medium",
    created: new Date(new Date().getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
    lastUpdated: new Date(new Date().getTime() - 1000 * 60 * 4), // 4 minutes ago
    assignedTo: SUPPORT_AGENTS[0],
  },
  {
    id: "TKT-1233",
    subject: "Billing Question - Monthly Subscription",
    status: "closed",
    priority: "low",
    created: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    lastUpdated: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 1 day ago
    assignedTo: SUPPORT_AGENTS[2],
  },
  {
    id: "TKT-1232",
    subject: "API Integration Help",
    status: "pending",
    priority: "high",
    created: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    lastUpdated: new Date(new Date().getTime() - 1000 * 60 * 60 * 12), // 12 hours ago
    assignedTo: SUPPORT_AGENTS[1],
  },
]

export default function SupportPage() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAgent, setCurrentAgent] = useState(SUPPORT_AGENTS[0])
  const [tickets, setTickets] = useState(SAMPLE_TICKETS)
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium",
  })

  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load messages (in a real app, this would be an API call)
    setMessages(generateSampleMessages())
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        sender: "agent",
        agent: currentAgent,
        content: "Thank you for your message. I'll look into this and get back to you shortly.",
        timestamp: new Date(),
        status: "delivered",
      }

      setMessages((prevMessages) => [...prevMessages, agentMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleCreateTicket = () => {
    const newTicketObj = {
      id: `TKT-${1235 + tickets.length}`,
      subject: newTicket.subject,
      status: "open",
      priority: newTicket.priority,
      created: new Date(),
      lastUpdated: new Date(),
      assignedTo: SUPPORT_AGENTS[Math.floor(Math.random() * SUPPORT_AGENTS.length)],
    }

    setTickets([newTicketObj, ...tickets])
    setIsNewTicketOpen(false)
    setNewTicket({
      subject: "",
      description: "",
      priority: "medium",
    })

    // Add system message about new ticket
    const systemMessage = {
      id: messages.length + 1,
      sender: "system",
      content: `New support ticket created: ${newTicketObj.id} - ${newTicketObj.subject}`,
      timestamp: new Date(),
      status: "delivered",
    }

    setMessages([...messages, systemMessage])
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {}

    messages.forEach((message) => {
      const date = format(message.timestamp, "yyyy-MM-dd")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })

    return groups
  }

  // Format date for message groups
  const formatMessageDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) {
      return "Today"
    } else if (format(date, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")) {
      return "Yesterday"
    } else {
      return format(date, "MMMM d, yyyy")
    }
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "open":
        return "default"
      case "pending":
        return "warning"
      case "closed":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Get priority badge variant
  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  // Render chat interface
  const renderChatInterface = () => {
    const messageGroups = groupMessagesByDate()

    return (
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="border-b p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={currentAgent.avatar} alt={currentAgent.name} />
              <AvatarFallback>
                {currentAgent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center">
                {currentAgent.name}
                <Badge variant="outline" className="ml-2 text-xs">
                  <span
                    className={`mr-1 h-2 w-2 rounded-full ${
                      currentAgent.status === "online" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></span>
                  {currentAgent.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">{currentAgent.role}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuItem>View Ticket Details</DropdownMenuItem>
                <DropdownMenuItem>Request Different Agent</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Email Transcript</DropdownMenuItem>
                <DropdownMenuItem>Close Conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {Object.keys(messageGroups).map((date) => (
            <div key={date} className="mb-6">
              <div className="flex justify-center mb-4">
                <Badge variant="outline" className="bg-white">
                  {formatMessageDate(date)}
                </Badge>
              </div>

              <div className="space-y-4">
                {messageGroups[date].map((message) => {
                  if (message.sender === "system") {
                    return (
                      <div key={message.id} className="flex justify-center">
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {message.content}
                        </Badge>
                      </div>
                    )
                  }

                  return (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "agent" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={message.agent.avatar} alt={message.agent.name} />
                          <AvatarFallback>
                            {message.agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.sender === "agent" && (
                          <div className="text-xs text-gray-500 mb-1">{message.agent.name}</div>
                        )}
                        <div>{message.content}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            message.sender === "user" ? "text-primary-foreground/80" : "text-gray-500"
                          }`}
                        >
                          {format(message.timestamp, "h:mm a")}
                          {message.sender === "user" && (
                            <span className="ml-1">
                              {message.status === "read" ? "✓✓" : message.status === "delivered" ? "✓" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button disabled={!newMessage.trim() || isLoading} onClick={handleSendMessage}>
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <div>Attach files by dragging & dropping or clicking the paperclip icon</div>
            <div>Press Enter to send, Shift+Enter for new line</div>
          </div>
        </div>
      </div>
    )
  }

  // Render tickets list
  const renderTicketsList = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Your Support Tickets</h2>
          <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
            <DialogTrigger asChild>
              <Button>Create Ticket</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Support Ticket</DialogTitle>
                <DialogDescription>
                  Provide details about your issue and we'll assign a support agent to help you.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="col-span-3"
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="col-span-3"
                    placeholder="Detailed description of your issue"
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTicket} disabled={!newTicket.subject.trim()}>
                  Create Ticket
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{ticket.id}</span>
                      <Badge variant={getStatusBadgeVariant(ticket.status)} className="ml-2">
                        {ticket.status}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(ticket.priority)} className="ml-2">
                        {ticket.priority} priority
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium mt-1">{ticket.subject}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Created: {format(ticket.created, "MMM d, yyyy h:mm a")}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last Updated: {format(ticket.lastUpdated, "MMM d, yyyy h:mm a")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Assigned to:</div>
                    <div className="flex items-center justify-end mt-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                        <AvatarFallback>
                          {ticket.assignedTo.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{ticket.assignedTo.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {ticket.status !== "closed" && <Button size="sm">Continue Conversation</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Support Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-2 rounded-md bg-primary/10 text-primary">
                <User className="h-5 w-5 mr-3" />
                <div className="font-medium">Live Chat</div>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <File className="h-5 w-5 mr-3 text-gray-500" />
                <div>Support Tickets</div>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Bot className="h-5 w-5 mr-3 text-gray-500" />
                <div>AI Assistant</div>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <div>Phone Support</div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                View Knowledge Base
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Support Team</CardTitle>
              <CardDescription>Available agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {SUPPORT_AGENTS.map((agent) => (
                <div key={agent.id} className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-gray-500">{agent.role}</div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <span
                      className={`mr-1 h-2 w-2 rounded-full ${
                        agent.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></span>
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <Tabs defaultValue="chat">
              <TabsList className="w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="chat"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Live Chat
                </TabsTrigger>
                <TabsTrigger
                  value="tickets"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Support Tickets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="p-0">
                {renderChatInterface()}
              </TabsContent>
              <TabsContent value="tickets" className="p-6">
                {renderTicketsList()}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
