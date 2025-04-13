"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  addHours,
  differenceInMinutes,
  differenceInDays,
  isAfter,
  isBefore,
} from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Search,
  Filter,
  CalendarPlus,
  ArrowUpDown,
  Download,
  Share2,
  Trash2,
  Edit,
  Info,
  Users,
  Target,
  BarChart,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define campaign types and their colors
const CAMPAIGN_TYPES = {
  VERIFICATION: {
    label: "Email Verification Campaign",
    color: "bg-green-500",
    icon: CheckCircle,
    description: "Verify email addresses for accuracy and deliverability",
  },
  FINDER: {
    label: "Email Finder Campaign",
    color: "bg-purple-500",
    icon: Search,
    description: "Find email addresses for your target prospects",
  },
  SENDER: {
    label: "Email Sending Campaign",
    color: "bg-blue-500",
    icon: Send,
    description: "Send personalized emails to your contacts",
  },
  ALL_IN_ONE: {
    label: "All-in-One Campaign",
    color: "bg-amber-500",
    icon: Zap,
    description: "Combined campaign with finding, verification, and sending",
  },
  REMINDER: {
    label: "Reminder",
    color: "bg-yellow-500",
    icon: Clock,
    description: "Reminder for upcoming tasks or deadlines",
  },
  ALERT: {
    label: "Alert",
    color: "bg-red-500",
    icon: AlertCircle,
    description: "Important alert requiring attention",
  },
}

// Sample campaign names by type
const CAMPAIGN_NAMES = {
  VERIFICATION: [
    "Monthly Email List Verification",
    "New Leads Verification",
    "Customer Database Cleanup",
    "Bounce Rate Reduction",
    "Pre-Campaign Verification",
  ],
  FINDER: [
    "Tech Companies Prospect Finder",
    "LinkedIn Leads Finder",
    "Decision Makers Finder",
    "Industry Experts Finder",
    "Competitor Clients Finder",
  ],
  SENDER: [
    "Monthly Newsletter",
    "Product Launch Announcement",
    "Follow-up Sequence",
    "Promotional Offer",
    "Event Invitation",
  ],
  ALL_IN_ONE: [
    "Q2 Sales Outreach",
    "New Market Entry Campaign",
    "Product Demo Request Campaign",
    "Webinar Registration Drive",
    "Customer Reactivation Campaign",
  ],
  REMINDER: ["Campaign Planning Meeting", "Content Deadline", "Team Check-in", "Strategy Review", "Budget Planning"],
  ALERT: ["Deliverability Issue", "Spam Complaint Alert", "API Usage Limit", "Account Verification", "Security Update"],
}

// Sample team members
const TEAM_MEMBERS = [
  { id: 1, name: "Alex Johnson", role: "Marketing Manager", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Sam Wilson", role: "Email Specialist", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Taylor Kim", role: "Content Writer", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Jordan Smith", role: "Data Analyst", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Casey Brown", role: "Sales Representative", avatar: "/placeholder.svg?height=40&width=40" },
]

// Generate sample events data
const generateSampleEvents = () => {
  const now = new Date()
  const events = []

  // Generate events for the current month and next month
  for (let i = -15; i < 45; i++) {
    const date = addDays(now, i)

    // Add 0-3 events per day with some randomness
    const numEvents = Math.floor(Math.random() * 4)

    for (let j = 0; j < numEvents; j++) {
      const eventTypes = Object.keys(CAMPAIGN_TYPES)
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]

      // Get a random campaign name for this type
      const campaignNames = CAMPAIGN_NAMES[type]
      const campaignName = campaignNames[Math.floor(Math.random() * campaignNames.length)]

      const startHour = 9 + Math.floor(Math.random() * 8) // Between 9 AM and 5 PM
      const durationHours = 1 + Math.floor(Math.random() * 4) // 1-4 hours
      const startDate = addHours(date, startHour)
      const endDate = addHours(startDate, durationHours)

      // Generate random metrics based on campaign type
      let metrics = {}
      if (type === "VERIFICATION") {
        metrics = {
          totalEmails: 1000 + Math.floor(Math.random() * 9000),
          verifiedEmails: 800 + Math.floor(Math.random() * 8000),
          progress: Math.floor(Math.random() * 101),
        }
      } else if (type === "FINDER") {
        metrics = {
          searchedDomains: 50 + Math.floor(Math.random() * 150),
          foundEmails: 200 + Math.floor(Math.random() * 800),
          progress: Math.floor(Math.random() * 101),
        }
      } else if (type === "SENDER") {
        metrics = {
          sentEmails: 500 + Math.floor(Math.random() * 4500),
          openRate: 15 + Math.floor(Math.random() * 40),
          clickRate: 2 + Math.floor(Math.random() * 15),
          progress: Math.floor(Math.random() * 101),
        }
      } else if (type === "ALL_IN_ONE") {
        metrics = {
          prospectsFound: 300 + Math.floor(Math.random() * 700),
          emailsVerified: 250 + Math.floor(Math.random() * 600),
          emailsSent: 200 + Math.floor(Math.random() * 500),
          responses: 10 + Math.floor(Math.random() * 90),
          progress: Math.floor(Math.random() * 101),
        }
      }

      // Assign team members
      const assignedTeamMembers = []
      const numTeamMembers = 1 + Math.floor(Math.random() * 3) // 1-3 team members
      const shuffledTeam = [...TEAM_MEMBERS].sort(() => 0.5 - Math.random())
      for (let k = 0; k < numTeamMembers; k++) {
        assignedTeamMembers.push(shuffledTeam[k])
      }

      events.push({
        id: `event-${i}-${j}`,
        title: campaignName,
        description: CAMPAIGN_TYPES[type].description + ` for ${campaignName}`,
        start: startDate,
        end: endDate,
        type,
        status: isAfter(startDate, now)
          ? "scheduled"
          : Math.random() > 0.3
            ? "in-progress"
            : Math.random() > 0.5
              ? "completed"
              : "failed",
        metrics,
        assignedTo: assignedTeamMembers,
        priority: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        notes: `Additional notes for ${campaignName}. This campaign ${
          isAfter(startDate, now) ? "will target" : "targeted"
        } key prospects in our database.`,
      })
    }
  }

  return events
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState("month") // month, week, day
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "VERIFICATION",
    start: new Date(),
    end: addHours(new Date(), 1),
    assignedTo: [],
    priority: "medium",
    notes: "",
  })
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [filteredTypes, setFilteredTypes] = useState(Object.keys(CAMPAIGN_TYPES))
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date") // date, priority, type
  const [filterPriority, setFilterPriority] = useState("all") // all, high, medium, low

  useEffect(() => {
    // Load events (in a real app, this would be an API call)
    setEvents(generateSampleEvents())
  }, [])

  // Navigation functions
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Filter events for the selected date
  const getEventsForDate = (date) => {
    return events.filter(
      (event) =>
        isSameDay(parseISO(event.start.toISOString()), date) &&
        filteredTypes.includes(event.type) &&
        (filterPriority === "all" || event.priority === filterPriority) &&
        (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // Filter events for the selected view (month, week, day)
  const getEventsForView = () => {
    if (view === "day") {
      return getEventsForDate(selectedDate)
    } else if (view === "week") {
      const startDate = startOfWeek(selectedDate)
      const result = []
      for (let i = 0; i < 7; i++) {
        const date = addDays(startDate, i)
        const dayEvents = getEventsForDate(date)
        result.push(...dayEvents)
      }
      return result
    } else {
      // Month view - already handled in the rendering
      return events.filter(
        (event) =>
          filteredTypes.includes(event.type) &&
          (filterPriority === "all" || event.priority === filterPriority) &&
          (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }
  }

  // Get upcoming events
  const getUpcomingEvents = () => {
    const now = new Date()
    return events
      .filter(
        (event) =>
          isAfter(parseISO(event.start.toISOString()), now) &&
          filteredTypes.includes(event.type) &&
          (filterPriority === "all" || event.priority === filterPriority) &&
          (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      .sort((a, b) => parseISO(a.start.toISOString()) - parseISO(b.start.toISOString()))
  }

  // Get in-progress events
  const getInProgressEvents = () => {
    const now = new Date()
    return events
      .filter(
        (event) =>
          isBefore(parseISO(event.start.toISOString()), now) &&
          isAfter(parseISO(event.end.toISOString()), now) &&
          filteredTypes.includes(event.type) &&
          (filterPriority === "all" || event.priority === filterPriority) &&
          (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      .sort((a, b) => parseISO(a.end.toISOString()) - parseISO(b.end.toISOString()))
  }

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  // Add new event
  const handleAddEvent = () => {
    const event = {
      id: `event-${Date.now()}`,
      ...newEvent,
      status: "scheduled",
      metrics: {},
    }
    setEvents([...events, event])
    setIsAddEventOpen(false)
    setNewEvent({
      title: "",
      description: "",
      type: "VERIFICATION",
      start: new Date(),
      end: addHours(new Date(), 1),
      assignedTo: [],
      priority: "medium",
      notes: "",
    })
  }

  // Toggle event type filter
  const toggleEventTypeFilter = (type) => {
    if (filteredTypes.includes(type)) {
      setFilteredTypes(filteredTypes.filter((t) => t !== type))
    } else {
      setFilteredTypes([...filteredTypes, type])
    }
  }

  // Format duration
  const formatDuration = (start, end) => {
    const minutes = differenceInMinutes(parseISO(end.toISOString()), parseISO(start.toISOString()))
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours === 0) {
      return `${minutes} minutes`
    } else if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
    }
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "failed":
        return "destructive"
      case "in-progress":
        return "default"
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

  // Render calendar header
  const renderHeader = () => {
    return (
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Campaign Calendar</h1>
            <Badge variant="outline" className="ml-2">
              {format(currentDate, "MMMM yyyy")}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Campaign</DialogTitle>
                  <DialogDescription>Schedule a new campaign on your calendar.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Campaign Name
                    </Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="col-span-3"
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="col-span-3"
                      placeholder="Describe the campaign purpose"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Campaign Type
                    </Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CAMPAIGN_TYPES).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select
                      value={newEvent.priority}
                      onValueChange={(value) => setNewEvent({ ...newEvent, priority: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">
                      Start Date & Time
                    </Label>
                    <Input
                      id="start-date"
                      type="datetime-local"
                      value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right">
                      End Date & Time
                    </Label>
                    <Input
                      id="end-date"
                      type="datetime-local"
                      value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="notes" className="text-right pt-2">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                      className="col-span-3"
                      placeholder="Add any additional notes or context"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent}>Schedule Campaign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="type">Campaign Type</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    )
  }

  // Render event filters
  const renderFilters = () => {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="text-sm font-medium mr-2 flex items-center">
          <Filter className="h-4 w-4 mr-1" /> Filter by:
        </div>
        {Object.entries(CAMPAIGN_TYPES).map(([key, { label, color }]) => (
          <Badge
            key={key}
            variant={filteredTypes.includes(key) ? "default" : "outline"}
            className={`cursor-pointer ${filteredTypes.includes(key) ? color + " text-white" : ""}`}
            onClick={() => toggleEventTypeFilter(key)}
          >
            {label}
          </Badge>
        ))}
      </div>
    )
  }

  // Render month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)

    const rows = []
    let days = []
    let day = startDate

    // Render days of week header
    const daysOfWeek = []
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div key={i} className="text-center font-medium py-2">
          {format(addDays(startOfWeek(new Date()), i), "EEE")}
        </div>,
      )
    }

    // Create calendar grid
    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const dayEvents = getEventsForDate(cloneDay).filter((event) => filteredTypes.includes(event.type))

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] p-1 border border-gray-200 ${
              !isSameMonth(day, monthStart) ? "bg-gray-50 text-gray-400" : ""
            } ${isSameDay(day, new Date()) ? "bg-blue-50" : ""} ${
              isSameDay(day, selectedDate) ? "border-primary border-2" : ""
            }`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>
                {format(day, "d")}
              </span>
              {isSameDay(day, new Date()) && (
                <Badge variant="outline" className="text-xs">
                  Today
                </Badge>
              )}
            </div>
            <div className="mt-1 space-y-1 max-h-[100px] overflow-y-auto">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded truncate cursor-pointer ${CAMPAIGN_TYPES[event.type].color} text-white hover:opacity-90 transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEventClick(event)
                  }}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="flex items-center text-xs opacity-90">
                    <Clock className="h-3 w-3 mr-1 inline" />
                    {format(parseISO(event.start.toISOString()), "HH:mm")} -
                    {format(parseISO(event.end.toISOString()), "HH:mm")}
                  </div>
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div
                  className="text-xs text-center bg-gray-100 p-1 rounded cursor-pointer hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDate(cloneDay)
                    setView("day")
                  }}
                >
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-0">
          {days}
        </div>,
      )
      days = []
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-0 border-b border-gray-200">{daysOfWeek}</div>
        {rows}
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate)
    const days = []

    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i)
      days.push(day)
    }

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 border-r text-center font-medium">Time</div>
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`p-2 text-center font-medium ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}
            >
              <div>{format(day, "EEE")}</div>
              <div className={isSameDay(day, new Date()) ? "text-primary" : ""}>{format(day, "d")}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          <div className="border-r">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-20 border-b p-1 text-xs text-right pr-2">
                {i + 8}:00
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day.toString()} className="relative">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-20 border-b border-r p-1 ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}
                ></div>
              ))}

              {getEventsForDate(day)
                .filter((event) => filteredTypes.includes(event.type))
                .map((event) => {
                  const startHour = parseISO(event.start.toISOString()).getHours()
                  const startMinutes = parseISO(event.start.toISOString()).getMinutes()
                  const endHour = parseISO(event.end.toISOString()).getHours()
                  const endMinutes = parseISO(event.end.toISOString()).getMinutes()

                  const top = ((startHour - 8) * 60 + startMinutes) * (20 / 60)
                  const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) * (20 / 60)

                  return (
                    <div
                      key={event.id}
                      className={`absolute left-0 right-0 mx-1 p-1 rounded text-xs text-white overflow-hidden ${CAMPAIGN_TYPES[event.type].color} hover:opacity-90 transition-opacity`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate flex items-center">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {format(parseISO(event.start.toISOString()), "HH:mm")} -
                        {format(parseISO(event.end.toISOString()), "HH:mm")}
                      </div>
                      {event.status !== "scheduled" && (
                        <div className="mt-1">
                          <Badge variant={getStatusBadgeVariant(event.status)} className="text-[10px] py-0 h-4">
                            {event.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    const dayEvents = getEventsForDate(selectedDate)
      .filter((event) => filteredTypes.includes(event.type))
      .sort((a, b) => parseISO(a.start.toISOString()) - parseISO(b.start.toISOString()))

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
            {isSameDay(selectedDate, new Date()) && (
              <Badge variant="outline" className="ml-2">
                Today
              </Badge>
            )}
          </h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 border-b bg-gray-50">
            <div className="col-span-1 p-2 border-r text-center font-medium">Time</div>
            <div className="col-span-11 p-2 text-center font-medium">Campaigns</div>
          </div>

          {Array.from({ length: 12 }).map((_, i) => {
            const hour = i + 8
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = parseISO(event.start.toISOString()).getHours()
              return eventHour === hour
            })

            return (
              <div key={i} className="grid grid-cols-12 border-b">
                <div className="col-span-1 p-2 border-r text-center">{hour}:00</div>
                <div className="col-span-11 p-2">
                  {hourEvents.length > 0 ? (
                    <div className="space-y-2">
                      {hourEvents.map((event) => {
                        const EventIcon = CAMPAIGN_TYPES[event.type].icon

                        return (
                          <div
                            key={event.id}
                            className={`p-3 rounded cursor-pointer hover:opacity-95 transition-opacity ${CAMPAIGN_TYPES[event.type].color} text-white`}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <EventIcon className="h-5 w-5 mr-2" />
                                <span className="font-medium text-lg">{event.title}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getStatusBadgeVariant(event.status)} className="bg-white bg-opacity-20">
                                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </Badge>
                                <Badge
                                  variant={getPriorityBadgeVariant(event.priority)}
                                  className="bg-white bg-opacity-20"
                                >
                                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                                </Badge>
                              </div>
                            </div>

                            <div className="mt-2 flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>
                                {format(parseISO(event.start.toISOString()), "h:mm a")} -
                                {format(parseISO(event.end.toISOString()), "h:mm a")}
                                <span className="ml-2 text-white text-opacity-80">
                                  (Duration: {formatDuration(event.start, event.end)})
                                </span>
                              </span>
                            </div>

                            <div className="mt-2 text-sm">{event.description}</div>

                            {event.assignedTo && event.assignedTo.length > 0 && (
                              <div className="mt-3 flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                <div className="flex -space-x-2 mr-2">
                                  {event.assignedTo.map((member) => (
                                    <TooltipProvider key={member.id}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Avatar className="h-6 w-6 border-2 border-white">
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback className="text-[10px]">
                                              {member.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            {member.name} - {member.role}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  ))}
                                </div>
                                <span className="text-sm text-white text-opacity-80">
                                  {event.assignedTo.length} team member{event.assignedTo.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}

                            {event.metrics && Object.keys(event.metrics).length > 0 && (
                              <div className="mt-3">
                                <div className="flex items-center mb-1">
                                  <BarChart className="h-4 w-4 mr-2" />
                                  <span className="text-sm font-medium">Campaign Progress</span>
                                </div>
                                <Progress value={event.metrics.progress} className="h-2 bg-white bg-opacity-20" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-2">No campaigns scheduled</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render event details dialog
  const renderEventDetailsDialog = () => {
    if (!selectedEvent) return null

    const EventIcon = CAMPAIGN_TYPES[selectedEvent.type].icon

    return (
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <div className={`p-2 rounded-full mr-3 ${CAMPAIGN_TYPES[selectedEvent.type].color}`}>
                <EventIcon className="h-5 w-5 text-white" />
              </div>
              {selectedEvent.title}
            </DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>{format(parseISO(selectedEvent.start.toISOString()), "EEEE, MMMM d, yyyy")}</span>
              <div className="flex space-x-2">
                <Badge variant={getStatusBadgeVariant(selectedEvent.status)}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </Badge>
                <Badge variant={getPriorityBadgeVariant(selectedEvent.priority)}>
                  {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)} Priority
                </Badge>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Campaign Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Start Time:</span>
                      <span className="font-medium">
                        {format(parseISO(selectedEvent.start.toISOString()), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">End Time:</span>
                      <span className="font-medium">
                        {format(parseISO(selectedEvent.end.toISOString()), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <span className="font-medium">{formatDuration(selectedEvent.start, selectedEvent.end)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Campaign Type:</span>
                      <Badge className={CAMPAIGN_TYPES[selectedEvent.type].color}>
                        {CAMPAIGN_TYPES[selectedEvent.type].label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedEvent.metrics && Object.keys(selectedEvent.metrics).length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="h-4 w-4 mr-2" /> Campaign Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedEvent.metrics.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Progress:</span>
                            <span className="font-medium">{selectedEvent.metrics.progress}%</span>
                          </div>
                          <Progress value={selectedEvent.metrics.progress} className="h-2" />
                        </div>
                      )}

                      {selectedEvent.type === "VERIFICATION" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Total Emails:</span>
                            <span className="font-medium">{selectedEvent.metrics.totalEmails.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Verified Emails:</span>
                            <span className="font-medium">{selectedEvent.metrics.verifiedEmails.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Verification Rate:</span>
                            <span className="font-medium">
                              {Math.round(
                                (selectedEvent.metrics.verifiedEmails / selectedEvent.metrics.totalEmails) * 100,
                              )}
                              %
                            </span>
                          </div>
                        </>
                      )}

                      {selectedEvent.type === "FINDER" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Searched Domains:</span>
                            <span className="font-medium">
                              {selectedEvent.metrics.searchedDomains.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Found Emails:</span>
                            <span className="font-medium">{selectedEvent.metrics.foundEmails.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Avg. Emails per Domain:</span>
                            <span className="font-medium">
                              {(selectedEvent.metrics.foundEmails / selectedEvent.metrics.searchedDomains).toFixed(1)}
                            </span>
                          </div>
                        </>
                      )}

                      {selectedEvent.type === "SENDER" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Sent Emails:</span>
                            <span className="font-medium">{selectedEvent.metrics.sentEmails.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Open Rate:</span>
                            <span className="font-medium">{selectedEvent.metrics.openRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Click Rate:</span>
                            <span className="font-medium">{selectedEvent.metrics.clickRate}%</span>
                          </div>
                        </>
                      )}

                      {selectedEvent.type === "ALL_IN_ONE" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Prospects Found:</span>
                            <span className="font-medium">{selectedEvent.metrics.prospectsFound.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Emails Verified:</span>
                            <span className="font-medium">{selectedEvent.metrics.emailsVerified.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Emails Sent:</span>
                            <span className="font-medium">{selectedEvent.metrics.emailsSent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Responses:</span>
                            <span className="font-medium">{selectedEvent.metrics.responses.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" /> Description
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedEvent.description}</p>
              </div>

              {selectedEvent.notes && (
                <div>
                  <h4 className="font-medium mb-2">Additional Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedEvent.notes}</p>
                </div>
              )}

              {selectedEvent.assignedTo && selectedEvent.assignedTo.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Assigned Team Members
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedEvent.assignedTo.map((member) => (
                      <div key={member.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center">
            <div>
              <Button variant="destructive" size="sm" className="mr-2">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
            <div>
              <Button variant="outline" onClick={() => setIsEventDetailsOpen(false)} className="mr-2">
                Close
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Edit Campaign
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Render upcoming events
  const renderUpcomingEvents = () => {
    const upcomingEvents = getUpcomingEvents().slice(0, 5)
    const inProgressEvents = getInProgressEvents().slice(0, 3)

    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2" /> Upcoming & Active Campaigns
          </CardTitle>
          <CardDescription>Your next scheduled campaigns and currently running campaigns</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="upcoming">
            <div className="px-6">
              <TabsList className="w-full">
                <TabsTrigger value="upcoming" className="flex-1">
                  Upcoming ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger value="in-progress" className="flex-1">
                  In Progress ({inProgressEvents.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="m-0">
              <ScrollArea className="h-[320px]">
                {upcomingEvents.length > 0 ? (
                  <div className="divide-y">
                    {upcomingEvents.map((event) => {
                      const EventIcon = CAMPAIGN_TYPES[event.type].icon
                      const daysUntil = differenceInDays(parseISO(event.start.toISOString()), new Date())
                      let timeLabel = ""

                      if (daysUntil === 0) {
                        timeLabel = "Today"
                      } else if (daysUntil === 1) {
                        timeLabel = "Tomorrow"
                      } else {
                        timeLabel = `In ${daysUntil} days`
                      }

                      return (
                        <div
                          key={event.id}
                          className="flex items-start p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className={`p-2 rounded-full ${CAMPAIGN_TYPES[event.type].color} mr-3 shrink-0`}>
                            <EventIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="font-medium truncate mr-2">{event.title}</div>
                              <Badge variant={getPriorityBadgeVariant(event.priority)} className="shrink-0">
                                {event.priority}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {format(parseISO(event.start.toISOString()), "EEE, MMM d")} •{" "}
                              {format(parseISO(event.start.toISOString()), "h:mm a")} -{" "}
                              {format(parseISO(event.end.toISOString()), "h:mm a")}
                            </div>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="mr-2 bg-gray-50">
                                {timeLabel}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Duration: {formatDuration(event.start, event.end)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CalendarPlus className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No upcoming campaigns</p>
                    <Button size="sm" className="mt-3" onClick={() => setIsAddEventOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Campaign
                    </Button>
                  </div>
                )}
              </ScrollArea>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setView("day")}>
                  View All Scheduled Campaigns
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="m-0">
              <ScrollArea className="h-[320px]">
                {inProgressEvents.length > 0 ? (
                  <div className="divide-y">
                    {inProgressEvents.map((event) => {
                      const EventIcon = CAMPAIGN_TYPES[event.type].icon

                      return (
                        <div
                          key={event.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-full ${CAMPAIGN_TYPES[event.type].color} mr-3 shrink-0`}>
                              <EventIcon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="font-medium truncate mr-2">{event.title}</div>
                                <Badge variant="default" className="shrink-0">
                                  In Progress
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Started: {format(parseISO(event.start.toISOString()), "MMM d, h:mm a")}
                              </div>
                              <div className="text-sm text-gray-500">
                                Ends: {format(parseISO(event.end.toISOString()), "MMM d, h:mm a")}
                              </div>
                            </div>
                          </div>

                          {event.metrics && event.metrics.progress !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="font-medium">{event.metrics.progress}%</span>
                              </div>
                              <Progress value={event.metrics.progress} className="h-2" />
                            </div>
                          )}

                          {event.assignedTo && event.assignedTo.length > 0 && (
                            <div className="mt-3 flex items-center">
                              <span className="text-xs text-gray-500 mr-2">Team:</span>
                              <div className="flex -space-x-2">
                                {event.assignedTo.map((member) => (
                                  <TooltipProvider key={member.id}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Avatar className="h-6 w-6 border-2 border-white">
                                          <AvatarImage src={member.avatar} alt={member.name} />
                                          <AvatarFallback className="text-[10px]">
                                            {member.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{member.name}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <BarChart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No campaigns currently in progress</p>
                  </div>
                )}
              </ScrollArea>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setView("day")}>
                  View All Active Campaigns
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  // Render campaign summary
  const renderCampaignSummary = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2" /> Campaign Summary
          </CardTitle>
          <CardDescription>Campaigns by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              {Object.entries(CAMPAIGN_TYPES).map(([key, { label, color, icon: Icon }]) => {
                const count = events.filter((e) => e.type === key).length
                const inProgress = events.filter((e) => e.type === key && e.status === "in-progress").length
                const completed = events.filter((e) => e.type === key && e.status === "completed").length
                const scheduled = events.filter((e) => e.type === key && e.status === "scheduled").length

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-full ${color} mr-2`}>
                          <Icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      <Badge variant="outline">{count}</Badge>
                    </div>

                    {count > 0 && (
                      <div className="pl-7 grid grid-cols-3 gap-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Scheduled:</span>
                          <span>{scheduled}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">In Progress:</span>
                          <span>{inProgress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Completed:</span>
                          <span>{completed}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Campaign Status Overview</h4>
              <div className="space-y-2">
                {["scheduled", "in-progress", "completed", "failed"].map((status) => {
                  const count = events.filter((e) => e.status === status).length
                  const percentage = Math.round((count / events.length) * 100) || 0

                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{status}</span>
                        <span>
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-2 ${
                          status === "completed"
                            ? "bg-green-100"
                            : status === "in-progress"
                              ? "bg-blue-100"
                              : status === "failed"
                                ? "bg-red-100"
                                : "bg-gray-100"
                        }`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" /> New Campaign
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {renderHeader()}
      {renderFilters()}

      {renderUpcomingEvents()}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="mb-4">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
                <TabsContent value="month" className="mt-0">
                  {renderMonthView()}
                </TabsContent>
                <TabsContent value="week" className="mt-0">
                  {renderWeekView()}
                </TabsContent>
                <TabsContent value="day" className="mt-0">
                  {renderDayView()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">{renderCampaignSummary()}</div>
      </div>

      {renderEventDetailsDialog()}
    </div>
  )
}
