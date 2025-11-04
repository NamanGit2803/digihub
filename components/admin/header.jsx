"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User } from "lucide-react"

export function Header({ user }) {
  return (
    <header className="border-b border-border bg-card h-16 flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="flex items-center gap-2 px-3">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
