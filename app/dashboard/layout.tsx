"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  ChevronDown,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Settings,
  User,
  X,
  Zap,
  LayoutDashboard,
  Package,
  Calendar,
  FileCode,
  HelpCircle,
  Bot,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AuthCheck from "../components/auth-check"
import { Progress } from "@/components/ui/progress"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState({
    name: "Demo User",
    email: "demo@AgentSending.com",
  })

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("AgentSending_user")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("AgentSending_logged_in")
    localStorage.removeItem("AgentSending_user")
    router.push("/login")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Email Services",
      href: "/dashboard/services",
      icon: Package,
      current: pathname === "/dashboard/services" || pathname.startsWith("/dashboard/services/"),
    },
    {
      name: "Statistics",
      href: "/dashboard/statistics",
      icon: BarChart3,
      current: pathname === "/dashboard/statistics" || pathname.startsWith("/dashboard/statistics/"),
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      current: pathname === "/dashboard/calendar",
    },
    {
      name: "All-in-One Campaign",
      href: "/dashboard/campaign",
      icon: Zap,
      current: pathname === "/dashboard/campaign",
    },
    {
      name: "API Documentation",
      href: "/dashboard/api-docs",
      icon: FileCode,
      current: pathname === "/dashboard/api-docs",
    },
    {
      name: "Support",
      href: "/dashboard/support",
      icon: HelpCircle,
      current: pathname === "/dashboard/support",
    },
    {
      name: "Chatbot",
      href: "/dashboard/chatbot",
      icon: Bot,
      current: pathname === "/dashboard/chatbot",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings" || pathname.startsWith("/dashboard/settings/"),
    },
  ]

  return (
    <AuthCheck>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Mail className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">AgentSending</span>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        item.current ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">PLAN USAGE</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-primary font-medium">Professional Plan</span>
                  <Progress value={65} className="h-2 bg-gray-200" />
                  <span className="text-xs text-gray-500">Renews on July 15, 2023</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center w-full">
                    <div className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback>
                            {userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userData.name}</p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            {userData.email}
                          </p>
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <Mail className="h-8 w-8 text-primary mr-2" />
                      <span className="text-xl font-bold">AgentSending</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            item.current
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon
                            className={`mr-4 flex-shrink-0 h-6 w-6 ${
                              item.current ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                            }`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex-shrink-0 border-t border-gray-200 p-4">
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">PLAN USAGE</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-primary font-medium">Professional Plan</span>
                        <Progress value={65} className="h-2 bg-gray-200" />
                        <span className="text-xs text-gray-500">Renews on July 15, 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <div className="flex-shrink-0 w-full group block">
                      <div className="flex items-center">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback>
                            {userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userData.name}</p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">AgentSending</span>
            </div>
          </div>
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}
