"use client"

import { Button } from "@/components/ui/button"

export default function ProfileNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "info", label: "Account Info" },
    { id: "downloads", label: "Downloads" },
  ]

  return (
    <div className="flex gap-2 mb-8 border-b border-border pb-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          onClick={() => setActiveTab(tab.id)}
          className="px-4 py-2"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
