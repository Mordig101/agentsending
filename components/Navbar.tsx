"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-primary mr-2" />
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">AgentSending</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-600 hover:text-primary">
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-600 hover:text-primary flex items-center">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/verify-service" className="w-full">
                <DropdownMenuItem>
                  Email Verification
                </DropdownMenuItem>
              </Link>
              <Link href="/finder-service" className="w-full">
                <DropdownMenuItem>
                  Email Finder
                </DropdownMenuItem>
              </Link>
              <Link href="/sender-service" className="w-full">
                <DropdownMenuItem>
                  Email Sending
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/all-in-one-service" className="text-gray-600 hover:text-primary">
            All-in-One Campaign
          </Link>
          <Link href="/testing" className="text-gray-600 hover:text-primary">
            Testing
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}